import {motion} from 'framer-motion'
import {MdOutlineLogout} from 'react-icons/md'
import Link from 'next/link'

export default function Sidebar({router,currentUser,revealMenu,setRevealMenu,logMeOut}) {
	// body...
	const homeRedirect = () => {
		setRevealMenu(false)
	}
	const wokshopRedirect = () => {
		setRevealMenu(false)
	}
	const contactRedirect = () => {
		setRevealMenu(false)
	}
	const courseRedirect = () => {
		setRevealMenu(false)
	}
	

	return (

		<div className="fixed h-screen scroll-smooth z-30 w-full backdrop-blur-lg bg-black/90">
			<motion.div className=" flex h-full mt-12 flex-col gap-4 items-center p-3 overflow-y-scroll scrollbar-none">
				<div className="rounded-full px-5 py-3 mb-7 flex items-center justify-center bg-gray-500/30">
					<p className="md:text-3xl text-2xl text-yellow-400 font-varino tracking-[2px] select-none">TNS-ACADEMY</p>	
				</div>
				<p 
				onClick={()=>{
					if(!currentUser){
						router.push('/slideIn')
					}
				}}
				className={`text-2xl ${currentUser && 'hidden'} cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2 
				 hover:border-sky-400 border-orange-500 rounded-xl ease-in-out font-mono text-gray-200`}>
					Login
				</p>
				<p 
				onClick={homeRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2  hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200">
					<a href="/#home">Home</a>
				</p>
				<p 
				onClick={wokshopRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2  hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200">
					<a href="/#workshops">Workshops</a>
				</p>
				<p 
				onClick={courseRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2  hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200">
					<a href="/#courses">Courses</a>
				</p>
				<p 
				onClick={contactRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2  hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200">
					<a href="/#contact">Contact</a>
				</p>
				{
					currentUser &&
					<>
						<div 
						className="flex gap-2 items-center px-2 py-2  hover:border-sky-400 border-orange-500 rounded-xl">
							<img src={currentUser.image} className="h-8 cursor-pointer w-8 drop-shadow-xl rounded-full"/>
							<Link href="/profile"><p className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 ease-in-out
							font-mono text-gray-200">Profile</p></Link>
						</div>
						<div 
						onClick={logMeOut}
						className="flex gap-2 items-center px-2 py-2  hover:border-sky-400 border-orange-500 rounded-xl">
							<MdOutlineLogout className="h-7 w-7 text-red-500"/>
							<p className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 ease-in-out
							font-mono text-gray-200">SignOut</p>
						</div>
					</>
				}
			</motion.div>

		</div>	

	)
}

