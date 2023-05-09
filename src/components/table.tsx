import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import StopIcon from '@mui/icons-material/Stop';
import { DProcessTable, DProcessGantt } from './simtable';
import { SwipeAnimationAlt } from './swipe_animation';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Thumbs } from "swiper";

const Simulate = require("../scripts/simulate.js");

function Loader() {
    return (
        `<svg xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; display: block; shape-rendering: auto; margin-right: 0.5rem;" width="22px" height="22px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="translate(81,50)">
                <g transform="rotate(0)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="1">
                    <animateTransform attributeName="transform" type="scale" begin="-0.3647416413373861s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="-0.3647416413373861s"></animate>
                </circle>
                </g>
            </g>
            <g transform="translate(69.32818385762074,74.23677595650892)">
                <g transform="rotate(51.42857142857143)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="0.8571428571428571">
                    <animateTransform attributeName="transform" type="scale" begin="-0.3039513677811551s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="-0.3039513677811551s"></animate>
                </circle>
                </g>
            </g>
            <g transform="translate(43.10185104735426,80.22276527763654)">
                <g transform="rotate(102.85714285714286)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="0.7142857142857143">
                    <animateTransform attributeName="transform" type="scale" begin="-0.24316109422492407s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="-0.24316109422492407s"></animate>
                </circle>
                </g>
            </g>
            <g transform="translate(22.06996509502501,63.450395912644304)">
                <g transform="rotate(154.2857142857143)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="0.5714285714285714">
                    <animateTransform attributeName="transform" type="scale" begin="-0.18237082066869306s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="-0.18237082066869306s"></animate>
                </circle>
                </g>
            </g>
            <g transform="translate(22.069965095025008,36.5496040873557)">
                <g transform="rotate(205.71428571428572)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="0.42857142857142855">
                    <animateTransform attributeName="transform" type="scale" begin="-0.12158054711246204s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="-0.12158054711246204s"></animate>
                </circle>
                </g>
            </g>
            <g transform="translate(43.101851047354245,19.777234722363467)">
                <g transform="rotate(257.1428571428571)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="0.2857142857142857">
                    <animateTransform attributeName="transform" type="scale" begin="-0.06079027355623102s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="-0.06079027355623102s"></animate>
                </circle>
                </g>
            </g>
            <g transform="translate(69.32818385762073,25.76322404349107)">
                <g transform="rotate(308.5714285714286)">
                <circle cx="0" cy="0" r="5" fill="#ffffff" fill-opacity="0.14285714285714285">
                    <animateTransform attributeName="transform" type="scale" begin="0s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.4255319148936171s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
                </circle>
                </g>
            </g>
        </svg>`
    )
}

function Processes({ rows, removeProcess, onValUpdate }) {
    return rows.map((rowsData, index) => {
        const { process, burst_time, arrival_time, process_name_state, burst_time_state, arrival_time_state } = rowsData;
        return (
            <tr key={index} className="border-b bg-white dark:bg-gray-900 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition transition-ease transition-400ms">
                <th scope="row" className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <div className={`relative block w-2 h-2 l-2 mx-1 ${process_name_state} rounded-full transition transition-ease transition-duration-800`}></div>
                        <input
                            type='text'
                            name='process'
                            onChange={(e) => onValUpdate(index, e)}
                            className='w-full block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={process}
                            placeholder='Process Name'
                        />
                    </div>
                </th>
                <td className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <div className={`relative block w-2 h-2 l-2 mx-1 ${burst_time_state} rounded-full transition transition-ease transition-duration-800`}></div>
                        <input
                            type='number'
                            name='burst_time'
                            onChange={(e) => onValUpdate(index, e)}
                            className='w-full block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={burst_time}
                            placeholder='Burst Time'
                        />
                    </div>
                </td>
                <td className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <div className={`relative block w-2 h-2 l-2 mx-1 ${arrival_time_state} rounded-full transition transition-ease transition-duration-800`}></div>
                        <input
                            type='number'
                            name='arrival_time'
                            onChange={(e) => onValUpdate(index, e)}
                            className='w-full block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={arrival_time}
                            placeholder='Arrival Time'
                        />
                    </div>
                </td>
                <td className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <LockIcon className="mr-2 text-gray-500" />
                    <span style={{ userSelect: "none" }}>3</span>
                </td>
                <td className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <DeleteIcon onClick={() => removeProcess(index)} className='rounded-full p-2 bg-transparent hover:bg-danger-default cursor-pointer transition transition-ease transition-duration-300' fontSize="large" />
                </td>
            </tr>
        )
    })
}

