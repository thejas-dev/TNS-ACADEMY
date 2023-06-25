import {motion} from 'framer-motion'
import {useState} from 'react'
import Sidebar from './Sidebar';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {FiSettings} from 'react-icons/fi'
import {BiLogOut} from 'react-icons/bi';



export default function Header({hide,fixed,redirect,token}) {
	const [revealMenu,setRevealMenu] = useState(false);
	const router = useRouter();
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);	
	const [revealAccSettings,setRevealAccSettings] = useState(false);
	
	const homeRedirect = () => {
		setRevealMenu(false);
		router.push('/#home')
	}
	const wokshopRedirect = () => {
		setRevealMenu(false);
		router.push('/#workshops')
	}
	const courseRedirect = () => {
		setRevealMenu(false);
		router.push('/#courses')
	}
	const contactRedirect = () => {
		setRevealMenu(false);
		router.push('/#contact')
	}

	const logMeOut = () => {
		localStorage.removeItem('tns-academy');
		signOut();
	}

	return (
			<div className={`w-full mx-auto px-4 py-2 md:py-2 fixed z-50 bg-gradient-to-r from-blue-500/70 to-purple-500/70 drop-shadow-xl top-0 ${hide ? "backdrop-blur-sm md:backdrop-blur-lg":""}`}>
				<div className={`fixed ${revealAccSettings ? 'xl:right-12 lg:right-5 md:right-3 ' : '-right-[150px]'} transition-all duration-200 ease-in-out rounded-xl hidden md:block
				top-[80px] bg-gradient-to-r from-blue-500/70 to-purple-500/70 drop-shadow-xl border-gray-400/80 border-[1px] flex flex-col`}>
					<div className="py-[5px] px-4 cursor-pointer hover:bg-gray-400/40 transition-all duration-100 ease-in text-gray-200 hover:text-sky-400 transition-all duration-100 ease-out">
						<h1 className="text-md flex gap-[6px] items-center font-mono"><FiSettings className="h-5 w-5"/> Settings</h1>
					</div>
					<div 
					onClick={logMeOut}
					className="py-[5px] px-4 cursor-pointer hover:bg-gray-400/40 transition-all duration-100 ease-in text-gray-200 hover:text-red-400 transition-all duration-100 ease-out">
						<h1 className="text-md flex gap-[6px] items-center font-mono"><BiLogOut className="h-5 w-5"/> Log out</h1>
					</div>
				</div>

				<motion.div 
				className="max-w-6xl flex w-full items-center gap-5 justify-between mx-auto">
					<motion.div
					initial={{
						opacity:0
					}}
					whileInView={{
						opacity:1
					}}
					transition={{
						duration:2
					}}>
						<p 
						onClick={()=>{
							router.push('/')
						}}
						className="cursor-pointer md:text-3xl text-xl text-gray-200
						font-varino tracking-[2px] select-none">TNS-ACADEMY</p>
					</motion.div>
					<motion.div 
					initial={{
						x:100,
						opacity:0
					}}
					whileInView={{
						opacity:1,
						x:0
					}}
					transition={{
						duration:2
					}}
					className=" hidden md:flex md:gap-10 gap-2 items-center md:p-3 p-2">
						<p
						onClick={homeRedirect} 
						className={`md:text-xl text-md  cursor-pointer hover:text-yellow-300 transition duration-100 
						ease-in-out font-mono text-gray-200`}>
							Home
						</p>
						<p 
						onClick={wokshopRedirect}
						className={`md:text-xl text-md cursor-pointer hover:text-yellow-300 transition duration-100 
						ease-in-out font-mono text-gray-200`}>
							Workshops
						</p>
						<p 
						onClick={courseRedirect}
						className="md:text-xl z-50 text-md cursor-pointer hover:text-yellow-300 transition duration-100 
						ease-in-out font-mono text-gray-200">
							Courses
						</p>
						<p 						
						onClick={contactRedirect}
						className="md:text-xl z-50 text-md cursor-pointer hover:text-yellow-300 transition duration-100 
						ease-in-out font-mono text-gray-200">
							Contact
						</p>
						<p 
						onClick={()=>{
							if(!currentUser){
								router.push('/slideIn')
							}
						}}
						className={`md:text-xl z-50 text-md ${currentUser && 'hidden' } cursor-pointer hover:text-yellow-300 transition duration-100 
						ease-in-out font-mono text-gray-200`}>
							Login
						</p>
						{
							currentUser &&
							<img
							src={currentUser.image} 
							onClick={()=>{
								setRevealAccSettings(!revealAccSettings)
							}}
							className="h-8 z-50 cursor-pointer w-8 drop-shadow-xl rounded-full"/>
						}
					</motion.div>
					<div className="flex items-center gap-8 md:hidden">

						<motion.div
						initial={{
							opacity:0
						}}
						whileInView={{
							opacity:1,						
						}}
						transition={{
							duration:2
						}}
						onClick={()=>setRevealMenu(!revealMenu)}
						className="active:scale-90 hover:bg-gray-700/20 transition-all duration-300 ease-in flex flex-col 
						cursor-pointer rounded-xl justify-between z-50 p-[6px] h-8 w-10 mb-"
						>
							<div className={`h-[1.5px] z-50 w-full bg-gray-300 transition-all duration-300 ease-in-out ${revealMenu  ? "mt-[12px] bg-gray-100 -rotate-45" :  "" }`}/>
							<div className={`h-[1.5px] z-50 bg-gray-300 transition-all w-full duration-300 ease-in-out ${revealMenu ? "bg-gray-100 w-[0%] h-[0%] hidden" : "w-full" }`}/>
							<div className={`h-[2px] z-50 w-full bg-gray-300 transition-all duration-300 ease-in-out ${revealMenu  ? "mb-[7px] bg-gray-100 rotate-45" :  "" }`}/>
						</motion.div>
					</div>
				</motion.div>
				<div className={`fixed ${revealMenu ? "left-0": "left-[100%]"} top-0 z-40 transition-all duration-500 ease-in-out w-full h-full  `}>
		          <Sidebar router={router} currentUser={currentUser} revealMenu={revealMenu} setRevealMenu={setRevealMenu} logMeOut={logMeOut} />    
		        </div>

			</div>


	)
}


