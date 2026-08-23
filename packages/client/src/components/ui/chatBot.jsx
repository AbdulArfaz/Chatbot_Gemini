import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Button } from './button.jsx';
import { useRef } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

const ChatBot = () => {
   const [message, setMessage] = useState([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const lastMessageRef = useRef(null);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm();

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [message]);

   const onSubmit = async ({ prompt }) => {
      setMessage((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsBotTyping(true);
      try {
         const { data } = await axios.post('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessage((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
         setIsBotTyping(false);
         reset({ prompt: '' });
      } catch (error) {
         console.log('Backend error:', error);
      }
   };

   const onKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   const onCopyMessage = (e) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
   return (
      <div className="flex flex-col  h-full">
         <div className="flex flex-1 flex-col gap-3 mb-10 overflow-y-auto">
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
            {isBotTyping && (
               <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s" />
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s" />
               </div>
            )}
            <div ref={lastMessageRef} />
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}

            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               autoFocus
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask Anything"
               maxLength={1000}
            />
            <Button
               disabled={!formState.isValid}
               className="rounded-full w-9 h-9"
            >
               <FaArrowCircleUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
