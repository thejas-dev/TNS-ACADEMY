
import {GiHoodie} from 'react-icons/gi'
import {RxCross2} from 'react-icons/rx';

const CourseCompletionCard = ({setShowCourseCompleted,showCourseCompleted}) => {

  return (
    <div className={`bg-white relative text-gray-800 max-w-xl z-50 p-6 rounded-lg shadow-lg 
    ${showCourseCompleted ? 'rotate-[0deg]' : '-rotate-[90deg]'} transition-all duration-200
      ease-in-out`}>
      <div 
      onClick={()=>setShowCourseCompleted(false)}
      className={`absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 
      cursor-pointer`}>
        <RxCross2 className="h-5 w-5 text-gray-700"/>
      </div>
      <div className="flex items-center gap-3 justify-center text-green-500 mb-4">
        <div className="rounded-full p-1 bg-green-500">
          <GiHoodie className="h-7 w-7 text-gray-100"/>
        </div> 
        <h2 className="text-xl font-semibold">Congratulations!</h2>
      </div>
      <p className="text-lg mb-4">You have successfully completed the course.</p>
      <p className="text-sm">
        Thank you for your dedication. Your certificate will be sent to your email within 24 hours.
        You can also download it from this platform. Please provide your feedback through this feedback form. 
        <a href="https://forms.gle/nNTwJpCLdSAjy9586" target="_blank" className="text-sky-500 hover:underline cursor-pointer" > https://forms.gle/nNTwJpCLdSAjy9586</a>
      </p>
    </div>
  );
};

export default CourseCompletionCard;
