import { Link } from "react-router-dom";
import Train from "../../img/Calendar.png"

const BlockTwo = () => {
    return(
        <div className="block-two">
            <div className="block-two-info">
                <h1>Следите за своей активностью</h1>
                <span>Здесь вы можете отслеживать свои достижения в изучении английских слов. Каждый день, когда вы занимаетесь, автоматически заполняется календарь активности. Визуально наблюдайте, как растет ваш словарный запас и как вы приближаетесь к своим целям!
                </span>
                <Link to="/login">Попробовать</Link>
            </div>
            <img src={Train}/>
        </div>
    )
}

export default BlockTwo;