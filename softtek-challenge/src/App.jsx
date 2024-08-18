import { useState } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Chatbot } from './container/Chatbot';
// import { Home } from './container/Home';
import { Main } from './container';
import { Chatbot } from './container/Chatbot/test';

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
          {/* <Route path="/crm" element={<Home messages={messages} setMessages={setMessages} />} /> */}
          <Route path="/" element={
            <Chatbot 
            messages={messages} 
            setMessages={setMessages} 
            // callList={callList} 
            // setCallList={setCallList}
            // redirectCall={redirectCall}
            // setRedirectCall={setRedirectCall}
            />
            } />
          {/* <Route path="/" element={<Chatbot messages={messages} setMessages={setMessages} />} /> */}
        </Routes>
      </Router>
    )
}