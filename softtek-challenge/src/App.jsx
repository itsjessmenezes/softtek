import { useState } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './container';
import { Chatbot } from './container/Chatbot';

export const App = () => {
    const [messagesList, setMessagesList] = useState([]);
    return (
        <Router>
        <Routes>
          <Route path="/crm" element={
            <Main 
            messagesList={messagesList}
             setMessagesList={setMessagesList}
              />} />
          <Route path="/" element={
            <Chatbot 
            messagesList={messagesList} 
            setMessagesList={setMessagesList} 
            />
            } />
        </Routes>
      </Router>
    )
}