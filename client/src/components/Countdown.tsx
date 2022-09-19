import { useCountdown } from './utils/useCountdown';

const Countdown = () => {
    const [hours, minutes, seconds] = useCountdown();

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