import { useContractRead } from 'wagmi'
import ABI_Npng from './utils/ABI_Npng.json'
import { goerli } from './utils/contractAddress'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Countdown = () => {
    const [countDown, setCountDown] = useState(0);
    const [countDownDate, setCountDownDate] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const { data } = useContractRead({
        addressOrName: goerli.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getEndOfContest',
        chainId: 5,
        onSuccess(data) {
            setCountDownDate(parseInt(ethers.utils.formatUnits(data?._hex, 0)) * 1000)
        }
    })

    useEffect(() => {
        if (countDownDate !== 0) {
            const interval = setInterval(() => {
                setCountDown(countDownDate - new Date().getTime());
            }, 1000);

            setHours(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
            setSeconds(Math.floor((countDown % (1000 * 60)) / 1000))
            return () => clearInterval(interval);
        }
    }, [countDownDate, countDown]);

    return (
        <div className="div-block-10">
            <div className="count-down">{Math.floor(hours / 10)}</div>
            <div className="count-down">{Math.floor(hours % 10)}</div>
            <div className="text-block-11">:</div>
            <div className="count-down">{Math.floor(minutes / 10)}</div>
            <div className="count-down">{Math.floor(minutes % 10)}</div>
            <div className="text-block-11">:</div>
            <div className="count-down">{Math.floor(seconds / 10)}</div>
            <div className="count-down">{Math.floor(seconds % 10)}</div>
        </div>
    );
}

export default Countdown;