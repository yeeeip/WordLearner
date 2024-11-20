import React, { useState, useEffect } from 'react';
import Burger from './img/icon _burger menu_.png'
import Logo from './img/logo.png'
import DoneModuleImg from './img/Done module.png'
import createmoduleImg from './img/createmodule.png'
import UserImg from './img/user.png'
import FullModules from './img/FullModules.png'
import RightContainerCreatedModeles from './CreatedModelesComponents/RightContainer/RightContainerCreatedModeles'
import { Link } from 'react-router-dom'
import axios from 'axios';



const CreatedModeles = () => {
    const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
    const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);
    const [stateBurger, setStateBurger] = useState(false);
    const handleStateBurger = () => {
        setStateBurger(prevState => !prevState);
    }
    
    const [buttonAdmin, setButtonAdmin] = useState(false);
    useEffect(() => {
        setUserRole(JSON.parse(localStorage.getItem('dataUser')).role);
        if (userRole === 'ROLE_ADMIN') {
            setButtonAdmin(true);
        } else {
            setButtonAdmin(false);
        }
    }, [userRole]);


    return (
        <div className="created-modules">
            <header className="header-left">
                <div className="header-left-icon">
                <img src={Burger} onClick={handleStateBurger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt="" />
                </div>
                <div className='header-left-container-buttons' style={!stateBurger ? {display: 'inline-flex'} : {display: 'none'}}>
                    <Link to={`/fullModules/:${userRole}`} className='header-left-button'>
                        <img src={FullModules} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Список модулей</span>
                    </Link>
                    <Link to={`/passedModule/:${userRole}`} className='header-left-button'>
                        <img src={DoneModuleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Пройденные модули</span>
                    </Link>
                    <Link to={`/createdModeles/:${userRole}`} className='header-left-button' style={buttonAdmin ? { display: 'flex' } : { display: 'none' }}>
                        <img src={createmoduleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Созданные модули</span>
                    </Link>
                    <Link to={`/personalAccount/:${userRole}`} className='header-left-button'>
                        <img src={UserImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Профиль</span>
                    </Link>
                </div>
            </header>
            <RightContainerCreatedModeles/>
        </div>
    )
}

export default CreatedModeles;