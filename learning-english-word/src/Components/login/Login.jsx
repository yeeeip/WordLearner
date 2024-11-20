import { Link, useNavigate } from 'react-router-dom'; // Подключаем useNavigate
import logo from './img/logo.png';
import { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [responseResult, setResponseResult] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailMessage('Введите email')
        setEmailError(false); 
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMessage('Введите пароль')
        setPasswordError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasError = false;


        if (!email) {
            setEmailError(true);
            hasError = true;
        }
        if (!password) {
            setPasswordError(true);
            hasError = true;
        }

        if (hasError) return;


        try {
            const response = await axios.post(
                `http://localhost:8080/word-learner/api/v1/auth/login`,
                {
                    "email": email,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                }
            );

            // Сохраняем данные пользователя в localStorage
            localStorage.setItem("dataUser", JSON.stringify(response.data)); 
            console.log(response.data);

            // Получаем роль из ответа и устанавливаем ее в состояние
            const userRole = JSON.parse(localStorage.getItem('dataUser')).role;
            setPassword('');
            setEmail('');
            // После успешного входа перенаправляем на страницу с моделями
            navigate(`/fullModules/${userRole}`);

        } catch (error) {
            setPassword('');
            setEmail('');
            setResponseResult(true)
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="login">
            <img src={logo} alt="logo" />
            <div className="title-login">
                <h1 className='title-login-word-zero'>Вход в</h1>
                <h1 className='title-login-word-one'>СЛОВО</h1>
                <h1 className='title-login-word-two'>ЗНАЙКА</h1>
            </div>
            <div className='form-login'>
                <div className='text-form-login-email'><span className='text-form-login'>Email</span></div>
                <input 
                    className={`input-text ${emailError ? 'input-error' : ''}`} 
                    type="email" 
                    placeholder='Введите email' 
                    onChange={handleEmailChange} 
                    value={email}
                />
                {emailError ? <span className='error-message'>{emailMessage}</span>: ''}
                <div className='text-form-login-email'><span className='text-form-login'>Пароль</span></div>
                <input 
                    className={`input-text ${passwordError ? 'input-error' : ''}`} 
                    type="password" 
                    placeholder='Введите пароль' 
                    onChange={handlePasswordChange} 
                    value={password}
                />
                {passwordError ? <span className='error-message'>{passwordMessage}</span>: ''}
                <button 
                    className='btn-login' 
                    onClick={handleSubmit}
                >
                    Войти
                </button>
                {responseResult ? <span className='error-message-responseResult'>Ошибка входа. Пожалуйста, проверьте свои данные.</span>: ''}
            </div>
            <div className='block-register'>
                <Link to='/register' className='btn-register'>Регистрация</Link>
            </div>
        </div>
    );
}

export default Login;
