/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Layout from '@/components/layout';
import { Inter } from 'next/font/google'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow } from 'swiper';
import { DProcessGantt, DProcessTableAuto } from '@/components/simtable';
import SwipeAnimation from '@/components/swipe_animation';

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const inter = Inter({ subsets: ['latin'] })

const AutoSim = ({ target }) => {
	const { data, error } = useSWR(`/presim/${target}.json`, fetcher);

	if (error) return <div className="text-center">Failed to load simulations</div>;

	return (
		<div>
			{
				data?
					<>
						<DProcessTableAuto dProcesses={data} />
					</>
				:""
			}
		</div>
	);
}

const AutoGantt = ({ target }) => {
	const { data, error } = useSWR(`/presim/${target}.json`, fetcher);

	if (error) return <div className="text-center">Failed to load Gantt Chart</div>;

	return (
		<div>
			{
				data?
					<>
						<div className="flex flex-row px-6 py-4 mb-2 items-center w-max relative mx-auto">
							<DProcessGantt gantt={data} />
						</div>
					</>
				:""
			}
		</div>
	);
}

export default function Home() {
	return (
		<Layout location="home">
			<div className='w-full h-screen bg-black'>
				<main className='grid grid-cols-4 mx-auto py-12 relative'
					style={{ maxWidth: "1500px" }}
				>
					<div
						className="flex flex-col px-8 relative items-start col-span-4 lg:col-span-1 py-16 xl:py-32"
						style={{ minHeight: '300px' }}>
						<h1 className='text-4xl lg:text-5xl text-blue-700 font-bold text-left'>Scheduling Algorithms</h1>
						<div className="block h-1.5 w-28 bg-blue-700 my-4"></div>
						<p className="text-lg text-gray-100 mt-8">Visually simulate the common scheduling algorithms.</p>
					</div>
					<Swiper
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						breakpoints={{
								800: {
									slidesPerView: 1
								},
								1000: {
									slidesPerView: 2
								}
							}
						}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 3,
							slideShadows: true
						}}
						loop={true}
						pagination={true}
						modules={[EffectCoverflow, Pagination]}
						className="swiper-auto col-span-4 lg:col-span-3 w-max px-4 mx-4 flex flex-col justify-center items-start lg:justify-start lg:items-center pt-32 relative"
						style={{ minHeight: '200px' }}>
						<SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-xl'>
							<h2 className='w-full bg-gray-400 dark:bg-gray-600 font-bold text-black dark:text-white my-2 text-3xl text-center mt-0 p-4 rounded-t-xl'>SJF</h2>
							<div>
								<AutoGantt target="sjf_gantt1"></AutoGantt>
							</div>
							<div className='p-4'>
								<AutoSim target="sjf_sim1"></AutoSim>
							</div>
						</SwiperSlide>
						<SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-xl'>
							<h2 className='w-full bg-gray-400 dark:bg-gray-600 font-bold text-black dark:text-white my-2 text-3xl text-center mt-0 p-4 rounded-t-xl'>FCFS</h2>
							<div>
								<AutoGantt target="fcfs_gantt1"></AutoGantt>
							</div>
							<div className='p-4'>
								<AutoSim target="fcfs_sim1"></AutoSim>
							</div>
						</SwiperSlide>
						<SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-xl'>
							<h2 className='w-full bg-gray-400 dark:bg-gray-600 font-bold text-black dark:text-white my-2 text-3xl text-center mt-0 p-4 rounded-t-xl'>SRTN</h2>
							<div>
								<AutoGantt target="srtn_gantt1"></AutoGantt>
							</div>
							<div className='p-4'>
								<AutoSim target="srtn_sim1"></AutoSim>
							</div>
						</SwiperSlide>
						<SwiperSlide className='bg-gray-200 dark:bg-gray-800 rounded-xl'>
							<h2 className='w-full bg-gray-400 dark:bg-gray-600 font-bold text-black dark:text-white my-2 text-3xl text-center mt-0 p-4 rounded-t-xl'>RR</h2>
							<div>
								<AutoGantt target="rr_gantt1"></AutoGantt>
							</div>
							<div className='p-4'>
								<AutoSim target="rr_sim1"></AutoSim>
							</div>
						</SwiperSlide>
					</Swiper>
					<div className='dol-span-4 lg:col-span-1'></div>
					<div className='col-span-4 lg:col-span-3 w-full'>
						<SwipeAnimation></SwipeAnimation>
					</div>
				</main>
			</div>
			<div>
				<a href="/simulate" className="flex items-center justify-center px-24 py-8 my-8 text-white bg-primary-100 w-max relative top-36 rounded-lg mx-auto cursor-pointer hover:bg-primary-300 transition transition-ease transition-300ms">
					<PlayArrowIcon className='mr-1'></PlayArrowIcon>
					Try it yourself
				</a>
			</div>
		</Layout>
	)
}
