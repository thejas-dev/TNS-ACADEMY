
import {RxCross2} from 'react-icons/rx';

export default function HelpCard({openHelpTab,setOpenHelpTab}){
  return (
    <div className="bg-gray-800 relative text-white p-4 rounded-lg shadow-lg">
    	<div 
    	onClick={()=>setOpenHelpTab(false)}
    	className="absolute top-5 right-5 p-1 rounded-full hover:bg-gray-700 
    	cursor-pointer">
    		<RxCross2 className="h-5 w-5 text-gray-200"/>
    	</div>
      <h2 className="text-lg font-semibold mb-2">How to Use our Learning Platform</h2>
      <p>- Watch 80% of a video to complete it.</p>
      <p>- Complete quizzes to unlock the next video.</p>
      <p>- Complete all quizzes and content videos to finish the course and get the certificate.</p>
      <p className="mt-4">
        If you encounter any bugs or issues, please report them to{' '}
        <a href="mailto:21stskills.com@gmail.com" className="underline">
          21stskills.com@gmail.com
        </a>.
      </p>
      <p className="text-sm mt-2">Note: This platform is in development, so issues may persist. Your feedback is valuable!</p>
    	<p className="mt-4">
        Certificates will be issued within 24 hours and sent directly to your email. <br/>You can also download your
        certificate from this platform after 24 hours.
      </p>
    </div>
  );
};
