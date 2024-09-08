/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { NavBar } from "../component/NavBar";
import { Header } from "../component/Header";
import { ChartCards } from "../component/ChartCards";
import { Home } from "./Home";
import { Calls } from "./Calls";
import { useCallList } from "../context/useCallList";

export const Main = ({ theme, messagesList, setMessagesList }) => {
  const { callList, advancedCallList, setTheme } = useCallList();
  const [page, setPage] = useState(0);
  const [protocol, setProtocol] = useState();

useEffect(() => {
  setTheme(theme);
}, []);


  return (
    <section className={`${theme === 'light' ? "background--bg-light" : "background--bg-dark"} home-container`}>
      <NavBar
       page={page}
        setPage={setPage}
         />
      <main className="d-flex column">
        <Header />
        <ChartCards list={theme === 'ligth' ? callList : advancedCallList} />
        {page === 0 ? (
          <Home
            protocol={protocol}
            setProtocol={setProtocol}
            setPage={setPage}
            page={page}
          />
        ) : (
          <Calls
            protocol={protocol}
            setPage={setPage}
            messagesList={messagesList}
            setMessagesList={setMessagesList}
          />
        )}
      </main>
    </section>
  );
};
