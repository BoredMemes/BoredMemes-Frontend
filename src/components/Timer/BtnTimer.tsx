import "./btnDown.scss"
import { useState, useEffect } from 'react';

type TimeNumber = {
    startTime ? :number,
    endTime ? : number,
    string1 ? : string,
    string2 ? : string,
    setTimeEnd ? (value: boolean): void
};
export default function BtnTimer({ setTimeEnd, startTime, endTime, string1, string2 }: TimeNumber) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isStartEnd, setIsStartEnd] = useState(false);
    const [isEndEnd, setIsEndEnd] = useState(false);
    useEffect(() => {
        let myInterval = setInterval(() => {
            const currentDate: any = Date.now()/1000;
            const startDiff = startTime - currentDate;
            const dayNum = startDiff > 0 ? Math.floor(startDiff  / 60 / 60 / 24) : 0;
            const hourNum = startDiff > 0 ? Math.floor(startDiff  / 60 / 60) % 24 : 0;
            const minNum = startDiff > 0 ? Math.floor(startDiff  / 60) % 60 : 0;
            const secNum = startDiff > 0 ? Math.floor(startDiff ) % 60 : 0;

            if (currentDate < startTime) {
                setDays(dayNum);
                setHours(hourNum);
                setMinutes(minNum);
                setSeconds(secNum);
                setIsStartEnd(false)
            }
            else{
                setIsStartEnd(true)

                const endDiff = endTime - currentDate;
                const enddayNum = endDiff > 0 ? Math.floor(endDiff  / 60 / 60 / 24) : 0;
                const endhourNum = endDiff > 0 ? Math.floor(endDiff  / 60 / 60) % 24 : 0;
                const endminNum = endDiff > 0 ? Math.floor(endDiff  / 60) % 60 : 0;
                const endsecNum = endDiff > 0 ? Math.floor(endDiff ) % 60 : 0;
                if (currentDate < endTime) {
                    setDays(enddayNum);
                    setHours(endhourNum);
                    setMinutes(endminNum);
                    setSeconds(endsecNum);
                }
                else{
                    // setTimeEnd(true)

                    setIsEndEnd(true)
                }
            }
            

        }, 0)
        return () => {
            clearInterval(myInterval);
        };

    }, [startTime, endTime, setTimeEnd, setIsStartEnd]);

    return (
        <div className="btntimer">
            <div className="timerNums">
            {!isStartEnd && <span className="txt">{string1}</span>}
            <span className="number">
                {days < 10 ? `0${days}` : days} </span>
            <span className="txt">Days </span>
            <span className="number">{hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds} </span>
            {/* <span className="number">{minutes < 10 ? `0${minutes}` : minutes} : </span>
            <span className="number">{seconds < 10 ? `0${seconds}` : seconds}</span> */}
            
            {isStartEnd && !isEndEnd && <span className="txt"> {string2}</span>}
            </div>
        </div>
    )
}