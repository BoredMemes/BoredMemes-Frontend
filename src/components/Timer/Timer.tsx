import "./countDown.scss"
import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";

type TimeNumber = {
    deadLine:number,
    setShowMint(value: boolean): void
};
export default function Timer({ setShowMint, deadLine }: TimeNumber) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const { connector, library, chainId, account, active } = useWeb3React();
    useEffect(() => {

        let myInterval = setInterval(() => {
            const currentDate: any = Date.now()/1000;
            const diff = deadLine - currentDate;
            const dayNum = diff > 0 ? Math.floor(diff  / 60 / 60 / 24) : 0;
            const hourNum = diff > 0 ? Math.floor(diff  / 60 / 60) % 24 : 0;
            const minNum = diff > 0 ? Math.floor(diff  / 60) % 60 : 0;
            const secNum = diff > 0 ? Math.floor(diff ) % 60 : 0;

            if (currentDate < deadLine) {
                setDays(dayNum);
                setHours(hourNum);
                setMinutes(minNum);
                setSeconds(secNum);
            }
            else{
                setShowMint(true)
            }

        }, 0)
        return () => {
            clearInterval(myInterval);
        };

    }, [connector, library, account, active, chainId, deadLine, setShowMint]);

    return (
        <div className="timer">
            {days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0
                ? null
                : <div className="timerNums">
                    <span>{Math.floor(days/10)}{days%10} Days {Math.floor(hours/10)}{hours%10} Hours </span>
                    <span> {Math.floor(minutes/10)}{minutes%10} Minutes {Math.floor(seconds/10)}{seconds%10} Seconds</span>
                 
                                    
                </div>
            }
        </div>
    )
}