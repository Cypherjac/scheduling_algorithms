import jQuery from 'jquery'
import React, { useState } from "react"
import useInterval from '@/hooks/useInterval'
import usePrevious from '@/hooks/usePrevious'

import { cx, css } from '@emotion/css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

// FIXME: DARK AND LIGHT MODE VIEWER - REACT


export function SimTableStatic() {
    return (
        <main>
            <div className="process-container rounded-lg my-4 px-3 py-1 max-w-2xl mx-auto dark:bg-gray-700">
                <div className="process-block my-2 grid grid-cols-8 rounded-lg dark:bg-gray-800 text-white">
                    <div className="col-span-1 text-center p-4 rounded-l-lg dark:bg-gray-900">
                        P1
                    </div>
                    <div className="col-span-7">
                        <div className="process-progress h-full block relative rounded-r-lg" style={{ width: "80%", backgroundColor: "green" }}>
                            <span className="flex flex-col items-center justify-center text-center h-full">80%</span>
                        </div>
                    </div>
                </div>
                <div className="process-block my-2 grid grid-cols-8 rounded-lg dark:bg-gray-800 text-white">
                    <div className="col-span-1 text-center p-4 rounded-l-lg dark:bg-gray-900">
                        P2
                    </div>
                    <div className="col-span-7">
                        <div className="process-progress h-full block relative rounded-r-lg" style={{ width: "0%", backgroundColor: "red" }}>
                            <span className="flex flex-col items-center justify-center text-center h-full">0%</span>
                        </div>
                    </div>
                </div>
                <div className="process-block my-2 grid grid-cols-8 rounded-lg dark:bg-gray-800 text-white">
                    <div className="col-span-1 text-center p-4 rounded-l-lg dark:bg-gray-900">
                        P3
                    </div>
                    <div className="col-span-7">
                        <div className="process-progress h-full block relative rounded-r-lg" style={{ width: "10%", backgroundColor: "red" }}>
                            <span className="flex flex-col items-center justify-center text-center h-full">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export function SimTableQueue() {
    return (
        <main>
            <div className="process-container rounded-lg my-4 px-3 py-1 max-w-2xl mx-auto dark:bg-gray-700">
                <div className="process-block my-2 grid grid-cols-8 rounded-lg dark:bg-gray-800 text-white">
                    <div className="col-span-1 text-center p-4 rounded-l-lg dark:bg-gray-900">
                        P1
                    </div>
                    <div className="col-span-7">
                        <div className="process-progress h-full block relative rounded-r-lg" style={{ width: "80%", backgroundColor: "green" }}>
                            <span className="flex flex-col items-center justify-center text-center h-full">80%</span>
                        </div>
                    </div>
                </div>
                <div className="process-block my-2 grid grid-cols-8 rounded-lg dark:bg-gray-800 text-white">
                    <div className="col-span-1 text-center p-4 rounded-l-lg dark:bg-gray-900">
                        P2
                    </div>
                    <div className="col-span-7">
                        <div className="process-progress h-full block relative rounded-r-lg" style={{ width: "0%", backgroundColor: "red" }}>
                            <span className="flex flex-col items-center justify-center text-center h-full">0%</span>
                        </div>
                    </div>
                </div>
                <div className="process-block my-2 grid grid-cols-8 rounded-lg dark:bg-gray-800 text-white">
                    <div className="col-span-1 text-center p-4 rounded-l-lg dark:bg-gray-900">
                        P3
                    </div>
                    <div className="col-span-7">
                        <div className="process-progress h-full block relative rounded-r-lg" style={{ width: "10%", backgroundColor: "red" }}>
                            <span className="flex flex-col items-center justify-center text-center h-full">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

function DynamicProcesses({ data, isPlaying, setPlaying, delay, count, setCount, countReset, setCountReset, intervalCount, setIntervalCount }) {
    const [processes, updateProcesses] = useState<any>([])

    const ColorManager = (fraction) => {
        let r = 255, g = 0, b = 0
        if(fraction <= 0.5){
            g = (fraction / 0.5) * 255
        }
        else if(fraction > 0.5){
            g = 255
            r = ((1 - fraction) / 0.5) * 255
        }
        return `rgb(${r},${g},${b})`;
    }

    setCount(intervalCount*delay)
    data = Object.values(data?.dProcesses)

    countReset ? setPlaying(true) : ''

    useInterval(() => {
        if(data.length > 1){
            if(intervalCount < (data.length)){
                countReset ?
                    (
                        updateProcesses(data[0]),
                        setPlaying(false),
                        setCountReset(false)
                    )
                : updateProcesses(data[intervalCount])
            } else setPlaying(false)
        }
        setCount(count + delay)
        setIntervalCount(intervalCount + 1)
    }, isPlaying ? delay : null);

    return processes?.processes_state?.map((proc, index) => {
        const { process, burst_time, executed } = proc;
        return (
            <div key={index} className="process-block my-2 grid grid-cols-8 rounded-lg bg-gray-400 dark:bg-gray-800 text-white">
                <div className="col-span-1 text-center p-3 rounded-l-lg bg-gray-500 dark:bg-gray-900">
                    {process}
                </div>
                <div className="col-span-7">
                    <div
                        className={
                            cx(
                                'process-progress h-full block relative rounded-r-lg',
                                css`
                                    transition: width ${delay}ms ease-out;
                                    width: ${ (Number(executed) / Number(burst_time))*100 }%;
                                    background-color: ${ ColorManager((Number(executed) / Number(burst_time))) };
                                    font-size: 20px;
                                `
                            )
                        }
                    >
                        <span className="flex flex-col w-full items-center justify-center text-center text-white dark:text-white h-full">{Math.floor((Number(executed) / Number(burst_time)) * 100)}%</span>
                    </div>
                </div>
            </div>
        )
    });
}

export function DProcessTable(dProcesses) {
    const [delay, setDelay] = useState(1000);
    const [isPlaying, setPlaying] = useState<boolean>(false)
    let [count, setCount] = useState(0);
    let [intervalCount, setIntervalCount] = useState(0);
    let [countReset, setCountReset] = useState(true);

    function handleDelayChange(e){
        setDelay(Number(e.target.value));
        setCount(intervalCount*delay)
    }
    
    function handleStop(){
        setCount(0)
        setIntervalCount(0)
        setCountReset(true)
    }

    return (
        <main className='max-w-2xl mx-auto py-4 px-2 relative'>

            {
                !dProcesses.auto ?
                    <div>
                        <label htmlFor="delay-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Animation Speed:
                            <span className='ml-2 rounded-md bg-gray-300 text-gray-900 dark:text-white dark:bg-gray-500 p-1'>{delay} ms</span>
                            <span className='ml-2 rounded-md bg-gray-300 text-gray-900 dark:text-white dark:bg-gray-500 p-1'>{delay/1000} s</span>
                        </label>
                        <input id="delay-input" type="range" value={delay} onChange={handleDelayChange} min="100" max="2000" step="100" className="w-full h-3 bg-gray-400 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"></input>

                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button onClick={() => setPlaying(!isPlaying)}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                {
                                    isPlaying ?
                                        <PauseIcon></PauseIcon> :
                                    <PlayArrowIcon></PlayArrowIcon>
                                }
                            </button>
                            <button disabled={delay === 0} onClick={() => handleStop()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                <StopIcon></StopIcon>
                            </button>
                            <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                { 
                                    isPlaying ?
                                        intervalCount-1 > 0 ? intervalCount-1 : 0
                                    : intervalCount-2 > 0 ? intervalCount-2 : 0
                                }
                                s
                            </div>
                        </div>
                    </div>
                : ""
            }

            {
                typeof dProcesses == "object" ?
                    <div className="process-container rounded-lg my-4 px-3 py-1 max-w-2xl mx-auto dark:bg-gray-700">
                        <DynamicProcesses
                            isPlaying={isPlaying}
                            setPlaying={setPlaying}
                            delay={delay}
                            data={dProcesses}
                            count={count}
                            setCount={setCount}
                            intervalCount={intervalCount}
                            setIntervalCount={setIntervalCount}
                            countReset={countReset}
                            setCountReset={setCountReset}
                        />
                    </div>
                : ''
            }

        </main>
    )
}

export function DProcessTableAuto(dProcesses) {
    const [delay, setDelay] = useState(1000);
    const [isPlaying, setPlaying] = useState<boolean>(true)
    let [count, setCount] = useState(0);
    let [intervalCount, setIntervalCount] = useState(0);
    let [countReset, setCountReset] = useState(true);

    function handleDelayChange(e){
        setDelay(Number(e.target.value));
        setCount(intervalCount*delay)
    }
    
    function handleStop(){
        setCount(0)
        setIntervalCount(0)
        setCountReset(true)
    }

    return (
        <main className='max-w-2xl mx-auto py-4 px-2 relative'>

            {
                !dProcesses.auto ?
                    <div>
                        <label htmlFor="delay-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Animation Speed:
                            <span className='ml-2 rounded-md bg-gray-300 text-gray-900 dark:text-white dark:bg-gray-500 p-1'>{delay} ms</span>
                            <span className='ml-2 rounded-md bg-gray-300 text-gray-900 dark:text-white dark:bg-gray-500 p-1'>{delay/1000} s</span>
                        </label>
                        <input id="delay-input" type="range" value={delay} onChange={handleDelayChange} min="100" max="2000" step="100" className="w-full h-3 bg-gray-400 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"></input>

                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button onClick={() => setPlaying(!isPlaying)}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                {
                                    isPlaying ?
                                        <PauseIcon></PauseIcon> :
                                    <PlayArrowIcon></PlayArrowIcon>
                                }
                            </button>
                            <button disabled={delay === 0} onClick={() => handleStop()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                <StopIcon></StopIcon>
                            </button>
                        </div>
                    </div>
                : ""
            }

            {
                typeof dProcesses == "object" ?
                    <div className="process-container rounded-lg my-4 px-3 py-1 max-w-2xl mx-auto bg-gray-100 dark:bg-gray-700">
                        <DynamicProcesses
                            isPlaying={isPlaying}
                            setPlaying={setPlaying}
                            delay={delay}
                            data={dProcesses}
                            count={count}
                            setCount={setCount}
                            intervalCount={intervalCount}
                            setIntervalCount={setIntervalCount}
                            countReset={countReset}
                            setCountReset={setCountReset}
                        />
                    </div>
                : ''
            }

        </main>
    )
}

export function DProcessGantt(data){
    return data.gantt.chart.map((proc, index) => {
        const { process_name, count } = proc;
        return (
            <div key={index} className='h-10 w-12 bg-gray-100 dark:bg-gray-700 min-w-12 relative flex flex-col items-center justify-center border-1px border-gray-500 dark:border-gray-900'>
                <span className='z-2'>
                    {process_name}
                </span>
                {
                    index == 0 ?
                        <span className='absolute top-10 -left-4 text-xs w-8 text-center font-bold text-black dark:text-white z-3'>
                            {data.gantt.min_value}
                        </span>
                    : ''
                }
                <span className='absolute top-10 -right-4 text-xs w-8 text-center font-bold text-black dark:text-white z-3'>
                    {count}
                </span>
            </div>
        )
    })
}