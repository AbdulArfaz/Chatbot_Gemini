import React from 'react';

const TypingIndicator = () => {
   return (
      <div className="flex self-start">
         <div className="flex items-center gap-1.5 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm shadow-sm">
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:0.4s]"></div>
         </div>
      </div>
   );
};

export default TypingIndicator;
