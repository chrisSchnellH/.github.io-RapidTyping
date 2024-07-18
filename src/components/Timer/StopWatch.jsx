import { useEffect } from "react";

export const StopWatch = ({ time, setTime, running }) => {

    useEffect(() => {
        let timer;
        if (running) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [running, setTime]);

    const formatTime = (time) => {
        const getMilliseconds = `0${time % 1000}`.slice(-3, -1);
        const seconds = Math.floor(time / 1000);
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
        return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
    };

    return (
        <>
            <h1 className="text-center">{formatTime(time)}</h1>
        </>
    );
};
