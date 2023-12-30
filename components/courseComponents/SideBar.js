"use client"

import {useState} from 'react';
import {MdOutlineQuestionMark} from 'react-icons/md'; 
import {HiArrowLeft} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import {RxCross2} from 'react-icons/rx';

export default function SideBar({currentUser,setOpenHelpTab,openHelpTab,openSideBar,setOpenSideBar}) {
	// body...
	const router = useRouter();
	const [showUserName,setShowUserName] = useState(false);

	return (
		<main className={`h-full px-2 py-3 lg:bg-black/50 bg-black/80 border-r-[1px] border-gray-700/50 fixed 
		lg:block lg:relative ${openSideBar ? 'left-0' : '-left-[100%] lg:left-0'} top-0 transition-all duration-200 
		ease-in-out z-50 `}>
			<div className="flex-col flex gap-2">
				<button 
				onClick={()=>{setOpenSideBar(false)}}
				className="p-3 rounded-md lg:hidden block hover:bg-gray-700/50">
					<RxCross2 className="h-5 w-5 text-gray-200"/>
				</button>
				<button 
				onClick={()=>router.push('/')}
				className="p-3 rounded-md hover:bg-gray-700/50">
					<HiArrowLeft className="h-5 w-5 text-gray-200"/>
				</button>
				<button 
				onClick={()=>setOpenHelpTab(!openHelpTab)}
				className="p-3 rounded-md hover:bg-gray-700/50">
					<MdOutlineQuestionMark className="h-5 w-5 text-gray-200"/>
				</button>
				<button 
				onClick={()=>setShowUserName(!showUserName)}
				className="p-2 relative rounded-md hover:bg-gray-700/50 w-full aspect-square flex 
				items-center justify-center">
					<div className={`top-2 -right-[85px] bg-black z-30 rounded-lg border-[1px] border-gray-700
					p-2 ${showUserName ? 'absolute' : 'hidden'} `}>
						<h1 className="leading-none text-white text-sm font-medium">{currentUser?.name}</h1>
					</div>
					<img src={currentUser?.image} className="h-6 w-6 rounded-full shadow-md hover:shadow-sky-500/60 shadow-pink-500/40"/>
				</button>	
			</div>
		</main>
	)
}