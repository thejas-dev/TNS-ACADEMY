import {useState,useEffect} from 'react'
import {useRouter} from 'next/navigation';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {FcGoogle} from 'react-icons/fc';
import {TbPhotoPlus} from 'react-icons/tb';
import {AiOutlineDelete} from 'react-icons/ai';
import {TiTick} from 'react-icons/ti';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ImageKit from "imagekit";
import {loginRoute,registerRoute} from '../utils/ApiRoutes';
import axios from 'axios';
import {signIn} from 'next-auth/react'

export default function LoginComponent({id,session,session2}) {
	// body...
	const [currentWindow,setCurrentWindow] = useState('login')
	const router = useRouter();
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [showImageOption,setShowImageOption] = useState(true);
	const [loading,setLoading] = useState(false);
	const [accountLoading,setAccountLoading] = useState(false);
	const [url,setUrl] = useState('https://ik.imagekit.io/d3kzbpbila/default-user_qE1tzA4fP.jpg?updatedAt=1687883494785');
	const [path,setPath] = useState('');
	const [imgurl,setImgurl] = useState('');
	const [imageLoaded,setImageLoaded] = useState(true);
	const [selectedOption,setSelectedOption] = useState('');
	const [revealData,setRevealData] = useState(true);
	const [confirmed,setConfirmed] = useState(false);
	const [createAccount,setCreateAccount] = useState(false);
	const [infoShown,setInfoShown] = useState(true);

	var imagekit = new ImageKit({
	    publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_ID,
	    privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
	    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT
	});

	const data = [ 
		{
			title:'Novice',
			description:'New to web development or programming, with little to no prior experience. Looking to learn the fundamentals and basics.',
			level:0
		},
		{
			title:'Beginner',
			description:'Familiar with the basics but still developing foundational skills. Eager to expand knowledge and gain practical experience.',
			level:1
		},
		{
			title:'Intermediate',
			description:'Have a good grasp of core concepts and comfortable building projects independently. Ready to explore more advanced topics and techniques.',
			level:2
		},
		{
			title:'Advanced',
			description:'Highly skilled with extensive experience in web development or programming. Seeking to enhance expertise and tackle complex challenges.',
			level:3
		}
	]

	const pathCheck = (path) =>{
		if(path){
			if(path.split('.').includes('jpg')){
				return true;
			}else if(path.split('.').includes('jpeg')){
				return true;
			}else if(path.split('.').includes('png')){
				return true;
			}else if(path.split('.').includes('avif')){
				return true
			}
		}
	}

	// useEffect(()=>{
	// 	const image_input = document.querySelector('#file1');
	// 	if(image_input){
	// 		if(pathCheck(path)){
	// 			image_input.addEventListener('change',()=>{
	// 			console.log(" i ran")
	// 			const reader = new FileReader();
			
	// 			reader.addEventListener('load',()=>{
	// 				let uploaded_image = reader.result;
	// 				setUrl(uploaded_image);	
	// 				setShowImageOption(true);	
	// 				setImageLoaded(true)
	// 			});
	// 			reader.readAsDataURL(image_input.files[0]);
	// 			})
	// 		}else{
	// 			toast('Image format not supported',toastOption);
	// 		}
	// 	}
	
	// },[path])

	const urlSetter = () => {
		const image_input = document.querySelector('#file1');
		// console.log(" i came to ran")
		const reader = new FileReader();
		// console.log(" i ran")
		reader.addEventListener('load',()=>{
			let uploaded_image = reader.result;
			setUrl(uploaded_image);	
			// console.log(" i also ran")
			setShowImageOption(true);	
			setImageLoaded(true)
		});
		if(image_input){
			reader.readAsDataURL(image_input.files[0]);
		}
	}

	// console.log(path,url)

	const upload = () =>{
		if(url.length > 2){
			// console.log("im began")
			if(pathCheck(path)){
				setLoading(true)
				// console.log("im started")				
				imagekit.upload({
			    file : url, //required
			    fileName : "thejashari",   //required
			    extensions: [
			        {
			            name: "google-auto-tagging",
			            maxTags: 5,
			            minConfidence: 95
			        }
			    ]
				}).then(response => {
				    setImgurl(response.url);
				    setLoading(false)
				    // console.log("result came")
				}).catch(error => {
				    console.log(error.message);
				});
			}else{
				toast('Image format not supported',toastOption);
			}  
		}
	}

	const openImageInput = () => {
		const input = document.getElementById("file1");
		input.click()
	}	

	useEffect(()=>{
		if(session){
			checkLogin();
		}
	},[session])

	const checkLogin = async() => {
		let email = session2?.user.email || session.user.email
	    setAccountLoading(true);
	    const {data} = await axios.post(loginRoute,{
	      email,
	    });
	    if(data.status === false){
	    	setCurrentWindow('image')
	    	setAccountLoading(false);
	    }else{
	    	if(!localStorage.getItem('tns-academy')){
     	        localStorage.setItem('tns-academy',JSON.stringify(data?.user.email));
	        }
	        setCurrentUser(data?.user);
	        
	    }

	}

	const createAccountInData = async() => {
		
		if(selectedOption.length>2){
			setRevealData(false);
			if(confirmed){
				setCreateAccount(true);
				setAccountLoading(true);
				
			}else{
				setConfirmed(true)
				setRevealData(false);
			}			
		}
	}

	useEffect(()=>{
		if(!localStorage.getItem('tns-academy-login-info')){
			setInfoShown(false);
			localStorage.setItem('tns-academy-login-info',true)
		}
	},[])

	useEffect(()=>{
		if(imgurl.length>2){
			handleValidation();
		}
	},[createAccount])

	useEffect(()=>{
		if(createAccount){
			handleValidation();
		}
	},[imgurl])

	const handleValidation = async() =>{
	    let email = session2?.user.email || session.user.email
	    setAccountLoading(true);
	    const {data} = await axios.post(loginRoute,{
	      email,
	    });
	    if(data.status === false){
	      const name = session2?.user.name || session?.user.name;
	      const image = imgurl
	      const level = selectedOption
	      const {data} = await axios.post(registerRoute,{
	        email,name,image,level
	      })
	      if(!localStorage.getItem('tns-academy')){
	        localStorage.setItem('tns-academy',JSON.stringify(data?.user.email));
	      }
	      setCurrentUser(data?.user);
	      setAccountLoading(false);
	    }else{
	      if(!localStorage.getItem('tns-academy')){
	        localStorage.setItem('tns-academy',JSON.stringify(data?.user.email));
	      }
	      setCurrentUser(data?.user);
	      setAccountLoading(false);
	    }
	  }

	const toastOption={
		position:"bottom-right",
		autoClose:8800,
		pauseOnHover:true,
		draggable:true,
		theme:"dark",
	}

	useEffect(()=>{
		if(currentUser){
			router.push('/');
		}
	},[currentUser])


	return (
		<main className={`w-full relative h-full bg-no-repeat md:bg-center bg-cover bg-center  overflow-hidden bg-[url('https://ik.imagekit.io/d3kzbpbila/login_img_mM5BWvh_v.avif?updatedAt=1687367596612')]`}>
			
			<div className="absolute h-full w-full bg-gradient-to-r from-purple-950/60 to-black/30 z-0"/>
			{
				currentWindow === 'login'?
				<div className=" w-full h-full md:mt-[180px] mt-[100px] md:px-14 px-5 relative z-10">

					<h1 className="lg:text-4xl select-none md:text-3xl text-2xl font-varino text-pink-500 text-shadow text-shadow-fire">
						Slide In
					</h1>
					<p className={`mt-7 md:w-[400px] w-[80%] text-md text-gray-300 font-semibold ${infoShown && 'hidden' } `}>
						By Signing up, you will be automatically subscribed to our weekly newsletters. Explore the latest 
						trends, insights, and updates in web development, programming and technology from your mail inbox. Manage your email preferences
						anytime in your account settings.
					</p>
					<p className={`mt-7 md:w-[400px] w-[80%] text-md text-gray-300 font-semibold ${!infoShown && 'hidden' } `}>
						Welcome back to TNS Academy. Login/Signup via Google account.
					</p>
					<button 
					onClick={()=>{
						if(!accountLoading){
							signIn(id)
						}
					}}
					className="mt-[50px] rounded-xl border-[1.7px] hover:scale-110 transition-all duration-100 ease-in border-blue-500/40 
					md:px-14 px-5 py-3 md:bg-black/10 bg-black/30 text-white font-semibold text-lg flex gap-2 items-center transition-all transition-w 
					duration-200 ease-in">
						{
							accountLoading ? 
							<div className="loader6" />
							:
							<>
							<FcGoogle className="h-5 w-5"/> Continue with google
							</>
						}
					</button>
				</div>
				:
				currentWindow === 'image'?
				<div className=" w-full h-full mt-[160px] md:px-14 px-5 relative z-10">
					<h1 className="lg:text-3xl select-none md:text-2xl text-xl md:ml-0 ml-7 font-varino text-pink-500 text-shadow text-shadow-fire">
						Profile picture
					</h1>
					<div className="relative md:w-[310px] w-[250px] flex items-center justify-center mt-8 ml-5 
					aspect-square rounded-full border-blue-400/80 border-[2px] border-dashed 
					hover:scale-105 transition-all duration-100 ease-in bg-black/20 shadow-xl shadow-purple-700/20 
					cursor-pointer p-2">
						{
							imageLoaded ? 
							<img src={`${url ? url : ""}`} alt="" className="h-full w-full rounded-full"/>
							:
							<TbPhotoPlus 
							onClick={()=>{
								openImageInput()
							}}
							className="w-[80px] h-[80px] text-blue-500"/>							
						}
						{
							showImageOption ?
							<>
							<div 
							
							className="absolute bottom-1 left-5 p-1 rounded-full bg-gray-100/10 cursor-pointer hover:bg-gray-300/20">
								<AiOutlineDelete onClick={()=>{
									setImageLoaded(false)
									setShowImageOption(false);	
									setImgurl('');
									setPath('');								
								}} className="text-red-500 h-7 w-7"/>
							</div>
							<div 
							onClick={()=>{
								upload();
								setCurrentWindow('level')
							}}
							className="absolute bottom-1 right-5 p-1 rounded-full bg-gray-100/10 cursor-pointer hover:bg-gray-300/20">
								<TiTick className="text-green-500 h-7 w-7"/>
							</div>
							</>
							:
							""
						}
						<input type="file" id="file1" accept="image/*" 
						value={path}
						onChange={(e)=>{
							setPath(e.target.value);
							urlSetter();
						}}
						hidden
						/>

					</div>
					
				</div>
				:
				<div className={` w-full h-full ${!revealData ? 'md:mt-[90px] mt-[50px]' : 'md:mt-[40px] mt-[20px]' }  md:px-14 px-2 relative z-10 overflow-y-scroll scrollbar-none`}>
					<h1 className="lg:text-3xl select-none md:text-2xl text-xl md:ml-0 ml-2 font-varino 
					text-pink-500 text-shadow md:block hidden text-shadow-fire">
						Select one
					</h1>
					<div className="flex lg:w-[70%] xl:w-[50%] md:w-[77%] w-[98%] flex-col gap-3 md:mt-5 mt-2">
						{
							data.map((dat,j)=>(
								<div key={j}
								onClick={()=>{
									setSelectedOption(dat?.title)
								}}
								className={`flex ${(!revealData && dat.title !== selectedOption) && 'hidden'} gap-3 px-4 py-3 bg-black/40 cursor-pointer hover:bg-gray-600/30 transition-all duration-100 ease-in rounded-xl`}>
									<div className=" w-[4px] rounded-full bg-white">
										{
											selectedOption === dat.title &&
											<div className="h-full w-full bg-blue-500"/>
										}
									</div>
									<div className="flex flex-col gap-1">
										<h1 className="select-none md:text-xl text-lg font-semibold text-white">
											{dat.title}
										</h1>
										<p className="select-none text-sm font-semibold text-gray-400">
											{dat.description}
										</p>
									</div>
								</div>

							))
						}
					</div>
					{
						!currentUser &&
						<button 
						onClick={createAccountInData}
						className="md:mt-[30px] mt-5 rounded-xl border-[1.7px] hover:scale-110 transition-all duration-100 ease-in border-blue-500/40 
						md:px-14 px-5 py-3 md:bg-black/10 bg-black/30 text-green-400 font-semibold text-lg flex gap-2 items-center">
							{
								confirmed ? 
								!accountLoading ?
								'Create Account'
								:
								<span className="loader6"/>
								:							
								'Confirm'
								
							}
						</button>
					}
					{
						accountLoading ?
						loading ?
						<h1 className="mt-5 text-lg animate-pulse text-gray-300 ml-2">Uploding profile...</h1>
						:
						<h1 className="mt-5 text-lg animate-pulse text-gray-300 ml-2">Setting things up for you...</h1>
						:
						""
					}
				</div>


			}

			<div className="absolute bottom-5 flex justify-center w-full mx-auto items-center gap-4">
				<div className={`rounded-full h-1 w-1 ${currentWindow==='login' ? 'bg-gray-100' : 'bg-gray-600'}`}>

				</div>
				<div className={`rounded-full h-1 w-1 ${currentWindow==='image' ? 'bg-gray-100' : 'bg-gray-600'}`}>

				</div>
				<div className={`rounded-full h-1 w-1 ${currentWindow==='level' ? 'bg-gray-100' : 'bg-gray-600'}`}>

				</div>
			</div>
		</main>


	)
}