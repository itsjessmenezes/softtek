import { useState } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './container';
import { Chatbot } from './container/Chatbot';

export const App = () => {
    const [messages, setMessages] = useState([]);
    return (
        <Router>
        <Routes>
          <Route path="/crm" element={
            <Main 
            messages={messages}
             setMessages={setMessages}
              />} />
          <Route path="/" element={
            <Chatbot 
            messages={messages} 
            setMessages={setMessages} 
            />
            } />
        </Routes>
      </Router>
    )
}