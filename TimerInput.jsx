export default function TimerInput({ placeholder, maxLength, inputName, timerInputs, setTimerInputs, timer, setTimer, restart, totalSecondsReference, setTotalSecondsReference }) {
    function TimerInputValidation(event) {
        let inputValue = parseInt(event.target.value) || 0;
        // console.log(`name: ${inputName}, value: ${inputValue}, type: ${typeof(inputValue)}`);

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
        const padWithZero = (value) => (value < 10 ? `0${value}` : value);
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
};



































// export default function TimerInput({ placeholder, maxLength, inputName, time, setTime, timer, setTimer, restart, totalSecondsRef, setTotalSecondsRef }) {
//     function TimerInputValidation(event) {
//         let inputValue = parseInt(event.target.value) || 0;
//         console.log(`name: ${inputName}, value: ${inputValue}, type: ${typeof(inputValue)}`);

//         if (inputName === 'hours') {
//             (inputValue > 23) ? alert('Invalid input! Please enter a number from 0 to 23 only.') : null;
//             inputValue = inputValue > 23 ? 0 : inputValue;
//         }

//         if (inputName === 'minutes' || inputName === 'seconds') {
//             (inputValue > 59) ? alert('Invalid input! Please enter a number from 0 to 59 only.') : null;
//             inputValue = inputValue > 59 ? 0 : inputValue;
//         }

//         time.days = inputName === 'days' ? inputValue : time.days;
//         time.hours = inputName === 'hours' ? inputValue : time.hours;
//         time.minutes = inputName === 'minutes' ? inputValue : time.minutes;
//         time.seconds = inputName === 'seconds' ? inputValue : time.seconds;

//         setTime((time) => {
//             return {
//                 days: time.days,
//                 hours: time.hours,
//                 minutes: time.minutes,
//                 seconds: time.seconds,
//             }
//         })

//         console.log("time@TimerInput: ", time);

//         let totalTimeSet = time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds;
//         setTimer(totalTimeSet);
//         setTotalSecondsRef(totalTimeSet);
//         const timeSet = new Date();
//         timeSet.setSeconds(timeSet.getSeconds() + totalTimeSet);
//         restart(timeSet, false);

//         // const padWithZero = (value) => (value < 10 ? `0${value}` : value);
//         // event.target.value = padWithZero(inputValue);
//     };

//     function inputPadding(event) {
//         const padWithZero = (value) => (value < 10 ? `0${value}` : value);
//         event.target.value = padWithZero(event.target.value);
//     }

//     function restrictInput(event) {
//         if (
//             (event.keyCode > 47 && event.keyCode < 59) ||
//             event.key === 'Backspace' ||
//             event.key === 'ArrowLeft' ||
//             event.key === 'ArrowRight'
//         ) {
//             // do nothing
//         } else {
//             event.preventDefault();
//         }
//     }

//     return (
//         <input
//             onBlur={inputPadding}
//             onChange={TimerInputValidation}
//             onKeyDown={restrictInput}
//             placeholder={placeholder}
//             type='text'
//             maxLength={maxLength}
//             className='outline-none bg-gray-100 text-gray-400 rounded-lg w-[80px] h-[60px] text-center text-6xl'
//         />
//     );
// }




















































// export default function TimerInput({ placeholder, maxLength, time, setTime, resetTime, setResetTime }) {
//     function TimerInputValidation(event) {
//         let inputValue = parseInt(event.target.value) || 0;
//         console.log(`${inputValue}, type: ${typeof(inputValue)}, ${placeholder}`);
//         // event.target.value = parseInt(event.target.value) || 0;

//         if (placeholder === 'min' || placeholder === 'sec') {
//             console.log(`type: ${typeof(inputValue)}`);
//             (inputValue > 59) ? alert('Invalid input! Please enter a number from 0 to 59 only.') : null;
//             inputValue = inputValue > 59 ? 0 : inputValue;
//             console.log(`input value: ${inputValue}, type: ${typeof(inputValue)}`);
//         }
//         // if (event.target.placeholder === 'min' || event.target.placeholder === 'sec') {
//         //     event.target.value = event.target.value > 59 ? 0 : event.target.value;
//         // }

//         time.hours = placeholder === 'hr' ? inputValue : time.hours;
//         resetTime.resetHours = placeholder === 'hr' ? inputValue : resetTime.resetHours;
//         console.log(`time.hours: ${time.hours}, type: ${typeof(time.hours)}`);
//         // time.hours = event.target.placeholder === 'hr' ? event.target.value : time.hours;

//         time.minutes = placeholder === 'min' ? inputValue : time.minutes;
//         resetTime.resetMinutes = placeholder === 'min' ? inputValue : resetTime.resetMinutes;
//         console.log(`time.minutes: ${time.minutes}, type: ${typeof(time.minutes)}`);
//         // time.minutes = event.target.placeholder === 'min' ? event.target.value : time.minutes;

//         time.seconds = placeholder === 'sec' ? inputValue : time.seconds;
//         resetTime.resetSeconds = placeholder === 'sec' ? inputValue : resetTime.resetSeconds;
//         console.log(`time.seconds: ${time.seconds}, type: ${typeof(time.seconds)}`);
//         // time.seconds = event.target.placeholder === 'sec' ? event.target.value : time.seconds;

//         console.log('resetTime: ', resetTime.resetHours, resetTime.resetMinutes, resetTime.resetSeconds)

//         setTime((time) => {
//             return {
//                 hours: time.hours,
//                 minutes: time.minutes,
//                 seconds: time.seconds,
//             }
//         })

//         setResetTime((resetTime) => {
//             return {
//                 resetHours: resetTime.resetHours,
//                 resetMinutes: resetTime.resetMinutes,
//                 resetSeconds: resetTime.resetSeconds,
//             }
//         })

//         const padWithZero = (value) => (value < 10 ? `0${value}` : value);
//         event.target.value = padWithZero(inputValue);
//         console.log(`event target value: ${event.target.value} type: ${typeof(event.target.value)}, input value: ${inputValue} type: ${typeof(inputValue)}`);
//     };

//     function restrictInput(event) {
//         if (
//             (event.keyCode > 47 && event.keyCode < 59) ||
//             event.key === 'Backspace' ||
//             event.key === 'ArrowLeft' ||
//             event.key === 'ArrowRight'
//         ) {
//             // do nothing
//         } else {
//             event.preventDefault();
//         }
//     }

//     return (
//     <input
//         onBlur={TimerInputValidation}
//         onKeyDown={restrictInput}
//         placeholder={placeholder}
//         type='text'
//         maxLength={maxLength}
//         className='outline-none bg-gray-100 border rounded-lg w-[64px] h-8 px-3 text-center text-sm'
//     />
//     );
// }