import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Burger from './img/icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import FullModules from './img/FullModules.png'
import UserImg from './img/user.png';
import axios from 'axios';
import './Cards.css';
import Left from './img/left.png';
import Right from './img/right.png'
import Cat from './img/cat.png'

const Cards = () => {
    const userRole = JSON.parse(localStorage.getItem('dataUser')).role;
    const userToken = JSON.parse(localStorage.getItem('dataUser')).token;
    const idModule = JSON.parse(localStorage.getItem('idModule'));
    const [testInfoTitle, setTestInfoTitle] = useState('');
    const [testInfoPage, setTestInfoPage] = useState('');
    const [stateBurger, setStateBurger] = useState(false);
    const [colorCorrect, setColorCorrect] = useState([]); 
    const [flag, setFlag] = useState(true); 
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [rightAnswer, setRightAnswer] = useState(0);
    const [notRightAnswer, setNotRightAnswer] = useState(0);
    const [flagModalWindow, setFlagModalWindow] = useState(false);
    const SERVER_URL = process.env.REACT_APP_BACKEND_URL

    const navigate = useNavigate()
    console.log(idModule)

    const [buttonAdmin, setButtonAdmin] = useState(false);
    useEffect(() => {
        if (userRole === 'ROLE_ADMIN') {
            setButtonAdmin(true);
        } else {
            setButtonAdmin(false);
        }
    }, [userRole]);
    // const clickNextTask = () => {
        
    //     if (page == data.questions.length) {
    //         setFlagModalWindow(true);
    //     } else if(flag === false) {
    //         setPage(page+1);
    //         setFlag(true);
    //         setColorCorrect([])
    //     }
    //     console.log(page)
    //     console.log(rightAnswer)
    // }

    const clickExit = () => {
        axios.post(`${SERVER_URL}word-learner/api/v1/submissions`, {
            'correct': rightAnswer,
            'moduleId': idModule,
            'type': 'CARDS'
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

    const trueAnswers = () => {
        setRightAnswer(rightAnswer+1);
        if(page == data.cards.length) {
            setFlagModalWindow(true);
        } else {
            setPage(page+1);
        }
    }
    const notTrueAnswers = () => {
        setNotRightAnswer(notRightAnswer+1);
        if(page == data.cards.length) {
            setFlagModalWindow(true);
        } else {
            setPage(page+1);
        }
    }
    const clickLogo = () => {
        localStorage.clear();
        navigate('/')
    }


    useEffect(() => {
        console.log(idModule);
        console.log(userToken);
        axios.get(`${SERVER_URL}word-learner/api/v1/cards/${idModule}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            console.log(response.data)
            setData(response.data);
            setTestInfoTitle(response.data.title);
            setTestInfoPage(response.data.questionCount);
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
    }, [userToken]);

    return (
        <div className="cards">
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

            <div className="cards-info">
                <h1 className="cards-info-title">Карточки «{testInfoTitle}»</h1>
                <div className="container-cards-info">
                    {data  ? (  // Проверка на наличие данных
                        <div className='cards-task-info'>
                            <img src={`${data.cards[page-1].cardImg}`}/>
                            <div className="cards-task-info-text">{data.cards[page-1].wordEn}</div>
                        </div>
                    ) : (
                        <p>Загрузка данных...</p>  // Можем выводить текст, если данных нет 
                    )}
                </div>
                <div className="next-task3" >
                    <span onClick={notTrueAnswers}>Пропустить</span>
                    <div className='right-light-buttons'>
                        <img onClick={trueAnswers} src={Right}/>
                    </div>
                </div>
            </div>
            <div className='modal-window-cards' style={flagModalWindow ? {display: 'flex'} : {display: 'none'}}>
                    <div className='modal-window-cards-info'>
                        <h1>Результаты</h1>
                        <div>
                            <span className='modal-window-cards-info-text'><p>Верно: </p>  {rightAnswer} слов</span>
                            <span className='modal-window-cards-info-text'><p>Неверно: </p>   {notRightAnswer} слов</span>
                        </div>
                        <div className="exit-task" onClick={clickExit}><span className='exit-task-text'>Выйти</span></div>
                    </div>
            </div>

        </div>
    );
};

export default Cards;
