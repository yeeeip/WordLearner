import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Burger from './img/icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import FullModules from './img/FullModules.png';
import UserImg from './img/user.png';
import axios from 'axios';
import './Match.css';

const Match = () => {
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
  const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser')).token);
  const [idModule, setIdModule] = useState(JSON.parse(localStorage.getItem('idModule')));
  const [matchInfoTitle, setMatchInfoTitle] = useState('');
  const [tmatchInfoPage, setMatchInfoPage] = useState('');
  const [stateBurger, setStateBurger] = useState(false);
  const [colorCorrect, setColorCorrect] = useState([]);
  const [flag, setFlag] = useState(true);
  const [data, setData] = useState(null);  // Сначала null
  const [page, setPage] = useState(1);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [flagModalWindow, setFlagModalWindow] = useState(false);
  const answersUser = [];
  const listWords = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const navigate = useNavigate();

  const [buttonAdmin, setButtonAdmin] = useState(false);

  const SERVER_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
      if (userRole === 'ROLE_ADMIN') {
          setButtonAdmin(true);
      } else {
          setButtonAdmin(false);
      }
  }, [userRole]);

  const clickNextTask = () => {
    if (page === data.questions.length) {
      setFlagModalWindow(true);
    } else if (flag === false) {
      setPage(page + 1);
      setFlag(true);
      setColorCorrect([]);
    }
    console.log(page);
    console.log(rightAnswer);
  };

  const clickExit = () => {
    axios
      .post(
        `${SERVER_URL}word-learner/api/v1/submissions`,
        {
          correct: rightAnswer,
          moduleId: idModule,
          type: 'MATCH',
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate(`/moduleOverview/${userRole}`);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  };

  const handleStateBurger = () => {
    setStateBurger(!stateBurger);
  };

  useEffect(() => {
    setIdModule(JSON.parse(localStorage.getItem('idModule')))
    axios
      .get(`${SERVER_URL}word-learner/api/v1/matches/${idModule}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);  
        setPage(response.data.answer.length)
        setMatchInfoTitle(response.data.title);
        data.ruWords.map((el, index) => {
            answersUser.push(index)
        })
        setMatchInfoPage(response.data.questionCount);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [userToken]);

  const clickLogo = () => {
      localStorage.clear();
      navigate('/')
  }

  const changeAnswer = (e, index) => {
    const value = Number(e.target.value);
    if (value >= 0) {  
      answersUser[index] = value;
    } else {
      e.target.value = '';  
    }
    console.log(answersUser);
    console.log(data.answer);
  };

  const checkAnswers = (event) => {
    event.preventDefault();
    console.log(data.answer);
    console.log(answersUser)
    data.answer.map((el, index) => {
        if(el == answersUser[index]) {
            console.log(el)
            console.log(answersUser[index])
            setRightAnswer((prevRightAnswer) => prevRightAnswer + 1);
        }
    })
    setFlagModalWindow(true);
    console.log(rightAnswer)
  }


  // Условный рендеринг
  if (!data) {
    return (
      <div>Загрузка...</div>  // Показываем это, пока данные загружаются
    );
  }

  return (
    <div className="match">
      <header className="header-left">
        <div className="header-left-icon">
          <img src={Burger} onClick={handleStateBurger} className="burger" alt="" />
          <img src={Logo} onClick={clickLogo} className="header-left-logo" alt="" />
        </div>
        <div
          className="header-left-container-buttons"
          style={!stateBurger ? { display: 'inline-flex' } : { display: 'none' }}
        >
          <Link to={`/fullModules/:${userRole}`} className="header-left-button">
            <img src={FullModules} className="header-left-buttons-img" />
            <span className="header-left-buttons-text">Список модулей</span>
          </Link>
          <Link to={`/passedModule/:${userRole}`} className="header-left-button">
            <img src={DoneModuleImg} className="header-left-buttons-img" />
            <span className="header-left-buttons-text">Пройденные модули</span>
          </Link>
          <Link to={`/createdModeles/:${userRole}`} className='header-left-button' style={buttonAdmin ? { display: 'flex' } : { display: 'none' }}>
            <img src={createmoduleImg} className='header-left-buttons-img' />
            <span className='header-left-buttons-text'>Созданные модули</span>
          </Link>
          <Link to={`/personalAccount/:${userRole}`} className="header-left-button">
            <img src={UserImg} className="header-left-buttons-img" />
            <span className="header-left-buttons-text">Профиль</span>
          </Link>
        </div>
      </header>

      <div className="match-info">
        <h1 className="match-info-title">Подбор «{matchInfoTitle}»</h1>
        <div className="container-match-info">
          <div className='container-match-info-block-input'>
            {data.enWords.map((el, index) => (
              <div key={index} >
                <input onChange={(e) => changeAnswer(e, index)} className="container-match-info-input" type="number" placeholder='Введите номер'/>
              </div>
            ))}
          </div>
          <div className='container-match-info-text-block container-match-info-text-block1'>
            {data.enWords.map((el, index) => (
              <div key={index} className="container-match-info-text">{listWords[index]}. {el}</div>
            ))}
          </div>
          <div className='container-match-info-text-block container-match-info-text-block2'>
            {data.ruWords.map((el, index) => (
              <div key={index} className="container-match-info-text">{index+1}. {el}</div>
            ))}
          </div>
        </div>
        <div className="next-task1" onClick={(event) => checkAnswers(event)}><span>Завершить</span></div>
      </div>
      <div className='modal-window-match' style={flagModalWindow ? {display: 'flex'} : {display: 'none'}}>
            <div className='modal-window-match-info'>
                    <h1>Результаты</h1>
                <div>
                    <span className='modal-window-match-info-text'><p>Верно: </p>  {rightAnswer} слов</span>
                    <span className='modal-window-match-info-text'><p>Неверно: </p>   {(page) - rightAnswer} слов</span>
                </div>
                <div className="exit-task-test exit-test-task1" onClick={clickExit}><span className='exit-task-text'>Выйти</span></div>
                {console.log(page)}
            </div>
    </div>
    </div>
  );
};

export default Match;
