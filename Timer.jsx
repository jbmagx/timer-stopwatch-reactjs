import React from 'react';
import { useState, useRef } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button, Tooltip } from '@nextui-org/react';
import TimerInput from './TimerInput.jsx';
import AlarmClockSound from './alarmClockSound.mp3'

const padWithZero = (value) => (value < 10 ? `0${value}` : value);

export default function Timer() {
    const [timerInputs, setTimerInputs] = useState({ days: 0, hours: 0, minutes: 5, seconds: 0 });

    const [timer, setTimer] = useState(300);

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timer);

    const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart, } = useTimer({ expiryTimestamp, onExpire: () => playAudio(), autoStart: false });

    const [totalSecondsReference, setTotalSecondsReference] = useState(totalSeconds);

    const [reset, setReset] = useState(false);

    const audioPlayer = useRef(null);
    function playAudio() {
        audioPlayer.current.play();
    }

    function handleStartPauseResumeButton() {
        if (parseInt(timerInputs.days) === 0 && parseInt(timerInputs.hours) === 0  && parseInt(timerInputs.minutes) === 0  && parseInt(timerInputs.seconds) === 0 ) {
            alert('Timer is set to 00 00:00:00. Please enter a non-zero value for at least one time unit (days, hours, minutes, or seconds) or reset the timer.');
            return;
        }

        if (parseInt(timerInputs.hours) > 23) {
            alert('Invalid hours input! Please enter a number from 0 to 23 only.');
            return;
        }

        if (parseInt(timerInputs.minutes) > 59) {
            alert('Invalid minutes input! Please enter a number from 0 to 59 only.');
            return;
        }

        if (parseInt(timerInputs.seconds) > 59) {
            alert('Invalid seconds input! Please enter a number from 0 to 59 only.');
            return;
        }

        if (totalSeconds !== totalSecondsReference) {
            if (isRunning) {
                pause();
            } else {
                resume();
            }
        } else {
            start();
            setReset(true);
        }
    }

    return (
        <div className='py-2'>
            <div className='flex flex-wrap items-center justify-center mb-5 gap-y-4'>
                <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px] mr-5 xs:mr-0 xxs:mr-0'>
                    <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Days</div>
                    <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                        <div className={`${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]`}>{padWithZero(days)}</div>
                        <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='days' placeholder='00' maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                    </div>
                </div>
                <div className='flex flex-wrap items-center'>
                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Hours</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                            <div className={`${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]`}>{padWithZero(hours)}</div>
                            <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='hours' placeholder='00' maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className={`relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl xxs:text-5xl ${reset ? 'text-black' : 'text-gray-400'}`}>:</div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Minutes</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                            <div className={`${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]`}>{padWithZero(minutes)}</div>
                            <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='minutes' placeholder={timerInputs.minutes === 5 ? '05' : '00'} maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className={`relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl xxs:text-5xl ${reset ? 'text-black' : 'text-gray-400'}`}>:</div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Seconds</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                            <div className={`${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]`}>{padWithZero(seconds)}</div>
                            <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='seconds' placeholder='00' maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-x-5'>
                <Button
                    radius='full'
                    color={totalSeconds === totalSecondsReference ? 'success' : (totalSeconds === 0 ? 'warning' : (isRunning ? 'warning' : 'success'))}
                    onPress={handleStartPauseResumeButton}
                    className='font-semibold'
                >
                    {totalSeconds === totalSecondsReference ? 'Start' : (totalSeconds === 0 ? "Time's Up!" : (isRunning ? 'Pause' : 'Resume'))}
                </Button>
                <Tooltip
                    showArrow={true}
                    content={
                        <div>
                            <div className='text-center'>click to restart the timer</div>
                            <div className='text-center'>or to change the time</div>
                        </div>
                    }
                    placement='bottom'
                    color='warning'
                >
                    <Button
                        radius='full'
                        variant='bordered'
                        color='warning'
                        className='font-semibold'
                        onPress={() => {
                            const time = new Date();
                            time.setSeconds(time.getSeconds() + timer);
                            restart(time, false)
                            setReset(false);
                            audioPlayer.current.pause();
                        }}
                    >
                        Restart
                    </Button>
                </Tooltip>
            </div>
            <audio ref={audioPlayer} src={AlarmClockSound} />
        </div>
    );
};



























