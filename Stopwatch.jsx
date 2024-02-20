import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Button } from '@nextui-org/react';

const padWithZero = (value) => (value < 10 ? `0${value}` : value);

export default function Stopwatch() {
    const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, reset, } = useStopwatch({ autoStart: false });

    return (
        <div className='py-2'>
            <div className='flex flex-wrap items-center justify-center mb-5 gap-y-4'>
                <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px] xxs:w-[68px] mr-5 xs:mr-0 xxs:mr-0'>
                    <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Days</div>
                    <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>{padWithZero(days)}</div>
                </div>
                <div className='flex flex-wrap items-center'>
                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Hours</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>{padWithZero(hours)}</div>
                    </div>

                    <div className='relative'>
                        <div className='relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl xxs:text-5xl'>:</div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Minutes</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>{padWithZero(minutes)}</div>
                    </div>

                    <div className='relative'>
                        <div className='relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl xxs:text-5xl'>:</div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Seconds</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>{padWithZero(seconds)}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-x-5'>
                <Button
                    radius='full'
                    color={totalSeconds !== 0 ? isRunning ? 'warning' : 'success' : 'success'}
                    onClick={isRunning ? pause : start}
                    className='font-semibold'
                >
                    {totalSeconds !== 0 ? isRunning ? 'Pause' : 'Resume' : 'Start'}
                </Button>
                <Button
                    radius='full'
                    variant='bordered'
                    color='warning'
                    onClick={() => reset(undefined, false)}
                    className='font-semibold'
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};
































// import React, { useState, useRef, useEffect } from 'react';
// import './Stopwatch.css';
// import { Button } from '@nextui-org/react';

// const padWithZero = (value) => (value < 10 ? `0${value}` : value);

// export default function Stopwatch() {
//     const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
//     const [isRunning, setIsRunning] = useState(false);

//     useEffect(() => {
//         let interval;

//         if (isRunning) {
//             interval = setInterval(() => {
//                 setTime((time) => {
//                     const seconds = time.seconds + 1;
//                     const minutes = seconds === 60 ? time.minutes + 1 : time.minutes;
//                     const hours = minutes === 60 ? time.hours + 1 : time.hours;

//                     return {
//                         hours: hours,
//                         minutes: minutes % 60,
//                         seconds: seconds % 60,
//                     };
//                 });
//             }, 1000);
//         } else {
//             clearInterval(interval);
//         }

//         return () => clearInterval(interval);
//     }, [isRunning]);

//     const startOrStopStopwatch = () => {
//         setIsRunning((isRunning) => !isRunning);
//     };

//     const resetStopwatch = () => {
//         setIsRunning(false);
//         setTime({ hours: 0, minutes: 0, seconds: 0 });
//     };

//     return (
//         <>
//             <div className='flex flex-wrap items-center justify-center mb-5'>
//                 <div className='text-6xl'>{padWithZero(time.hours)}</div>
//                 <div className='text-6xl'>:</div>
//                 <div className='text-6xl'>{padWithZero(time.minutes)}</div>
//                 <div className='text-6xl'>:</div>
//                 <div className='text-6xl'>{padWithZero(time.seconds)}</div>
//             </div>
//             <div className='flex flex-wrap items-center justify-center gap-x-5'>
//                 <Button
//                     color={isRunning ? 'danger' : 'success'}
//                     radius='full'
//                     onClick={startOrStopStopwatch}
//                 >
//                     {isRunning ? 'Stop' : 'Start'}
//                 </Button>
//                 <Button
//                     color='warning'
//                     variant='bordered'
//                     radius='full'
//                     onClick={resetStopwatch}
//                 >
//                     Reset
//                 </Button>
//             </div>
//         </>
//     );
// };