function SwiperSlides({ slides, initGantt, active, thumbsSwiper }){
    const { FCFSTable, FCFSGantt, FCFSGanttStatus, FCFSGanttButton, SJFTable, SJFGantt, SJFGanttStatus, SJFGanttButton, SRTNTable, SRTNGantt, SRTNGanttStatus, SRTNGanttButton, RRTable, RRGantt, RRGanttStatus, RRGanttButton } = slides
    return (
        <Swiper
            loop={false}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="py-4"
        >
        {
            active === 1 ?
                <>
                    <SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-lg'>
                        <div className='w-max mx-auto my-4 bg-blue-700 rounded-md py-2 px-8'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='font-bold text-md text-white'>FCFS</p>
                                <p className='text-xs text-center text-gray-300'>First Come First Serve</p>
                            </div>
                        </div>
                        <DProcessTable dProcesses={FCFSTable} />
                        {
                            !FCFSGanttStatus ?
                                <div className='flex flex-col items-center justify-center mb-8'>
                                    <button
                                        onClick={() => initGantt("FCFS")}
                                        className='block w-max relative flex flex-row mx-auto items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                        {
                                            FCFSGanttButton == 1 ?
                                                "Generate Gantt Chart"
                                            : <>
                                                <span className="mr-2" dangerouslySetInnerHTML={{ __html: Loader() }} />
                                                Generating
                                            </>
                                        }
                                    </button>
                                </div>
                            : ''
                        }
                        {
                            FCFSGanttStatus ?
                                <>
                                    <p className='text-md font-bold text-left mb-4 pl-8'>Gantt Chart</p>
                                    <div className="flex flex-row px-6 pb-6 mb-8 items-center justify-start relative mx-auto overflow-x-scroll" style={{width: "calc(100% - 12px)"}}>
                                        <DProcessGantt gantt={FCFSGantt} />
                                    </div>
                                </>
                            : ""
                        }
                    </SwiperSlide>
                    <SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-lg'>
                        <div className='w-max mx-auto my-4 bg-green-700 rounded-md py-2 px-8'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='font-bold text-md text-white'>SJF</p>
                                <p className='text-xs text-center text-gray-300'>Shortest Job First</p>
                            </div>
                        </div>
                        <DProcessTable dProcesses={SJFTable} />
                        {
                            !SJFGanttStatus ?
                                <div className='flex flex-col items-center justify-center mb-8'>
                                    <button
                                        onClick={() => initGantt("SJF")}
                                        className='block w-max relative flex flex-row mx-auto items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                        {
                                            SJFGanttButton == 1 ?
                                                "Generate Gantt Chart"
                                            : <>
                                                <span className="mr-2" dangerouslySetInnerHTML={{ __html: Loader() }} />
                                                Generating
                                            </>
                                        }
                                    </button>
                                </div>
                            : ''
                        }
                        {
                            SJFGanttStatus ?
                                <>
                                    <p className='text-md font-bold text-left mb-4 pl-8'>Gantt Chart</p>
                                    <div className="flex flex-row px-6 pb-6 mb-8 items-center justify-start relative mx-auto overflow-x-scroll" style={{width: "calc(100% - 12px)"}}>
                                        <DProcessGantt gantt={SJFGantt} />
                                    </div>
                                </>
                            : ""
                        }
                    </SwiperSlide>
                    <SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-lg'>
                        <div className='w-max mx-auto my-4 bg-orange-700 rounded-md py-2 px-8'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='font-bold text-md text-white'>SRTN</p>
                                <p className='text-xs text-center text-gray-300'>Shortest Remaining Time Next</p>
                            </div>
                        </div>
                        <DProcessTable dProcesses={SRTNTable} />
                        {
                            !SRTNGanttStatus ?
                                <div className='flex flex-col items-center justify-center mb-8'>
                                    <button
                                        onClick={() => initGantt("SRTN")}
                                        className='block w-max relative flex flex-row mx-auto items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                        {
                                            SRTNGanttButton == 1 ?
                                                "Generate Gantt Chart"
                                            : <>
                                                <span className="mr-2" dangerouslySetInnerHTML={{ __html: Loader() }} />
                                                Generating
                                            </>
                                        }
                                    </button>
                                </div>
                            : ''
                        }
                        {
                            SRTNGanttStatus ?
                                <>
                                    <p className='text-md font-bold text-left mb-4 pl-8'>Gantt Chart</p>
                                    <div className="flex flex-row px-6 pb-6 mb-8 items-center justify-start relative mx-auto overflow-x-scroll" style={{width: "calc(100% - 12px)"}}>
                                        <DProcessGantt gantt={SRTNGantt} />
                                    </div>
                                </>
                            : ""
                        }
                    </SwiperSlide>
                    <SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-lg'>
                        <div className='w-max mx-auto my-4 bg-purple-700 rounded-md py-2 px-8'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='font-bold text-md text-white'>RR</p>
                                <p className='text-xs text-center text-gray-300'>Round Robin</p>
                            </div>
                        </div>
                        <DProcessTable dProcesses={RRTable} />
                        {
                            !RRGanttStatus ?
                                <div className='flex flex-col items-center justify-center mb-8'>
                                    <button
                                        onClick={() => initGantt("RR")}
                                        className='block w-max relative flex flex-row mx-auto items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                        {
                                            RRGanttButton == 1 ?
                                                "Generate Gantt Chart"
                                            : <>
                                                <span className="mr-2" dangerouslySetInnerHTML={{ __html: Loader() }} />
                                                Generating
                                            </>
                                        }
                                    </button>
                                </div>
                            : ''
                        }
                        {
                            RRGanttStatus ?
                                <>
                                    <p className='text-md font-bold text-left mb-4 pl-8'>Gantt Chart</p>
                                    <div className="flex flex-row px-6 pb-6 mb-8 items-center justify-start relative mx-auto overflow-x-scroll" style={{width: "calc(100% - 12px)"}}>
                                        <DProcessGantt gantt={RRGantt} />
                                    </div>
                                </>
                            : ""
                        }
                    </SwiperSlide>
                </>
            : active === 2 ?
                <SwiperSlide>
                    <div className='flex items-center flex-col justify-center px-6 py-12 m-2 rounded-lg'>
                        <p className='text-center'>
                            Ho! ho! ho! Hold your processes!
                        </p>
                        <p className='text-center'>
                            You are limited to a maximum of 25 processes!
                        </p>
                        <img src="/images/hold_your_processes.png" alt="Hold your processes" className='w-full h-auto' />
                    </div>
                </SwiperSlide>
            : <SwiperSlide>
                <div className='flex items-center justify-center bg-gray-300 dark:bg-gray-700 px-6 py-12 m-2 rounded-lg'>
                    Waiting for your prompt
                </div>
            </SwiperSlide>
        }
        </Swiper>
    )
}

