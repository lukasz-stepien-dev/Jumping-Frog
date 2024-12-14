import frogImg from './frog.png';
import './Frog.css';
import {useState} from "react";
export default function Frog() {
    const [isJump, setJump] = useState('');

    function jump() {
        setJump('jump');
        setTimeout(() => setJump(''), 500)
    }


    return (
        <img onClick={jump} src={frogImg} className={isJump} alt="frog" />
    )
}