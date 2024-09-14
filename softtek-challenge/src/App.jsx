import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./container";
import { Chatbot } from "./container/Chatbot";
import { useCallList } from "./context/useCallList";

export const App = () => {
  const { callList, setCallList, advancedCallList, setAdvancedCallList } = useCallList();
  const [messagesList, setMessagesList] = useState([]);

  return (
    <Router>
      <Routes>
      <Route
          path="/crm"
          element={
            <Main
              theme="light"
              list={callList}
              setList={setCallList}
              messagesList={messagesList}
              setMessagesList={setMessagesList}
            />
          }
        />
        <Route
          path="/crm-advanced"
          element={
            <Main
              theme="dark"
              list={advancedCallList}
              setList={setAdvancedCallList}
              messagesList={messagesList}
              setMessagesList={setMessagesList}
            />
          }
        />
        <Route
          path="/"
          element={
            <Chatbot
              messagesList={messagesList}
              setMessagesList={setMessagesList}
            />
          }
        />
      </Routes>
    </Router>
  );
};