export function DataTable() {
    const [simulateButton, updateSimulateButton] = useState(1)
    // 0: Disabled  1: Active  2: Info  3: Simulating  4: Error  5: Waiting
    const [addProcessButton, updateAddProcessButton] = useState(1)
    // 0: Disabled  1: Active  2: Info
    const [infoPanel, updateInfoPanel] = useState<any>("")

    const [RRTable, updateRRTable] = useState<any>([])
    const [SJFTable, updateSJFTable] = useState<any>([])
    const [SRTNTable, updateSRTNTable] = useState<any>([])
    const [FCFSTable, updateFCFSTable] = useState<any>([])

    const [RRGantt, updateRRGantt] = useState<any>([])
    const [SJFGantt, updateSJFGantt] = useState<any>([])
    const [SRTNGantt, updateSRTNGantt] = useState<any>([])
    const [FCFSGantt, updateFCFSGantt] = useState<any>([])

    const [RRGanttButton, updateRRGanttButton] = useState<number>(1)
    const [SJFGanttButton, updateSJFGanttButton] = useState<number>(1)
    const [SRTNGanttButton, updateSRTNGanttButton] = useState<number>(1)
    const [FCFSGanttButton, updateFCFSGanttButton] = useState<number>(1)

    const [RRGanttStatus, updateRRGanttStatus] = useState<boolean>(false)
    const [SJFGanttStatus, updateSJFGanttStatus] = useState<boolean>(false)
    const [SRTNGanttStatus, updateSRTNGanttStatus] = useState<boolean>(false)
    const [FCFSGanttStatus, updateFCFSGanttStatus] = useState<boolean>(false)

    const [rows, initRow] = useState<any[]>(
        [
            {
                process: "P1",
                burst_time: 6,
                // arrival_time: Number("0"),
                arrival_time: 1,
                process_name_state: "bg-green-600",
                burst_time_state: "bg-green-600",
                arrival_time_state: "bg-green-600",
            },
            // FIXME: Allow 0 as input to arrival_time for INITIAL table values and be validated by arrival_validity() function
            {
                process: "P2",
                burst_time: 7,
                arrival_time: 2,
                process_name_state: "bg-green-600",
                burst_time_state: "bg-green-600",
                arrival_time_state: "bg-green-600",
            },
            {
                process: "P3",
                burst_time: 10,
                arrival_time: 3,
                process_name_state: "bg-green-600",
                burst_time_state: "bg-green-600",
                arrival_time_state: "bg-green-600",
            },
            {
                process: "P4",
                burst_time: 1,
                arrival_time: 4,
                process_name_state: "bg-green-600",
                burst_time_state: "bg-green-600",
                arrival_time_state: "bg-green-600",
            },
        ]
    );

    const [slides_active, update_slides_active] = useState<number>(0)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const formManager = () => {
        const dataRow = [...rows]
        let error_count = 0, name_list = {}, burst_list = {}, arrival_list = {}
        const name_validity = (val) => {
            if (val == "") {
                return 0
            } else return 1
        }
        const burst_validity = (val) => {
            if (val != "") {
                if(Number(val) > 0 && typeof Number(val) == "number"){
                    return 1
                }
            } else return 0
        }
        // FIXME: Validate INITTIAL value of arrival_time when equal to 0 as a number
        const arrival_validity = (val) => {
            if(val != ""){
                if (typeof Number(val) == "number" && Number(val) >= 0){
                    return 1
                }
            } else return 0
        }
        dataRow.forEach((row, index) => {
            name_list[index] = row.process
            burst_list[index] = row.burst_time
            arrival_list[index] = row.arrival_time
            error_count += Number(!name_validity(row.process))
            error_count += Number(!burst_validity(row.burst_time))
            error_count += Number(!arrival_validity(row.arrival_time))
        })
        for (var i = 0; i < dataRow.length; i++) {
            dataRow[i].process_name_state = name_validity(name_list[i]) ? "bg-green-600" : "bg-red-600"
            dataRow[i].burst_time_state = burst_validity(burst_list[i]) ? "bg-green-600" : "bg-red-600"
            dataRow[i].arrival_time_state = arrival_validity(arrival_list[i]) ? "bg-green-600" : "bg-red-600"
        }
        initRow(dataRow);
        return {
            error_count: error_count,
            processes: dataRow.length
        }
    }

    const dataCollector = (error_count) => {
        if (error_count === 0) {
            return {
                time_unit: "ms",
                processes: rows
            }
        }
        else {
            return {
                time_unit: "ms",
                processes: 0
            }
        }
    }

    const addProcess = () => {
        stopSimulate()
        const data = {
            process: "",
            burst_time: "",
            arrival_time: "",
            process_name_state: "bg-red-600",
            burst_time_state: "bg-red-600",
            arrival_time_state: "bg-red-600",
        };
        rows.length >= 0 ? updateSimulateButton(1) : updateSimulateButton(0)
        rows.length >= 24 ?
            (
                updateAddProcessButton(0),
                update_slides_active(2)
            )
        : (
            updateAddProcessButton(1),
            update_slides_active(0)
        )
        initRow([...rows, data]);
    };

    const removeProcess = (index) => {
        stopSimulate()
        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
        dataRow.length > 0 ? updateSimulateButton(1) : updateSimulateButton(0)
        rows.length >= 26 ?
            (
                updateAddProcessButton(0),
                update_slides_active(2)
            )
        : (
            updateAddProcessButton(1),
            update_slides_active(0)
        )
    };

    const onValUpdate = (i, event) => {
        stopSimulate()
        const { name, value } = event.target;
        const data = [...rows];
        data[i][name] = value;
        initRow(data);
        formManager().error_count == 0 ?
            updateSimulateButton(1)
        : updateSimulateButton(0)
    };

    const initGantt = (target) => {
        if(target == "FCFS"){
            updateFCFSGanttButton(2)
            setTimeout(() => {
                updateFCFSGanttStatus(true)
            }, 3000)
        }
        else if(target == "SJF"){
            updateSJFGanttButton(2)
            setTimeout(() => {
                updateSJFGanttStatus(true)
            }, 3000)
        }
        else if(target == "SRTN"){
            updateSRTNGanttButton(2)
            setTimeout(() => {
                updateSRTNGanttStatus(true)
            }, 3000)
        }
        else if(target == "RR"){
            updateRRGanttButton(2)
            setTimeout(() => {
                updateRRGanttStatus(true)
            }, 3500)
        }
    }

    const initSimulate = () => {
        const sim = new Simulate()
        dataCollector(formManager().error_count).processes !== 0 ?
            (
                updateRRTable(
                    JSON.parse(
                        sim.breakdown(
                            dataCollector(formManager().error_count)
                        ).rr().breakdown
                    )
                ),
                updateRRGantt(
                    sim.breakdown(
                        dataCollector(formManager().error_count)
                    ).rr().gantt
                ),
                updateSJFTable(
                    JSON.parse(
                        sim.breakdown(
                            dataCollector(formManager().error_count)
                        ).sjf().breakdown
                    )
                ),
                updateSJFGantt(
                    sim.breakdown(
                        dataCollector(formManager().error_count)
                    ).sjf().gantt
                ),
                updateSRTNTable(
                    JSON.parse(
                        sim.breakdown(
                            dataCollector(formManager().error_count)
                        ).srtn().breakdown
                    )
                ),
                updateSRTNGantt(
                    sim.breakdown(
                        dataCollector(formManager().error_count)
                    ).srtn().gantt
                ),
                updateFCFSTable(
                    JSON.parse(
                        sim.breakdown(
                            dataCollector(formManager().error_count)
                        ).fcfs().breakdown
                    )
                ),
                updateFCFSGantt(
                    sim.breakdown(
                        dataCollector(formManager().error_count)
                    ).fcfs().gantt
                ),
                updateSimulateButton(3),
                update_slides_active(1),
                console.log(dataCollector(0)),
                updateAddProcessButton(0)
            )
        : updateSimulateButton(5)
        updateInfoPanel(`Invalid values: ${formManager().error_count}`)
    }
    
    const stopSimulate = () => {
        update_slides_active(1)
        updateSimulateButton(1)

        updateFCFSGanttButton(1)
        updateFCFSGanttStatus(false)
        updateSJFGanttButton(1)
        updateSJFGanttStatus(false)
        updateSRTNGanttButton(1)
        updateSRTNGanttStatus(false)
        updateRRGanttButton(1)
        updateRRGanttStatus(false)

        formManager().processes >= 25 ?
            updateAddProcessButton(0)
        : updateAddProcessButton(1)
    }

    return (
        <main>
            <section className="py-3 sm:py-5">
                <div className="px-4 mx-auto max-w-screen-lg lg:px-12">
                    <div className="block relative bg-white w-full p-4 shadow-md dark:bg-gray-800 rounded-t-lg">
                        <h2 className="text-lg text-center text-gray-700 dark:text-gray-300 font-semibold">PROCESS TABLE</h2>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-gray-800 border-2">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">Process</th>
                                    <th scope="col" className="px-2 py-3">Burst Time</th>
                                    <th scope="col" className="px-2 py-3">Arrival Time</th>
                                    <th scope="col" className="px-2 py-3">Priority</th>
                                    <th scope="col" className="px-2 py-3 w-6"></th>
                                </tr>
                            </thead>
                            <tbody id="process-body" className='px-2 space-x-2'>
                                <Processes
                                    rows={rows}
                                    removeProcess={removeProcess}
                                    onValUpdate={onValUpdate}
                                />
                            </tbody>
                        </table>
                        <div className="w-full block py-4 px-2">
                            <div className="w-full grid grid-cols-2">
                                <div className="col-span-1">
                                    <button
                                        id="process-add"
                                        disabled={!(addProcessButton == 1) ? true : false}
                                        onClick={addProcess}
                                        type="button"
                                        className="block w-max relative flex flex-row items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-button-default hover:bg-button-default-hover focus:ring-4 focus:ring-button-default dark:bg-button-default dark:hover:bg-button-default-hover focus:outline-none dark:focus:ring-button-default-hover transition transition-ease transition-duration-300">
                                        {
                                            addProcessButton == 2 ?
                                                <AddIcon className="mr-2" />
                                                : <AddIcon className="mr-2" />
                                        }
                                        Add new process
                                    </button>
                                </div>
                                <div className="col-span-1 flex flex-row">
                                    <button
                                        id="simulate-button"
                                        disabled={!(simulateButton == 1 || simulateButton == 5) ? true : false}
                                        onClick={initSimulate}
                                        type="button"
                                        className="block w-max relative flex flex-row ml-auto items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-100 hover:bg-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-primary-100 dark:hover:bg-primary-300 focus:outline-none dark:focus:ring-primary-100 transition transition-ease transition-duration-300">
                                        {
                                            simulateButton == 1 ?
                                                <PlayArrowIcon className="mr-2" />
                                            : simulateButton == 3 ?
                                                <span dangerouslySetInnerHTML={{ __html: Loader() }} />
                                            : <PlayArrowIcon className="mr-2" />
                                        }
                                        {
                                            simulateButton == 3 ?
                                                "Simulating"
                                            : "Simulate"
                                        }
                                    </button>
                                    {
                                        simulateButton == 3 ?
                                            <button
                                                id="stop-simulate-button"
                                                onClick={stopSimulate}
                                                type="button"
                                                className="block w-max ml-2 relative flex flex-row items-center p-2 text-sm font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                            <StopIcon></StopIcon>
                                        </button>                                           
                                        : ""
                                    }
                                </div>
                            </div>
                            <div className="w-full info-panel">
                                {infoPanel}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='relative max-w-3xl mx-auto p-4'>
                {
                    <SwiperSlides
                        slides={{
                            FCFSTable: FCFSTable,
                            FCFSGantt: FCFSGantt,
                            FCFSGanttStatus: FCFSGanttStatus,
                            FCFSGanttButton: FCFSGanttButton,
                            SJFTable: SJFTable,
                            SJFGantt: SJFGantt,
                            SJFGanttStatus: SJFGanttStatus,
                            SJFGanttButton: SJFGanttButton,
                            SRTNTable: SRTNTable,
                            SRTNGantt: SRTNGantt,
                            SRTNGanttStatus: SRTNGanttStatus,
                            SRTNGanttButton: SRTNGanttButton,
                            RRTable: RRTable,
                            RRGantt: RRGantt,
                            RRGanttStatus: RRGanttStatus,
                            RRGanttButton: RRGanttButton,
                        }}
                        active={slides_active}
                        initGantt={initGantt}
                        thumbsSwiper={thumbsSwiper}
                    />
                }
                <div className=''>
                    <SwipeAnimationAlt></SwipeAnimationAlt>
                </div>
            </section>
        </main>
    )
}
