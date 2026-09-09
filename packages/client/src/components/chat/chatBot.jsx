import { FaArrowCircleUp } from 'react-icons/fa';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import TypingIndicator from './TypingIndicator.jsx';
import ChatMessages from './ChatMessages.jsx';

const ChatBot = () => {
   const [message, setMessage] = useState([]);
   const [error, setError] = useState('');
   const lastMessageRef = useRef(null);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm();

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [message]);

   const onSubmit = async ({ prompt }) => {
      setMessage((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsBotTyping(true);
      setError('');
      try {
         const { data } = await axios.post('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessage((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
         reset({ prompt: '' });
      } catch (error) {
         console.log('Backend error:', error);
         setError('Something went wrong, try again!');
      } finally {
         setIsBotTyping(false);
      }
   };

   const onKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div className="flex flex-col  h-full">
         <div className="flex flex-1 flex-col gap-3 mb-10 overflow-y-auto">
            <ChatMessages message={message} lastMessageRef={lastMessageRef} />
            {isBotTyping && <TypingIndicator />}
            {error && <p className="text-red-500">{error}</p>}
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
            <button
               disabled={!formState.isValid}
               className="rounded-full w-9 h-9"
            >
               <FaArrowCircleUp />
            </button>
         </form>
      </div>
   );
};

export default ChatBot;
