import { atom } from 'recoil';


export const currentUserState = atom({
	key:"currentUserState",
	default:''
});

export const currentWorkshopState =  atom({
	key:"currentWorkshopState",
	default:""
})

export const currentPlayingVideoState = atom({
	key:"currentPlayingVideoState",
	default:{}
})

export const currentCourseState = atom({
	key:"currentCourseState",
	default:[]
})

