import React from 'react';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import './Snippet.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function TimerInputSnippet() {
    const jsxCodeString = `export default function TimerInput({ placeholder, maxLength, inputName, timerInputs, setTimerInputs, timer, setTimer, restart, totalSecondsReference, setTotalSecondsReference }) {
    function TimerInputValidation(event) {
        let inputValue = parseInt(event.target.value) || 0;
        // console.log(\`name: \${inputName}, value: \${inputValue}, type: \${typeof(inputValue)}\`);

        timerInputs.days = inputName === 'days' ? inputValue : timerInputs.days;
        timerInputs.hours = inputName === 'hours' ? inputValue : timerInputs.hours;
        timerInputs.minutes = inputName === 'minutes' ? inputValue : timerInputs.minutes;
        timerInputs.seconds = inputName === 'seconds' ? inputValue : timerInputs.seconds;

        setTimerInputs((timerInputs) => {
            return {
                days: timerInputs.days,
                hours: timerInputs.hours,
                minutes: timerInputs.minutes,
                seconds: timerInputs.seconds,
            };
        });

        // console.log("timerInputs@TimerInputJSX: ", timerInputs);

        let totalTimeSet = timerInputs.days * 86400 + timerInputs.hours * 3600 + timerInputs.minutes * 60 + timerInputs.seconds;
        setTimer(totalTimeSet);
        setTotalSecondsReference(totalTimeSet);
        const timeSet = new Date();
        timeSet.setSeconds(timeSet.getSeconds() + totalTimeSet);
        restart(timeSet, false);
    };

    function inputPadding(event) {
        const padWithZero = (value) => (value < 10 ? \`0\${value}\` : value);
        (event.target.value === '') ? null : event.target.value = padWithZero(event.target.value);
    };

    function restrictInput(event) {
        if (
            (event.keyCode > 47 && event.keyCode < 59) ||
            event.key === 'Backspace' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight'
        ) {
            // do nothing
        } else {
            event.preventDefault();
        }
    };

    return (
        <input
            onBlur={inputPadding}
            onChange={TimerInputValidation}
            onKeyDown={restrictInput}
            placeholder={placeholder}
            type='text'
            maxLength={maxLength}
            className='outline-none bg-gray-100 text-gray-400 rounded-lg w-[80px] xs:w-[68px] xxs:w-[68px] h-[60px] text-center text-6xl xs:text-5xl xxs:text-5xl'
        />
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
                <div className='font-["Monaco",_sans-serif] text-sm text-white tracking-[-0.75px]'>TimerInput.jsx</div>
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