// import React from 'react';
// import { useState, useRef } from 'react';
// import { useTimer } from 'react-timer-hook';
// import './Timer.css';
// import TimerInput from './TimerInput.jsx';
// import { Button } from '@nextui-org/react';
// import AlarmClockSound from './alarmClockSound.mp3'

// const padWithZero = (value) => (value < 10 ? `0${value}` : value);

// export default function Timer() {
//     const [time, setTime] = useState({ days: 0, hours: 0, minutes: 5, seconds: 0 });

//     const [timer, setTimer] = useState(300);
//     console.log("timerOutsideReturn: ", timer)

//     const expiryTimestamp = new Date();
//     expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timer);

//     const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart, } = useTimer({ expiryTimestamp, onExpire: () => playAudio(), autoStart: false });

//     const [totalSecondsRef, setTotalSecondsRef] = useState(totalSeconds);

//     const [reset, setReset] = useState(false);

//     console.log("totalSeconds: ", totalSeconds);

//     const audioPlayer = useRef(null);
//     function playAudio() {
//         console.warn("onExpire called");
//         audioPlayer.current.play();
//     }

//     return (
//         <div className='py-2'>
//             <div className='flex flex-wrap items-center justify-center mb-5 gap-y-4'>
//                 <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px] mr-5 xs:mr-0'>
//                     <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Days</div>
//                     <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>
//                         <div className={`${reset ? 'flex' : 'hidden'}`}>{padWithZero(days)}</div>
//                         <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='days' placeholder='00' maxLength={2} time={time} setTime={setTime} timer={timer} setTimer={setTimer} restart={restart} totalSecondsRef={totalSecondsRef} setTotalSecondsRef={setTotalSecondsRef} /></div>
//                     </div>
//                 </div>
//                 <div className='flex flex-wrap items-center'>
//                     <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px]'>
//                         <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Hours</div>
//                         <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>
//                             <div className={`${reset ? 'flex' : 'hidden'}`}>{padWithZero(hours)}</div>
//                             <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='hours' placeholder='00' maxLength={2} time={time} setTime={setTime} timer={timer} setTimer={setTimer} restart={restart} totalSecondsRef={totalSecondsRef} setTotalSecondsRef={setTotalSecondsRef} /></div>
//                         </div>
//                     </div>

//                     <div className='relative'>
//                         <div className={`relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl ${reset ? 'text-black' : 'text-gray-400'}`}>:</div>
//                     </div>

//                     <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px]'>
//                         <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Minutes</div>
//                         <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>
//                             <div className={`${reset ? 'flex' : 'hidden'}`}>{padWithZero(minutes)}</div>
//                             <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='minutes' placeholder='05' maxLength={2} time={time} setTime={setTime} timer={timer} setTimer={setTimer} restart={restart} totalSecondsRef={totalSecondsRef} setTotalSecondsRef={setTotalSecondsRef} /></div>
//                         </div>
//                     </div>

//                     <div className='relative'>
//                         <div className={`relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl ${reset ? 'text-black' : 'text-gray-400'}`}>:</div>
//                     </div>

