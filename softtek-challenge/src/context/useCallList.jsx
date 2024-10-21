/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { sortedCallList } from "../utils/functions";
import list from "../utils/callList.json";
const CallListContext = createContext();

export const useCallList = () => useContext(CallListContext);

export const CallListProvider = ({ children }) => {
  const [callList, setCallList] = useState(list);
  const [advancedCallList, setAdvancedCallList] = useState([]);
  const [redirectCall, setRedirectCall] = useState({});
  const [theme, setTheme] = useState("");

  const addToCallList = (newCall) => {
    setCallList((prev) => {
      const updatedList = [...prev, newCall];
      const uniqueList = updatedList.filter(
        (item, pos, self) =>
          self.findIndex((t) => t?.protocol?.id === item?.protocol?.id) === pos
      );
      const sortedList = sortedCallList(uniqueList);
      return sortedList;
    });
  };

  return (
    <CallListContext.Provider
      value={{
        callList,
        setCallList,
        redirectCall,
        setRedirectCall,
        addToCallList,
        theme,
        setTheme,
        advancedCallList,
        setAdvancedCallList
      }}
    >
      {children}
    </CallListContext.Provider>
  );
};
