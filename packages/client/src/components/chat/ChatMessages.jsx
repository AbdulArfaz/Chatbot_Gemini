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
               className={`px-3 py-1 rounded-xl ${
                  message.role === 'user'
                     ? 'bg-blue-600 text-white self-end'
                     : 'bg-gray-100 text-black self-start'
               }`}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
         <div ref={lastMessageRef} />
      </>
   );
};

export default ChatMessages;
