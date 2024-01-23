import {useState} from 'react';






export default function LinkComponent() {
	// body...
	const [copied,setCopied] = useState(false);


	 const copyLink = () => {
	    const link = 'https://trendzio.vercel.app';

	    // Create a temporary input element to copy the link to the clipboard
	    const tempInput = document.createElement('input');
	    tempInput.value = link;
	    document.body.appendChild(tempInput);
	    tempInput.select();
	    document.execCommand('copy');
	    document.body.removeChild(tempInput);

	    // Set the copied state to true and reset after a delay
	    setCopied(true);
	    setTimeout(() => {
	      setCopied(false);
	    }, 2000);
	  };

	return (
	<div className="bg-gray-900 min-h-screen flex items-center justify-center w-full text-white">
        <div className="flex justify-center flex-col items-center gap-7">
						
          <h1 className="text-gray-200 text-[18px] text-center px-4">
          	It seems like you are using instagram built-in broswer. The Instagram in-app browser lacks support for critical features like WebRTC, socket connections, and cookies, essential for a seamless experience in the Trendzio app. 
          	<br/><br/>
          	To fully access all capabilities, we suggest opening the trendzio application in an external browser, ensuring real-time communication and optimal session management.
          </h1>
          <h1 onClick={copyLink} className="text-pink-500 text-xl cursor-pointer font-semibold">https://trendzio.vercel.app</h1>
          <p className="text-gray-300 px-5 text-center">
          Copy the link above and open it in a full browser such as <span className="text-pink-500 font-semibold">Google Chrome</span> or another browser of your choice. This will ensure that you have access to all the features, including real-time communication like group calls and proper session management.
        </p>
          <button 
			onClick={copyLink}
			className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white 
			font-semibold text-2xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
			{
				copied ? 
				'Copied'
				:
				'Copy'
			}
			</button>

        </div>
    </div> 

	)
}
