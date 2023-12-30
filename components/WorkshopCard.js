"use client"

import {AiOutlineCalendar} from 'react-icons/ai';
import DateDiff from 'date-diff';
import {IoMdTime} from 'react-icons/io'
import {useState,useEffect} from 'react'
import {AiFillYoutube} from 'react-icons/ai';

export default function WorkshopCard({dat,l,router,setCurrentWorkshop}) {
	const [finished,setFinished] = useState(false);

	useEffect(()=>{
		const date1 = new Date();

		const temp = dat?.startsAt?.split('(')[0]?.split(' ')[0]?.split('-')?.reverse();
		temp[0] = '20'+temp[0];
		const currentdate = new Date(temp?.join('-'))
		const date2 = new Date(currentdate?.getTime() + 15 * 60 * 60 * 1000);
		var diff = new DateDiff(date2, date1);
		if(diff?.minutes() < 1 ){
			setFinished(true);
		}else{
			setFinished(false);
		}

	},[dat])

	return(
		<div key={l}
		onClick={()=>{
			if(!finished){
				setCurrentWorkshop(dat);
				router.push({
					pathname:`/workshops`,
					query:{id:dat._id}
				})				
			}
		}}
		className={`rounded-xl flex ${finished ? '' : 'cursor-pointer hover:scale-95'} transition-all duration-200 ease-in-out
		flex-col shadow-xl border-[1px] border-gray-700/40 overflow-hidden pb-3`}>
			<img src={dat.image} alt="" className="w-full"/>
			<div className="px-3 py-2">
				<h1 className="text-2xl font-semibold text-black">{dat.title} {finished && '(Completed)'} </h1>
				{
					dat?.recordedVideo &&
					<h1 className="text-md items-center flex gap-2 text-sky-600 mt-2 hover:underline font-semibold"><AiFillYoutube className="h-5 w-5 text-red-500"/><a href={dat?.recordedVideo} target="_blank" className=" cursor-pointer" > {dat?.recordedVideo}</a></h1>
				}
				<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><AiOutlineCalendar className="h-5 w-5"/>{dat.startsAt}</h1>
				<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><IoMdTime className="h-5 w-5 text-gray-600"/>{dat.duration}</h1>
				<p className="text-md mt-3 font-semibold text-gray-700">{dat.description}</p>
				<div className="flex items-center justify-between mt-5">
					<div className="w-full">

					</div>
					<button className={`text-sky-500 text-lg ${finished ? 'opacity-[30%] cursor-normal' : 'opacity-1'} flex whitespace-nowrap`}>Join  &gt;&gt;</button>
				</div>
			</div>
		</div>	
	)
}