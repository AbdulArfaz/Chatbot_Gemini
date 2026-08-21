import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const App = () => {
   const [message, setMessage] = useState('');

   useEffect(() => {
      const fetchMessage = async () => {
         try {
            const res = await fetch('/api/hello');
            const data = await res.json();
            setMessage(data.message);
         } catch (error) {
            console.error('Error fetching data', error);
         }
      };
      fetchMessage();
   }, []);

   return (
      <div className="p-4">
         <p className="font-bold text-3xl">{message}</p>
         <Button variant="outline">Button</Button>
      </div>
   );
};

export default App;
