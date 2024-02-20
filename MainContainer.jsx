import React from 'react';
import { Button, Chip, Link, Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import Timer from './Timer.jsx';
import Stopwatch from './Stopwatch.jsx';
import TimerSnippet from './TimerSnippet.jsx';
import TimerInputSnippet from './TimerInputSnippet.jsx';
import StopwatchSnippet from './StopwatchSnippet.jsx';
import { GitHubIcon } from '../../assets/svg-jsx/github-icon.jsx';

export default function MainContainer() {
    return (
        <div id='main-container' className='px-6 py-20 py-20 sm2:py-16 sm:py-14 xs:py-12 xxs:py-10'>
            <div className='max-w-[460px] xs:max-w-[291px] xxs:max-w-[291px] mx-auto pb-14 xs:pb-12 xxs:pb-10 flex w-full flex-col'>
                <Tabs fullWidth aria-label='Options' className='justify-center'>
                    <Tab key='timer' title='Timer' className='px-0 pb-0'>
                        <Card>
                            <CardBody>
                                <Timer />
                            </CardBody>
                        </Card>  
                    </Tab>
                    <Tab key='stopwatch' title='Stopwatch' className='px-0 pb-0'>
                        <Card>
                            <CardBody>
                                <Stopwatch />
                            </CardBody>
                        </Card>  
                    </Tab>
                </Tabs>
            </div>
            <div className='flex flex-wrap align-center justify-center gap-2 xs:max-w-[276px] mx-auto pb-14 xs:pb-12 xxs:pb-10'>
                <div className='self-center font-semibold uppercase text-small tracking-tight'>Tech Stack:</div>
                <div className='flex flex-wrap align-center justify-center gap-2'>
                    <Link href='https://react.dev/' target='_blank'>
                        <Chip
                            variant="solid"
                            color="primary"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            ReactJS
                        </Chip>
                    </Link>
                    <Link href='https://www.npmjs.com/package/react-timer-hook' target='_blank'>
                        <Chip
                            variant="solid"
                            color="danger"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            react-timer-hook
                        </Chip>
                    </Link>
                    <Link href='https://nextui.org/' target='_blank'>
                        <Chip
                            variant="solid"
                            color="secondary"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            NextUI
                        </Chip>
                    </Link>
                    <Link href='https://tailwindcss.com/' target='_blank'>
                        <Chip
                            variant="solid"
                            color="success"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            Tailwind CSS
                        </Chip>
                    </Link>
                </div>
            </div>

            <div className='pb-12 xxs:pb-10'>
                <TimerSnippet />
            </div>

            <div className='pb-12 xxs:pb-10'>
                <TimerInputSnippet />
            </div>

            <div className='pb-12 xxs:pb-10'>
                <StopwatchSnippet />
            </div>
            
            <div className='flex flex-wrap justify-center'>
                <Link href='https://github.com/jbmagx/timer-stopwatch-reactjs' target='_blank'>
                    <Button
                        className='bg-[#0A7EA4] text-sm uppercase font-semibold py-6 px-8'
                        color='primary'
                        variant='solid'
                        radius='full'
                        endContent={<GitHubIcon height={32} width={32} fill={'#FFFFFF'} />}
                    >
                        Project Repository
                    </Button>
                </Link>
            </div>
        </div>
    );
};