//                     <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px]'>
//                         <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Seconds</div>
//                         <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>
//                             <div className={`${reset ? 'flex' : 'hidden'}`}>{padWithZero(seconds)}</div>
//                             <div className={`${reset ? 'hidden' : 'flex'}`}><TimerInput inputName='seconds' placeholder='00' maxLength={2} time={time} setTime={setTime} timer={timer} setTimer={setTimer} restart={restart} totalSecondsRef={totalSecondsRef} setTotalSecondsRef={setTotalSecondsRef} /></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='flex flex-wrap items-center justify-center gap-x-5'>
//                 <Button
//                     radius='full'
//                     color={totalSeconds === totalSecondsRef ? 'success' : (totalSeconds === 0 ? 'warning' : (isRunning ? 'warning' : 'success'))}
//                     onPress={() => totalSeconds !== totalSecondsRef ? isRunning ? pause() : resume() : (start(), setReset(true))}
//                 >
//                     {totalSeconds === totalSecondsRef ? 'Start' : (totalSeconds === 0 ? "Time's Up!" : (isRunning ? 'Pause' : 'Resume'))}
//                 </Button>
//                 <Button
//                     radius='full'
//                     variant='bordered'
//                     color='warning'
//                     onPress={() => {
//                         console.log("timer@restartbutton: ", timer);
//                         const time = new Date();
//                         time.setSeconds(time.getSeconds() + timer);
//                         restart(time, false)
//                         setReset(false);
//                         audioPlayer.current.pause();
//                     }}
//                 >
//                     Restart
//                 </Button>
//             </div>
//             <audio ref={audioPlayer} src={AlarmClockSound} />
//         </div>
//     );
// }



























// export default function Stopwatch() {
//     const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, reset, } = useStopwatch({ autoStart: false });

//     return (
//         <div className='py-2'>
//             <div className='flex flex-wrap items-center justify-center mb-5 gap-y-4'>
//                 <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px] mr-5 xs:mr-0'>
//                     <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Days</div>
//                     <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>{padWithZero(days)}</div>
//                 </div>
//                 <div className='flex flex-wrap items-center'>
//                     <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px]'>
//                         <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Hours</div>
//                         <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>{padWithZero(hours)}</div>
//                     </div>

//                     <div className='relative'>
//                         <div className='relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl'>:</div>
//                     </div>

//                     <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px]'>
//                         <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Minutes</div>
//                         <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>{padWithZero(minutes)}</div>
//                     </div>

//                     <div className='relative'>
//                         <div className='relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl'>:</div>
//                     </div>

//                     <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[72px]'>
//                         <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Seconds</div>
//                         <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl'>{padWithZero(seconds)}</div>
//                     </div>
//                 </div>
//             </div>
//             <div className='flex flex-wrap items-center justify-center gap-x-5'>
//                 <Button
//                     radius='full'
//                     color={totalSeconds !== 0 ? isRunning ? 'warning' : 'success' : 'success'}
//                     onClick={isRunning ? pause : start}
//                 >
//                     {totalSeconds !== 0 ? isRunning ? 'Pause' : 'Resume' : 'Start'}
//                 </Button>
//                 <Button
//                     radius='full'
//                     variant='bordered'
//                     color='warning'
//                     onClick={() => reset(undefined, false)}
//                 >
//                     Reset
//                 </Button>
//             </div>
//         </div>
//     );
// };












































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








// import React from 'react';
// import { useState, useEffect } from 'react';
// import './Timer.css';
// import { Button } from '@nextui-org/react';
// import {Tooltip} from '@nextui-org/react';
// import TimerInput from './TimerInput.jsx';

// const padWithZero = (value) => (value < 10 ? `0${value}` : value);

// export default function Timer() {
//     const [time, setTime] = useState({ hours: 0, minutes: 5, seconds: 0 });
//     const [resetTime, setResetTime] = useState({ resetHours: 0, resetMinutes: 5, resetSeconds: 0 });
//     const [isRunning, setIsRunning] = useState(false);

//     useEffect(() => {
//         let interval;

//         if (isRunning) {
//             interval = setInterval(() => {
//                 setTime((prevTime) => {

//                     console.log('prevTime: ', typeof(prevTime.hours), typeof(prevTime.minutes), typeof(prevTime.seconds));

