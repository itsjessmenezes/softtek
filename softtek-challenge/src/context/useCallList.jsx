/* eslint-disable react/prop-types */
// CallListContext.js
import { createContext, useState, useContext } from 'react';
import { sortedCallList } from '../utils/functions';
const CallListContext = createContext();

export const useCallList = () => useContext(CallListContext);

export const CallListProvider = ({ children }) => {
  const [callList, setCallList] = useState([]);
  const [redirectCall, setRedirectCall] = useState({});

  const addToCallList = (newCall) => {
    setCallList(prev => {
      const updatedList = [...prev, newCall];
      const uniqueList = updatedList.filter((item, pos, self) => 
        self.findIndex(t => t?.protocol?.id === item?.protocol?.id) === pos
      );
      const sortedList = sortedCallList(uniqueList);
      return sortedList;
    })
  };

  return (
    <CallListContext.Provider value={{ callList, setCallList,
     redirectCall, setRedirectCall,
     addToCallList
      }}>
      {children}
    </CallListContext.Provider>
  );
};