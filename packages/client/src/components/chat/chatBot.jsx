import React from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaArrowCircleUp } from 'react-icons/fa';
import ChatMessages from './ChatMessages';
import TypingIndicator from './TypingIndicator';

const ChatBot = () => {
   const [message, setMessage] = useState([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState('');
   const lastMessageRef = useRef(null);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm();

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({
         behaviour: 'smooth',
      });
   }, [message]);

   const onSubmit = async ({ prompt }) => {
      setMessage((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsBotTyping(true);
      try {
         const { data } = await axios.post(
            'https://chatbot-gemini-amj9.onrender.com/api/chat',
            { prompt, conversationId: conversationId.current }
         );
         setMessage((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);

         reset({ prompt: '' });
      } catch (error) {
         console.log('Axios Error ', error);
         setError('Something went wrong , try again!');
      } finally {
         setIsBotTyping(false);
      }
   };
   const onKeyDown = (e) => {
      if (e.key == 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div className="flex flex-col h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-slate-100 antialiased">
         <div className="flex-1 flex flex-col h-full overflow-hidden max-w-4xl w-full mx-auto px-4 pt-6">
            <div className="flex-1 flex flex-col gap-4 mb-4 overflow-y-auto pr-2 custom-scrollbar">
               <ChatMessages
                  message={message}
                  lastMessageRef={lastMessageRef}
               />
               {isBotTyping && <TypingIndicator />}
               {error && (
                  <p className="text-pink-400 text-sm bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-xl backdrop-blur-md">
                     {error}
                  </p>
               )}
            </div>

            <form
               onSubmit={handleSubmit(onSubmit)}
               onKeyDown={onKeyDown}
               className="flex flex-col md:flex-row items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl mb-6 shadow-purple-950/50 focus-within:border-purple-500/50 transition-all duration-300"
            >
               <textarea
                  {...register('prompt', {
                     required: true,
                     validate: (data) => data.trim().length > 0,
                  })}
                  autoFocus
                  placeholder="Ask anything or type a prompt..."
                  rows={1}
                  maxLength={1000}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-slate-100 placeholder-slate-400 text-sm py-2 px-2 max-h-32"
               />
               <button
                  type="submit"
                  disabled={!formState.isValid}
                  className={`rounded-xl px-5 py-2.5 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shrink-0 ${
                     formState.isValid
                        ? 'bg-linear-to-r from-pink-500 to-violet-600 hover:opacity-90 active:scale-95 text-white shadow-purple-900/40'
                        : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                  }`}
               >
                  <FaArrowCircleUp className="text-xl" />
               </button>
            </form>
         </div>
      </div>
   );
};

export default ChatBot;
