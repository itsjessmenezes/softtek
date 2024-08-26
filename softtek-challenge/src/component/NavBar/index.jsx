/* eslint-disable react/prop-types */
import axios from "axios";
import home from "../../assets/images/home.svg";
import homeSelected from "../../assets/images/home-selected.svg";
import headset from "../../assets/images/headset.svg";
import headsetSelected from "../../assets/images/headset-selected.svg";

import config from "../../assets/images/config.svg";
import help from "../../assets/images/help.svg";
import robot from "../../assets/images/robot.svg";
import send from "../../assets/images/send.svg";

import "./style.css";
import { useState } from "react";
import { ROLE_SYSTEM, ROLE_USER } from "../../utils/actions";

const ChatBalloon = ({ onClick }) => (
  <div className="chat-balloon" onClick={onClick}>
    Como posso ajudá-lo?
  </div>
);

export const NavBar = ({ page, setPage }) => {
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatOperatorMessages, setChatOperatorMessages] = useState([]);
  const operatorId = 87224610528;
  const navOptions = [
    {
      img: home,
      imgSelected: homeSelected,
      title: "Home",
    },
    {
      img: headset,
      imgSelected: headsetSelected,
      title: "Chamados",
    },
  ];

  const navFooterOptions = [
    {
      img: config,
      title: "Configurações",
    },
    {
      img: help,
      title: "Ajuda",
    },
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();

    let newMessages = chatOperatorMessages;
    setLoading(true);

    if (input.trim()) {
      const existsOpenProtocol =
        chatOperatorMessages.length > 0
          ? chatOperatorMessages.findIndex(
              (item) => Number(item.id) === operatorId
            )
          : -1;

      if (existsOpenProtocol !== -1) {
        newMessages[existsOpenProtocol] = {
          ...chatOperatorMessages[existsOpenProtocol],
          messages: [
            ...chatOperatorMessages[existsOpenProtocol].messages,
            { text: input, sender: ROLE_USER },
          ],
        };
      } else {
        newMessages = [
          ...chatOperatorMessages,
          { id: operatorId, messages: [{ text: input, sender: ROLE_USER }] },
        ];
      }
    }

    try {
      const result = await axios.post(
        `http://localhost:5000/api/operator-chat/${operatorId}`,
        {
          messages: newMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setChatOperatorMessages(result.data);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatOperatorMessages("Error communicating with server");
    }

    setInput("");
    setLoading(false);
  };

  return (
    <nav className="background--white">
      <div className="d-flex column align-center gap-10">
        <h2 className="logo">FIAP Engineers</h2>
        <div className="divisor background--gray-font-200 margin bottom-20"></div>
        <ul className="d-flex column gap-10">
          {navOptions.map(({ title, img, imgSelected }) => (
            <li
              className={
                page === (title === "Home" ? 0 : 1)
                  ? "selected color--purple-font-500"
                  : ""
              }
              key={title}
              onClick={() => (title === "Home" ? setPage(0) : setPage(1))}
            >
              <img
                src={page === (title === "Home" ? 0 : 1) ? imgSelected : img}
                alt={title}
              />
              <span>{title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer">
        <div className="chat-operator-container d-flex align-end gap-10">
          <img
            onClick={() => setIsChatOpen(!isChatOpen)}
            src={robot}
            alt="Robo IA"
          />
          {isChatOpen ? (
            <div className="chat-operator-content">
              <div className="chat-operator-messages padding-10-20">
                {chatOperatorMessages.find((item) => item.id === operatorId) &&
                  chatOperatorMessages
                    .find((item) => item.id === operatorId)
                    .messages.map(
                      (msg, index) =>
                        typeof msg.text !== "object" && (
                          <div
                            key={index}
                            className={`message ${
                              msg.sender === ROLE_SYSTEM
                                ? "background--light-gray"
                                : "background--gray-200"
                            }`}
                          >
                            {msg.text}
                          </div>
                        )
                    )}
              </div>
              {loading && <div className="loading"></div>}
              <div className="d-flex padding-10-20 border radius-5 gap-10">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite uma mensagem..."
                />
                <button className="bg-none" onClick={handleSendMessage}>
                  <img src={send} alt="Enviar" />
                </button>
              </div>
            </div>
          ) : (
            //     <div className="chat-box">
            //       <div className="messages">
            //         {chatOperatorMessages.length > 0
            //         && chatOperatorMessages
            //         .find(item => item.id === operatorId)
            // .messages.map((msg, index) => (
            //           <div key={index} className="message">
            //             {msg}
            //           </div>
            //         ))}
            //       </div>
            //       <form onSubmit={handleSubmit}>
            //         <input
            //           type="text"
            //           value={input}
            //           onChange={(e) => setInput(e.target.value)}
            //           placeholder="Digite sua mensagem..."
            //         />
            //         <button type="submit">Enviar</button>
            //       </form>
            //     </div>
            <ChatBalloon onClick={() => setIsChatOpen(!isChatOpen)} />
          )}
        </div>
        <div className="divisor background--gray-font-200 margin bottom-20"></div>

        <ul>
          {navFooterOptions.map(({ title, img }) => (
            <li key={title}>
              <img src={img} alt={title} />
              <span>{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
