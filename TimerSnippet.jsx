import React from 'react';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import './Snippet.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function TimerSnippet() {
    const jsxCodeString = `import React from 'react';
import { useState, useRef } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button, Tooltip } from '@nextui-org/react';
import TimerInput from './TimerInput.jsx';
import AlarmClockSound from './alarmClockSound.mp3'

const padWithZero = (value) => (value < 10 ? \`0\${value}\` : value);

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
                        <div className={\`\${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]\`}>{padWithZero(days)}</div>
                        <div className={\`\${reset ? 'hidden' : 'flex'}\`}><TimerInput inputName='days' placeholder='00' maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                    </div>
                </div>
                <div className='flex flex-wrap items-center'>
                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Hours</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                            <div className={\`\${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]\`}>{padWithZero(hours)}</div>
                            <div className={\`\${reset ? 'hidden' : 'flex'}\`}><TimerInput inputName='hours' placeholder='00' maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className={\`relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl xxs:text-5xl \${reset ? 'text-black' : 'text-gray-400'}\`}>:</div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Minutes</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                            <div className={\`\${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]\`}>{padWithZero(minutes)}</div>
                            <div className={\`\${reset ? 'hidden' : 'flex'}\`}><TimerInput inputName='minutes' placeholder={timerInputs.minutes === 5 ? '05' : '00'} maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className={\`relative top-[5px] xs:top-[7px] text-6xl xs:text-5xl xxs:text-5xl \${reset ? 'text-black' : 'text-gray-400'}\`}>:</div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center w-[80px] xs:w-[68px] xxs:w-[68px]'>
                        <div className='flex flex-wrap items-center justify-center w-full uppercase font-bold text-xs xs:text-[0.65rem] mb-2'>Seconds</div>
                        <div className='flex flex-wrap items-center justify-center w-full text-6xl xs:text-5xl xxs:text-5xl'>
                            <div className={\`\${reset ? 'flex' : 'hidden'} items-center xs:h-[60px] xxs:h-[60px]\`}>{padWithZero(seconds)}</div>
                            <div className={\`\${reset ? 'hidden' : 'flex'}\`}><TimerInput inputName='seconds' placeholder='00' maxLength={2} timerInputs={timerInputs} setTimerInputs={setTimerInputs} timer={timer} setTimer={setTimer} restart={restart} totalSecondsReference={totalSecondsReference} setTotalSecondsReference={setTotalSecondsReference} /></div>
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
};`;

    const [copyJSX, setCopyJSX] = useState('Copy');

    function copyJSXCode() {
        navigator.clipboard.writeText(jsxCodeString);

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const copyCopied = async () => {
            setCopyJSX('Copied');
            await delay(1000);
            setCopyJSX('Copy');
        };

        setTimeout(copyCopied, 250);
    };

    return (
        <div id='code-container' className='max-w-[702px] sm:max-w-[574px] mx-auto rounded-[5px] border border-[#656565]'>
            <div id='code-container-header' className='flex flex-wrap justify-between items-center px-5 h-10 bg-[#343A46] rounded-tl-[4px] rounded-tr-[4px] border-b border-[#656565]'>
                <div className='font-["Monaco",_sans-serif] text-sm text-white tracking-[-0.75px]'>Timer.jsx</div>
                <Button
                    className='font-["Monaco",_sans-serif] text-sm text-white px-unit-2 min-w-unit-10 h-unit-6 data-[hover=true]:bg-white data-[hover=true]:text-black'
                    color='primary'
                    variant='light'
                    onClick={copyJSXCode}
                >
                    {copyJSX}
                </Button>
            </div>
            <SyntaxHighlighter 
                language='jsx' 
                style={vscDarkPlus} 
                showLineNumbers={true} 
            >
                {jsxCodeString}
            </SyntaxHighlighter>
        </div>
    );
};