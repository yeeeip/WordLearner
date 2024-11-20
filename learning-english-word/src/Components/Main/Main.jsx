import logo from './img/logo.png'
import './Main.css'
import './MainComponents/Topic block/TopicBlock.css'
import PopularModule from './MainComponents/Popular Module/PopularModule'
import BlockOne from './MainComponents/Topic block/BlockOne'
import BlockTwo from './MainComponents/Topic block/BlockTwo'
import BlockThree from './MainComponents/Topic block/BlockThree'
import { Link } from 'react-router-dom'
import Login from '../login/Login'

const Main = () => {
    return(
        <div className="Main">
            <header className='header-main'>
                <div className="title">
                    <img src={logo}/>
                    <h1 className='word-one'>СЛОВО</h1>
                    <h1 className='word-two'>ЗНАЙКА</h1>
                </div>
                <div>
                    <Link to='/register' className='reg'>Регистрация</Link>
                    <Link to='/login' className='log'>Вход</Link>
                </div>
            </header>
            <BlockOne/>
            <BlockTwo/>
            <BlockThree/>
            <PopularModule/>
            <footer className='footer-main'>
                <div className="title footer-title">
                    <img className='footer-img' src={logo}/>
                    <h1 className='footer-word-one'>СЛОВО</h1>
                    <h1 className='footer-word-two'>ЗНАЙКА</h1>
                </div>
                <div>
                    <span className='reg'>© Copyright СЛОВОЗНАЙКА</span>
                </div>
            </footer>
        </div>
    )
}

export default Main