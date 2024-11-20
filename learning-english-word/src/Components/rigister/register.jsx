import { Link, useNavigate } from 'react-router-dom'; 
import logo from './img/logo.png'
import { useState } from 'react';
import './register.css'
import axios from 'axios';

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [error, setError] = useState(null);
    const [successfully, setSuccessfully] = useState(null);
    const [responseResult, setResponseResult] = useState(false);

    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfError, setPasswordConfError] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);  // очищаем ошибку при изменении
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        setUserNameError(false);
    };

    const handlePasswordConfChange = (event) => {
        setPasswordConf(event.target.value);
        setPasswordConfError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasError = false;

        if (!userName) {
            setUserNameError(true);
            hasError = true;
        }
        if (!email) {
            setEmailError(true);
            hasError = true;
        }
        if (!password) {
            setPasswordError(true);
            hasError = true;
        }
        if (!passwordConf) {
            setPasswordConfError(true);
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await axios.post(
                `http://localhost:8080/word-learner/api/v1/auth/register`,
                {
                    "username": userName,
                    "email": email,
                    "password": password,
                    "passwordConf": passwordConf,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                }
            );
            setPassword('');
            setEmail('');
            setPasswordConf('');
            setPassword('');
            localStorage.setItem("dataUser", JSON.stringify(response.data)); 
            setSuccessfully("Регистрация прошла успешно");
            navigate(`/login`);
        } catch (error) {
            setPassword('');
            setEmail('');
            setPasswordConf('');
            setPassword('');
            setResponseResult(true)
            console.error("Error:", error);
        }
    };

    return (
        <div className="login">
            <img src={logo} alt="logo" />
            <div className="title-login">
                <h1 className='title-login-word-zero'>Регистрация в</h1>
                <h1 className='title-login-word-one'>СЛОВО</h1>
                <h1 className='title-login-word-two'>ЗНАЙКА</h1>
            </div>
            <div className='form-register'>
                <div className='text-form-login-email'>
                    <span className='text-form-login'>Имя пользователя</span>
                </div>
                <input 
                    className={`input-text ${userNameError ? 'input-error' : ''}`} 
                    type="text" 
                    placeholder='Введите имя пользователя' 
                    onChange={handleUserNameChange}
                />
                {userNameError ? <span className='error-message'>Неверное имя пользователя</span>: ''}
                <div className='text-form-login-email'>
                    <span className='text-form-login'>Email</span>
                </div>
                <input 
                    className={`input-text ${emailError ? 'input-error' : ''}`} 
                    type="text" 
                    placeholder='Введите email' 
                    onChange={handleEmailChange}
                />
                {emailError ? <span className='error-message'>Неверный email</span>: ''}
                <div className='text-form-login-email'>
                    <span className='text-form-login'>Пароль</span>
                </div>
                <input 
                    className={`input-text ${passwordError ? 'input-error' : ''}`} 
                    type="password" 
                    placeholder='Введите пароль' 
                    onChange={handlePasswordChange}
                />
                {passwordError ? <span className='error-message'>Неверный пароль</span>: ''}
                <div className='text-form-login-email'>
                    <span className='text-form-login'>Подтвердить пароль</span>
                </div>
                <input 
                    className={`input-text ${passwordConfError ? 'input-error' : ''}`} 
                    type="password" 
                    placeholder='Подтвердить пароль'  
                    onChange={handlePasswordConfChange}
                />
                {passwordConfError ? <span className='error-message'>Неверный пароль</span>: ''}
                <Link className='btn-login' onClick={handleSubmit}>Зарегистрироваться</Link>
                {responseResult ? <span className='error-message-responseResult'>Ошибка регистрации. Пожалуйста, проверьте свои данные.</span>: ''}
            </div>
            <div className='block-register'>
                <Link to='/login' className='btn-register'>Войти в личный кабинет</Link>
            </div>
        </div>
    );
};

export default Register;
