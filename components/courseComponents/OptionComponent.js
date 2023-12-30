


export default function OptionComponent({option,question,k,selectThisOption}) {


	return (
		<div key={k} 
		onClick={()=>{
			selectThisOption(question,option);
		}}
		className="flex flex items-center gap-2 w-full rounded-lg
		border-[1px] border-gray-700 hover:bg-gray-800/80 transition-all duration-100 
		ease-in-out cursor-pointer px-3 py-2">
			<div className={`h-[14px] w-[14px] block rounded-full border-[1px] p-[2px] 
			border-gray-300 overflow-hidden`}>
				<div className={`${question?.selected === option ? 'bg-white' : ''} rounded-full 
				h-full w-full`}/>
			</div>
			<h1 className="text-sm font-normal text-gray-300">{option}</h1>
		</div>
	)
}