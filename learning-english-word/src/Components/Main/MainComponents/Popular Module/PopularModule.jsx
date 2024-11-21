import { Link } from 'react-router-dom'
import User from '../../img/user.png'
import './PopularModule.css'
const data = ['Animals','Verb','Profession','Adjectives']
const PopularModule = () => {
    return(
        <div className="PopularModule">
            <span className='popular-module-title'>Популярные модули</span>
            <div className="popular-module-container">
                {data.map((el, index) => {
                    return (
                        <div className="block" key={index}>
                            <span className='block-title'>{el}</span>
                            <div className='block-popular-module-container'>
                                <span className='block-info'>10 cлов</span>
                                <div className="vertic"></div>
                                <span className='block-info'>Создано: 13.10.2024</span>
                                <div className="vertic"></div>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <img src={User} alt="" style={{ marginRight: '0.6vw' }} className='block-title-img'/>
                                    <span className='block-info'>Автор</span>
                                </div>
                            </div>
                            <Link to='login' className='block-button'>Перейти</Link>
                        </div>
                    );       
                })}
                
            </div>
        </div>
    )
}

export default PopularModule