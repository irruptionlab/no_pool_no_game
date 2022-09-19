import { useState, useEffect } from 'react';

const Timer = ({ isStarted }: { isStarted: boolean }) => {
    const [milliseconds, setMilliseconds] = useState(0);

    useEffect(() => {
        if (isStarted) {
            setInterval(() => setMilliseconds(milliseconds + 1000), 1000)
        } else if (!isStarted && milliseconds !== 0) {
            setMilliseconds(0);
        }
        console.log(milliseconds)
    }, [isStarted, milliseconds]);

    return (
        <div className="text-block-36">
            {Math.floor(milliseconds / 60000)} : {Math.trunc(milliseconds / 1000)} : {milliseconds % 1000}
        </div>

    );
};

export default Timer;