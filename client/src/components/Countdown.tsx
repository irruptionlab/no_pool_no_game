import { useContractRead } from 'wagmi'
import ABI_Npng from './utils/ABI_Npng.json'
import { goerli } from './utils/contractAddress'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Countdown = () => {
    const [countDown, setCountDown] = useState(0);
    const { data } = useContractRead({
        addressOrName: goerli.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getEndOfContest',
        chainId: 5,
    })

    useEffect(() => {
        const countDownDate = parseInt(ethers.utils.formatUnits(data?._hex, 0)) * 1000
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

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