// <div className={`fixed ${revealProfile ? "top-[70px] opacity-1" : "-top-[170px] opacity-[70%]"} border-[1px] right-14 bg-black/50 backdrop-blur-lg 
// border-gray-700 py-1 pb-2 px-1 rounded-xl flex flex-col gap-2 transition-all duration-400 ease-in-out`}>
// 	<div 
// 	className=" flex px-2 rounded-xl border-b-[1.5px] hover:bg-gray-700 transition-all 
// 	duration-200 ease-in-out cursor-pointer py-2 border-orange-500 gap-2">
// 		<img src={currentUser.profile} className="h-7 w-7 rounded-full"/>
// 		<h1 className="text-md text-gray-300 font-mono">My Profile</h1>
// 	</div>
// 	<div 

// 	className="flex px-2 rounded-xl border-b-[1.5px] hover:bg-gray-700 transition-all 
// 	duration-200 ease-in-out cursor-pointer py-2 border-orange-500 gap-2">
// 		<FiDatabase className="h-7 w-7 text-blue-700"/>
// 		<h1 className="text-md text-gray-300 font-mono">My Storage</h1>
// 	</div>	
// 	<div 
// 	onClick={signOut}
// 	className="flex px-2 rounded-xl border-b-[1.5px] hover:bg-gray-700 transition-all 
// 	duration-200 ease-in-out cursor-pointer py-2 border-red-500 gap-2">
// 		<MdOutlineLogout className="h-7 w-7 text-red-500"/>
// 		<h1 className="text-md text-gray-300 font-mono">Log out</h1>
// 	</div>							
// </div>