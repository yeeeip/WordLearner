import React, { useState, useEffect } from 'react';
import Burger from './img/icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import UserImg from './img/user.png';
import FullModules from './img/FullModules.png'
import './createModel.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateModel = () => {
  const [wordsRender, setWordsRender] = useState([{ id: 0, wordEn: '', wordRu: '', cardImg: '' }]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '', words: [] });
  const [stateBurger, setStateBurger] = useState(false);

  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
  const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);

  const SERVER_URL = process.env.REACT_APP_BACKEND_URL

  const [buttonAdmin, setButtonAdmin] = useState(false);
  useEffect(() => {
    setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
    if (userRole === 'ROLE_ADMIN') {
        setButtonAdmin(true);
    } else {
        setButtonAdmin(false);
    }
}, [userRole]);

  const validateInputs = () => {
    let valid = true;
    const newErrors = { title: '', description: '', words: [] };

    if (!moduleTitle) {
      newErrors.title = 'Название модуля не может быть пустым';
      valid = false;
    }

    if (!moduleDescription) {
      newErrors.description = 'Описание модуля не может быть пустым';
      valid = false;
    }

    wordsRender.forEach((word, index) => {
      if (!word.wordEn || !word.wordRu) {
        newErrors.words[index] = 'Слово и перевод не могут быть пустыми';
        valid = false;
      } else {
        newErrors.words[index] = ''; 
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleStateBurger = () => {
    setStateBurger(!stateBurger);
  };

  const addWord = () => {
    setWordsRender(prevWords => [...prevWords, { id: prevWords.length, wordEn: '', wordRu: '', cardImg: [] }]);
  };

  const deleteWord = (index) => {
    setWordsRender(prevWords => prevWords.filter((_, i) => i !== index));
  };

  const handleFileChange = (index, event) => {
    const selectedFiles = Array.from(event.target.files); 
    setWordsRender(prevWords => {
      const newWords = [...prevWords];
      newWords[index].cardImg = selectedFiles;
      return newWords;
    });
  };

    const clickLogo = () => {
        localStorage.clear();
        navigate('/')
    }

  const removeFile = (index, fileName) => {
    setWordsRender(prevWords => {
      const newWords = [...prevWords];
      newWords[index].cardImg = newWords[index].cardImg.filter(name => name !== fileName);
      return newWords;
    });
  };

  const handleWordChange = (index, field, value) => {
    const newWords = [...wordsRender];
    newWords[index][field] = value;
    setWordsRender(newWords);
  };

  const handleSave = () => {
    if (validateInputs()) {
      const formData = new FormData();
  
      formData.append('module', JSON.stringify({
        title: moduleTitle,
        description: moduleDescription,
        wordCount: wordsRender.length,
        words: wordsRender.map(word => ({
          wordEn: word.wordEn,
          wordRu: word.wordRu,
          cardImg: word.cardImg, 
        }))
      }));
      console.log(wordsRender)
  
      formData.append('cardImages', null);

      console.log("Sending form data:", formData);

      formData.forEach((el, i) => {
        console.log(i + " " + el)
      })

      axios.post(`${SERVER_URL}word-learner/api/v1/modules`, 
      {
        "title": moduleTitle,
        "description": moduleDescription,
        "wordCount":  wordsRender.length,
        "words": wordsRender
      }, {
        headers: {
          "Authorization": `Bearer ${userToken}`,
        }
      })
      .then(response => {
        console.log('Module saved successfully:', response.data);
        
        localStorage.setItem("idModule", JSON.stringify(response.data));
        navigate(`/moduleOverview/${userRole}`);
        setWordsRender([])
        
      })
      .catch(error => {
        console.error('Error saving module:', error);
      });
    }
  };

  return (
    <div className="create-module">
      <header className="header-left">
        <div className="header-left-icon">
          <img src={Burger} onClick={handleStateBurger} className='burger' alt="" />
          <img src={Logo} onClick={clickLogo} className='header-left-logo' alt="" />
        </div>
        <div className='header-left-container-buttons' style={!stateBurger ? { display: 'inline-flex' } : { display: 'none' }}>
          <Link to={`/fullModules/:${userRole}`} className='header-left-button'>
              <img src={FullModules} className='header-left-buttons-img'/>
              <span className='header-left-buttons-text'>Список модулей</span>
          </Link>
          <Link to={`/passedModule/:${userRole}`} className='header-left-button'>
            <img src={DoneModuleImg} className='header-left-buttons-img' />
            <span className='header-left-buttons-text'>Пройденные модули</span>
          </Link>
          <Link to={`/createdModeles/:${userRole}`} className='header-left-button' style={buttonAdmin ? { display: 'flex' } : { display: 'none' }}>
            <img src={createmoduleImg} className='header-left-buttons-img' />
            <span className='header-left-buttons-text'>Созданные модули</span>
          </Link>
          <Link to={`/personalAccount/:${userRole}`} className='header-left-button'>
            <img src={UserImg} className='header-left-buttons-img' />
            <span className='header-left-buttons-text'>Профиль</span>
          </Link>
        </div>
      </header>

      <div className='right-create-model'>
        <h1>Создать модуль</h1>
        <div className='right-create-model-info'>
          <span>Название</span>
          <input
            type="text"
            className={`input-title ${errors.title ? 'error' : ''}`}
            placeholder='Введите название'
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}

          <span>Описание</span>
          <input
            type="text"
            className={`input-info ${errors.description ? 'error' : ''}`}
            placeholder='Введите описание'
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {
          wordsRender.map((el, index) => (
            <div key={el.id} className='container-tasks-words'>
              <div style={{ display: 'flex' }} className='container-task-word-block'>
                <div className='container-tasks-words-input'>
                  <span>Слово</span>
                  <input
                    type='text'
                    className={`word-input ${errors.words[index] ? 'error' : ''}`}
                    placeholder='Введите слово'
                    value={el.wordEn}
                    onChange={(e) => handleWordChange(index, 'wordEn', e.target.value)}
                  />
                  {errors.words[index] && <span className="error-message">{errors.words[index]}</span>}
                </div>
                <div className='container-tasks-words-input'>
                  <span>Перевод</span>
                  <input
                    type='text'
                    className={`word-input ${errors.words[index] ? 'error' : ''}`}
                    placeholder='Введите перевод'
                    value={el.wordRu}
                    onChange={(e) => handleWordChange(index, 'wordRu', e.target.value)}
                  />
                  {errors.words[index] && <span className="error-message">{errors.words[index]}</span>}
                </div>
                <div className='container-tasks-words-input'>
                  <span>Изображение</span>
                  <input
                    type='text'
                    className={`word-input ${errors.words[index] ? 'error' : ''}`}
                    placeholder='Введите url адрес фотографии'
                    value={el.cardImg}
                    onChange={(e) => handleWordChange(index, 'cardImg', e.target.value)}
                  />
                </div>
              </div>
              <div className='btn-delete-task-word' onClick={() => deleteWord(index)}>Удалить</div>
            </div>
          ))
        }

        <div style={{ display: 'flex', marginBottom: '6vw' }}>
          <div onClick={addWord} style={{ cursor: 'pointer' }} className='add-tasks-words'>Добавить слово</div>
          <div onClick={handleSave} style={{ cursor: 'pointer' }} className='save-words'>Сохранить</div>
        </div>
      </div>
    </div>
  );
};

export default CreateModel;
