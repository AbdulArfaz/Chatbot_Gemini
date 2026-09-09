import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessages = ({ message, lastMessageRef }) => {
   const onCopyMessage = (e) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };

   return (
      <>
         {message.map((message, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
               className={`flex flex-col max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed backdrop-blur-md shadow-md transition-all ${
                  message.role === 'user'
                     ? 'bg-linear-to-r from-pink-500 to-violet-600 text-white self-end rounded-tr-sm shadow-purple-900/20'
                     : 'bg-white/10 text-slate-200 border border-white/10 self-start rounded-tl-sm'
               }`}
            >
               <div className="markdown-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
               </div>
            </div>
         ))}
         <div ref={lastMessageRef} />
      </>
   );
};

export default ChatMessages;
