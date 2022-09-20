import { useState, useEffect } from 'react';

const Timer = ({ isStarted }: { isStarted: boolean }) => {
    const [milliseconds, setMilliseconds] = useState(0);

    useEffect(() => {
        if (isStarted) {
            setInterval(() => setMilliseconds(milliseconds + 1), 1)
        } else if (!isStarted && milliseconds !== 0) {
            setMilliseconds(0);
        }
        console.log(milliseconds)
    }, [isStarted, milliseconds]);

    return (
        <div className="text-block-36">
            {Math.floor(milliseconds / 60000)} min : {milliseconds % 60000} ms
        </div>

    );
};

export default Timer;