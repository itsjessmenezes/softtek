/* eslint-disable react/prop-types */
import { useState } from "react";

import { NavBar } from "../component/NavBar";
import { Header } from "../component/Header";
import { ChartCards } from "../component/ChartCards";
import { Home } from "./Home";
import { Calls } from "./Calls";

export const Main = ({ callList, messages, setMessages }) => {
  const [page, setPage] = useState(0);
  const [protocol, setProtocol] = useState();
  console.log("main", callList);

  return (
    <section className="home-container">
      <NavBar page={page} setPage={setPage} />
      <main>
        <Header />
        <ChartCards />
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
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </main>
    </section>
  );
};
