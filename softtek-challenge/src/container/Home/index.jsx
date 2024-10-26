/* eslint-disable react/prop-types */
import "./style.css";
import { toLocalDateString } from "../../utils/custom";
import axios from "axios";
import { useEffect, useState } from "react";
import { sortedCallList } from "../../utils/functions";
import { Loading } from "../../component/Loading";
import { useCallList } from "../../context/useCallList";
import newCalls from "../../utils/newCalls.json";
import { TableComponent } from "../../component/TableComponent";

export const Home = ({ setProtocol, setPage, list, setList }) => {
  const { theme, callList, advancedCallList, setCallList, setAdvancedCallList} = useCallList();
  const [loading, setLoading] = useState(null);
  const [hasNewItens, setHasNewItens] = useState(true);

  const fetchAdvancedCallList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/advanced-call-list');
      
      if (response.data.length === list.length) return;

      response.data.map((item) =>
        setAdvancedCallList((prev) => {
          const updatedList = [...prev, item];
          const uniqueList = updatedList.filter(
            (item, pos, self) =>
              self.findIndex((t) => t?.protocol?.id === item?.protocol?.id) ===
              pos
          );
          const sortedList = sortedCallList(uniqueList);
          return sortedList;
        })
      );
    } catch (error) {
      console.error("Error fetching callList:", error);
    }
  };

  const fetchCallList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/call-list');
      
      if (response.data.length === list.length) return;
      response.data.map((item) =>
        setCallList((prev) => {
          const updatedList = [...prev, item];
          const uniqueList = updatedList.filter(
            (item, pos, self) =>
              self.findIndex((t) => t?.protocol?.id === item?.protocol?.id) ===
              pos
          );
          const sortedList = sortedCallList(uniqueList);
          return sortedList;
        })
      );
    } catch (error) {
      console.error("Error fetching callList:", error);
    }
  };

  const saveNewItem = async (newCall, setList) => {
    try {
      const updatedNewCall = {
        ...newCall,
        protocol: {
          ...newCall.protocol,
          create_date: toLocalDateString(new Date()).toISOString(),
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/${theme === 'light' ? '' : 'advanced-'}call-list`,
        updatedNewCall
      );
      setList((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding to call list:", error);
    }
  };

  const setNewItens = () => {
    setLoading(true);
    while (newCalls.length > 0) {
      const call = newCalls.shift();
      const updateCall = {
        ...call,
        protocol: {
          ...call.protocol,
          create_date: toLocalDateString(new Date()).toISOString(),
        }
      }

      saveNewItem(updateCall, setList);
    }

    setLoading(false);
    setHasNewItens(false);
  };


  useEffect(() => {
    if(!theme) return;
    if(theme === 'dark') return;
    setNewItens();
  }, [theme]);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      // console.log(location.pathname);

        fetchCallList();
        fetchAdvancedCallList();

      setLoading(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasNewItens]);

  return (
    <section className={`${theme === 'light' ? "background--white" : "background--dark"} d-flex align-center justify-center padding-20-30 margin top-20 border radius-10`}>
      {loading && <Loading />}
      {theme === 'light' && (
        <TableComponent 
        list={callList}
        setPage={setPage}
        setProtocol={setProtocol}
      />
      )}

      {theme === 'dark' && (
        <TableComponent 
        list={advancedCallList}
        setPage={setPage}
        setProtocol={setProtocol}
      />
      )}
    </section>
  );
};
