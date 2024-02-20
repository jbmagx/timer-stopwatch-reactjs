import React from 'react';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import './Snippet.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function StopwatchSnippet() {
    const jsxCodeString = `import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Button } from '@nextui-org/react';

const padWithZero = (value) => (value < 10 ? \`0\${value}\` : value);

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
                <div className='font-["Monaco",_sans-serif] text-sm text-white tracking-[-0.75px]'>Stopwatch.jsx</div>
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