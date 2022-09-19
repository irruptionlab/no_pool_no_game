import { useEffect, useState } from 'react';

const useCountdown = () => {
    const NOW_IN_MS = new Date().getTime();
    const TIME_IN_24H = NOW_IN_MS + 86400 * 1000
    const NEXT_DAY = (Math.floor(TIME_IN_24H / (86400 * 1000)) * 86400 * 1000)
    const countDownDate = NEXT_DAY
    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
    // calculate time left
    // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [hours, minutes, seconds];
};

export { useCountdown };




