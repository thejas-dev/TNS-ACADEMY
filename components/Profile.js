"use client"
import Header2 from './Header2';
import {currentUserState} from '../atoms/userAtom';
import {useRecoilState} from 'recoil';	
import ImageKit from "imagekit";
import {useRouter} from 'next/navigation';
import {useEffect,useState} from 'react';
import {MdOutlineCollectionsBookmark,MdEdit} from 'react-icons/md';
import {toast,ToastContainer} from 'react-toastify';
import {SiGmail} from 'react-icons/si';
import {BsTools} from 'react-icons/bs';
import ProfileCourseCard from './ProfileCourseCard';
import ProfileWorkshopCard from './ProfileWorkshopCard';
import axios from 'axios';
import Head from 'next/head';
import {updateImage} from '../utils/ApiRoutes';

export default function Profile() {
	// body...
	const router = useRouter();
	const [editOpen,setEditOpen] = useState(false);
	const [path,setPath] = useState('');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [url,setUrl] = useState('');
	const [loading,setLoading] = useState(false);

	var imagekit = new ImageKit({
	    publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_ID,
	    privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
	    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT
	});

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

	useEffect(()=>{
		if(!currentUser){
			router.push('/slideIn');
		}
	},[])

	const urlSetter = () => {
		const image_input = document.querySelector('#file1');
		const reader = new FileReader();
		reader.addEventListener('load',()=>{
			let uploaded_image = reader?.result;
			uploadImage(uploaded_image)
		});
		if(image_input){
			reader?.readAsDataURL(image_input?.files[0]);
		}
	}

	const updateUserImage = async(image) => {
		const {data} = await axios.post(`${updateImage}/${currentUser?._id}`,{
			image
		})
		if (data.status) {
			setCurrentUser(data?.user)
			setLoading(false);
		}else{
			setLoading(false);
			akert("Error! Can't update profile photo");
		}
	}

	const uploadImage = (imageUrl) =>{
			setLoading(true)
			imagekit.upload({
		    file : imageUrl,
		    fileName : "thejashari",
		    extensions: [
		        {
		            name: "google-auto-tagging",
		            maxTags: 5,
		            minConfidence: 95
		        }
		    ]
			}).then(response => {
			    updateUserImage(response.url);
			    setPath('')
			}).catch(error => {
			    console.log(error.message);
			});
	}

	const toastOption={
		position:"bottom-right",
		autoClose:8800,
		pauseOnHover:true,
		draggable:true,
		theme:"dark",
	}

	return(
		<main className="w-full h-screen" >
			<Head>
		  		<title>Profile</title>
		  		<link rel="icon" href="/favicon.ico" sizes="any" />
		  		<meta property="og:url" content="https://tnsacademy.vercel.app" key="ogurl" />
				<meta property="og:image" content="https://ik.imagekit.io/d3kzbpbila/thejashari_QSsM9TGJP" key="ogimage" />
				<meta property="og:site_name" content="TNS-ACADEMY" key="ogsitename" />
				<meta property="og:title" content="TNS-ACADEMY" key="ogtitle" />
				<meta property="og:description" content="TNS academy is your online destination for learning various technologies. You will enjoy our fun and interactive video lessons, workshops and hands-on projects. No matter if you are a newbie or a pro, we will help you sharpen your skills to build amazing websites, apps, products, and more. Become part of our vibrant community of learners and express your creativity in the digital world. 
								Don't wait any longer and start your journey to success in the fascinating field of technology." key="ogdesc" />
		  	</Head>
			<Header2 hide="true"/>
			<div className="w-full flex md:flex-row flex-col justify-between md:mt-[80px] mt-14 gap-5">
				<div className="px-5 md:w-[25%] w-full py-3 md:p-0 ">
					<div className="w-full flex flex-col md:m-5">
						<div className="rounded-lg flex flex-col bg-gradient-to-r px-5 py-3
						md:bg-gradient-to-r bg-gradient-to-t from-purple-500/80 
						via-purple-500/80 to-red-500/50 shadow-xl shadow-purple-500/70 
						border-[1px] border-gray-300/60">
							<div className="flex items-center justify-center p-3 pb-2 relative">
								{
									editOpen &&
									<div onClick={()=>{if(!loading) document.getElementById('file1').click()}} 
									className={`absolute p-1 bottom-0 right-0 rounded-full ${!loading && 'cursor-pointer'} 
									hover:bg-gray-800 bg-gray-800/50 flex items-center justify-center`}>
										<MdEdit className={`h-5 w-5 ${loading && 'animate-pulse'} text-gray-200`}/>

									</div>
								}
								<input type="file" id="file1" accept="image/*" 
								value={path}
								onChange={(e)=>{
									if(pathCheck(e.target.value)){
										urlSetter();
									}else{
										toast('Image format not supported',toastOption);
									}
								}}
								hidden
								/>
								<img src={currentUser?.image} alt="" className="w-full rounded-full aspect-square
								shadow-xl shadow-pink-200/40 hover:scale-[102%] transition-all duration-200 ease-in-out"/>
							</div>
							<div className="my-4 h-[1.3px] w-full bg-gray-300"/>
							<div className="flex flex-col pb-2 gap-3">
								<h1 className="text-lg leading-none font-semibold text-gray-100">{currentUser?.name}</h1>
								<h1 className="text-md flex items-center gap-2 leading-none 
								text-gray-100 hover:underline hover:text-blue-100"><SiGmail className="h-4 w-4"/> {currentUser?.email}</h1>
								<h1 className="text-md flex items-center gap-2 leading-none 
								text-gray-100"><BsTools className="h-4 w-4"/> Workshops Participated : {currentUser?.registeredWorkshops?.length}</h1>
								<h1 className="text-md flex items-center gap-2 leading-none 
								text-gray-100"><MdOutlineCollectionsBookmark className="h-4 w-4"/> Courses Enrolled : {currentUser?.enrolledCoursesId?.length}</h1>
							</div>
						</div>

						<button 
						onClick={()=>setEditOpen(!editOpen)}
						className="md:mt-10 mt-7 w-full border-[1px] bg-gradient-to-r cursor-pointer from-purple-500/80 
						via-purple-500/80 to-red-500/50 shadow-xl shadow-purple-500/70 
						border-[1px] border-gray-300/60 py-2 rounded-lg text-white">
							{
								editOpen ? 'Done' : 'Edit'
							}
						</button>
					</div>
				</div>
				<div className="flex flex-col px-5 py-3 md:w-[70%] w-full">
					<h1 className="text-lg font-semibold text-black">Enrolled courses</h1>
					<div className="w-full h-[1.3px] my-3 bg-gray-300"/>
					{
						currentUser?.enrolledCoursesData?.length < 1 &&
						<div className="px-5 py-2">
							<h1 className="text-lg text-gray-500">-None-</h1>
						</div>
					}
					<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					{

						currentUser?.enrolledCoursesData?.map((course,j)=>(
							<ProfileCourseCard course={course} j={j} key={j} />
						))
					}
					</div>

					<h1 className="text-lg font-semibold mt-5 text-black">Participated workshops</h1>
					<div className="w-full h-[1.3px] my-3 bg-gray-300"/>
					{
						currentUser?.registeredWorkshops?.length < 1 &&
						<div className="px-5 py-2">
							<h1 className="text-lg text-gray-500">-None-</h1>
						</div>
					}
					<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
					{

						currentUser?.registeredWorkshops?.map((workshopId,j)=>(
							<ProfileWorkshopCard workshopId={workshopId} j={j} key={j} />
						))
					}
					</div>
				</div>
			</div>
			<ToastContainer />
		</main>
	)
}