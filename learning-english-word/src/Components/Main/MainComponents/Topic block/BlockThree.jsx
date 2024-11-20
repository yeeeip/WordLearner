import { useState, useEffect } from "react";
import Hexagons from "../../img/Hexagons.png";
import HexagonsOne from "../../img/Hexagons1.png";
import { Link } from "react-router-dom";

const BlockThree = () => {
    const [imageSrc, setImageSrc] = useState(Hexagons);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setImageSrc(HexagonsOne);
            } else {
                setImageSrc(Hexagons);
            }
        };

        // Инициализация при монтировании компонента
        handleResize();

        // Слушатель изменения размера окна
        window.addEventListener("resize", handleResize);

        // Очистка слушателя при размонтировании
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="block-three">
            <div className="block-three-info">
                <h1>Ваши достижения – это ваша гордость!</h1>
                <span>Здесь вы можете увидеть свои достижения в изучении английских слов. Каждый новый уровень, пройденный тест, изученное слово – это шаг к вашей цели!</span>
                <Link to='/login'>Начать учиться</Link>
            </div>
            <img src={imageSrc} alt="Hexagons" />
        </div>
    );
};

export default BlockThree;
