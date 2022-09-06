import { useState, useEffect } from 'react';

const Timer = ({ isStarted }) => {
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        let interval = null;
        if (isStarted) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1);
        } else if (!isStarted && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStarted, seconds]);

    return (
        <div className="time">
            {seconds}ms
        </div>
    );
};

export default Timer;