import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Burger from './img/icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import FullModules from './img/FullModules.png'
import UserImg from './img/user.png';
import axios from 'axios';
import './Test.css';

const Test = () => {
    const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
    const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);
    const [idModule, setIdModule] = useState(JSON.parse(localStorage.getItem('idModule')));
    const [testInfoTitle, setTestInfoTitle] = useState('');
    const [testInfoPage, setTestInfoPage] = useState('');
    const [stateBurger, setStateBurger] = useState(false);
    const [colorCorrect, setColorCorrect] = useState([]); 
    const [flag, setFlag] = useState(true); 
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [rightAnswer, setRightAnswer] = useState(0);
    const [flagModalWindow, setFlagModalWindow] = useState(false);
    const navigate = useNavigate()
    console.log(idModule)

    const [buttonAdmin, setButtonAdmin] = useState(false);
    useEffect(() => {
        setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
        if (userRole === 'ROLE_ADMIN') {
            setButtonAdmin(true);
        } else {
            setButtonAdmin(false);
        }
    }, [userRole]);

    const SERVER_URL = process.env.REACT_APP_BACKEND_URL

    const clickNextTask = () => {
        
        if (page == data.questions.length) {
            setFlagModalWindow(true);
        } else if(flag === false) {
            setPage(page+1);
            setFlag(true);
            setColorCorrect([])
        }
        console.log(page)
        console.log(rightAnswer)
    }

    const clickExit = () => {
        setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
        setuserToken(JSON.parse(localStorage.getItem('dataUser')).token)
        setIdModule(JSON.parse(localStorage.getItem('idModule')))
        axios.post(`${SERVER_URL}word-learner/api/v1/submissions`, {
            'correct': rightAnswer,
            'moduleId': idModule,
            'type': 'TEST'
        }, 
        {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            console.log(response)
            navigate(`/moduleOverview/${userRole}`)
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
    }

    const handleStateBurger = () => {
        setStateBurger(!stateBurger);
    };

    const clickOption = (correct, index) => {
        if (flag) {
            const updatedColorCorrect = [...colorCorrect];
            updatedColorCorrect[index] = correct; 
            setColorCorrect(updatedColorCorrect);
            if(correct === true) {
                setRightAnswer(rightAnswer+1)
            }
            setFlag(false); 
        }
    };

    useEffect(() => {
        setIdModule(JSON.parse(localStorage.getItem('idModule')))
        axios.get(`${SERVER_URL}word-learner/api/v1/tests/${idModule}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            console.log(response)
            setData(response.data);
            setTestInfoTitle(response.data.title);
            setTestInfoPage(response.data.questionCount);
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
    }, [userToken]);

    return (
        <div className="test">
            <header className="header-left">
                <div className="header-left-icon">
                    <img src={Burger} onClick={handleStateBurger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt="" />
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

            <div className="test-info">
                <h1 className="test-info-title">{testInfoTitle}</h1>
                <span className="test-info-page">{page}/{testInfoPage}</span>
                <div className="container-test-info">
                    {data && data.questions && data.questions[page - 1] ? (  // Проверка на наличие данных
                        <div className="task-test">
                            <h1 className="task-test-title">{data.questions[page - 1].question}</h1>
                            <div className="container-task-test">
                                {data.questions[page - 1].options.map((el, index) => (
                                    <div
                                        key={index} 
                                        style={colorCorrect[index] === true ? { backgroundColor: '#4CAF50', color: 'white' }
                                            : colorCorrect[index] === false ? { backgroundColor: '#f44336', color: 'white' } : {}}
                                        onClick={() => clickOption(el.correct, index)} 
                                        className={`task-test-option ${!flag && 'disabled-option'}`} 
                                    >
                                        {el.option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Загрузка данных...</p>  // Можем выводить текст, если данных нет
                    )}
                </div>
                <div className="next-task" onClick={clickNextTask}><span>Следующее слово</span></div>
            </div>
            <div className='modal-window-test' style={flagModalWindow ? {display: 'flex'} : {display: 'none'}}>
                    <div className='modal-window-test-info'>
                        <h1>Результаты</h1>
                        <div>
                            <span className='modal-window-test-info-text'><p>Верно: </p>  {rightAnswer} слов</span>
                            <span className='modal-window-test-info-text'><p>Неверно: </p>   {(page) - rightAnswer} слов</span>
                        </div>
                        <div className="exit-task" onClick={clickExit}><span className='exit-task-text'>Выйти</span></div>
                    </div>
            </div>

        </div>
    );
};

export default Test;