//                     const seconds = parseInt(prevTime.seconds) === 0 ? 59 : parseInt(prevTime.seconds) - 1;
//                     // const minutes = prevTime.seconds === -1 ? prevTime.minutes - 1 : prevTime.minutes;
//                     const minutes = parseInt(prevTime.seconds) === 0 ? parseInt(prevTime.minutes) === 0 ? 59 : parseInt(prevTime.minutes) - 1 : parseInt(prevTime.minutes);
//                     // const hours = prevTime.minutes === 0 && prevTime.seconds === 0 ? prevTime.hours - 1 : prevTime.hours;
//                     const hours = parseInt(prevTime.minutes) === 0 && parseInt(prevTime.seconds) === 0 ? parseInt(prevTime.hours) - 1 : parseInt(prevTime.hours);

//                     console.log(typeof(hours), typeof(minutes), typeof(seconds));

//                     if (parseInt(hours) === 0 && parseInt(minutes) === 0 && parseInt(seconds) === 0) {
//                         clearInterval(interval);
//                         setIsRunning(false);
//                     }

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

//     const startOrStopTimer = () => {
//         console.log(`hours: ${time.hours} type: ${typeof(time.hours)}, minutes: ${time.minutes} type: ${typeof(time.minutes)}, seconds: ${time.seconds} type: ${typeof(time.seconds)}`);
//         console.log(`parseInt hours: ${parseInt(time.hours)} type: ${typeof(parseInt(time.hours))}, parseInt minutes: ${parseInt(time.minutes)} type: ${typeof(parseInt(time.minutes))}, parseInt seconds: ${parseInt(time.seconds)} type: ${typeof(parseInt(time.seconds))}`);

//         if (parseInt(time.hours) === 0 && parseInt(time.minutes) === 0 && parseInt(time.seconds) === 0) {
//             alert('Timer is set to 00:00:00. Please enter a non-zero value for at least one time unit (hours, minutes, or seconds) or reset the timer.');
//             console.log('time is zero');
//             return;
//         } else {
//             setIsRunning((prevIsRunning) => !prevIsRunning);
//         }  
//     };

//     const resetStopwatch = () => {
//         setIsRunning(false);
//         setTime({ hours: resetTime.resetHours, minutes: resetTime.resetMinutes, seconds: resetTime.resetSeconds });
//     };

//     return (
//         <>
//             <div className={`${isRunning ? 'hidden' : 'flex'} flex-wrap items-center justify-center gap-x-1 mb-5`}>
//                 <TimerInput placeholder='hr' maxLength={2} time={time} setTime={setTime} resetTime={resetTime} setResetTime={setResetTime} />
//                 <div className='text-sm'>:</div>
//                 <TimerInput placeholder='min' maxLength={2} time={time} setTime={setTime} resetTime={resetTime} setResetTime={setResetTime} />
//                 <div className='text-sm'>:</div>
//                 <TimerInput placeholder='sec' maxLength={2} time={time} setTime={setTime} resetTime={resetTime} setResetTime={setResetTime} />
//             </div>
//             <div className='flex flex-wrap items-center justify-center mb-5'>
//                 <div className='text-6xl'>{padWithZero(time.hours)}</div>
//                 <div className='text-6xl'>:</div>
//                 <div className='text-6xl'>{padWithZero(time.minutes)}</div>
//                 <div className='text-6xl'>:</div>
//                 <div className='text-6xl'>{padWithZero(time.seconds)}</div>
//             </div>
//             <div className='flex flex-wrap items-center justify-center gap-x-5'>
//                 <Button
//                     color={isRunning ? 'warning' : 'success'}
//                     radius='full'
//                     onClick={startOrStopTimer}
//                 >
//                     {isRunning ? 'Pause' : 'Start'}
//                 </Button>
//                 <Tooltip
//                     showArrow={true}
//                     content={
//                         <div>
//                             <div className='text-center'>click to reset the timer</div>
//                             <div className='text-center'>or to change the time</div>
//                         </div>
//                     }
//                     placement='bottom'
//                     color='warning'
//                 >
//                     <Button
//                         color='warning'
//                         variant='bordered'
//                         radius='full'
//                         onClick={resetStopwatch}
//                     >
//                         Reset
//                     </Button> 
//                 </Tooltip>
//             </div>
//         </>
//     );
// };