/* eslint-disable react/prop-types */
import "./style.css";

import { LabelComponent } from "../../component/LabelComponent";
import { KeyValueComponent } from "../../component/KeyValueComponent";

import location from "../../assets/images/location.svg";
import contact from "../../assets/images/contact.svg";
import notFound from "../../assets/images/not-found.svg";
import arrowDown from "../../assets/images/arrow-down.svg";
import arrowUp from "../../assets/images/arrow-up.svg";
import send from "../../assets/images/send.svg";
import robot from "../../assets/images/robot.svg";
import brokeRobot from "../../assets/images/broke-robot.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { ROLE_OPERATOR, ROLE_SYSTEM, ROLE_USER, STATUS_ORDER } from "../../utils/actions";
import { sortedCallList } from "../../utils/functions";
import { useCallList } from "../../context/useCallList";

export const Calls = ({ protocol, setPage, messagesList, setMessagesList }) => {
  const { callList, setCallList } = useCallList();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [height, setHeight] = useState(0);
  const findProtocol = callList.find((p) => p.protocol.id === protocol);

  const handleOptionClick = (status, protocolId) => {
    const updateStatus = callList.map((item) =>
      item.protocol.id === protocolId ? { ...item, status: status.value } : item
    );

    setCallList(sortedCallList(updateStatus));
    setPage(0);
  };

  const handleSendMessage = async () => {
    const protocolId = findProtocol.protocol.id;
    let newMessages = messagesList;

    if (input.trim()) {
      const existsOpenProtocol = messagesList.length > 0 ? messagesList.findIndex(item => Number(item.id) === protocolId) : -1;
      if(existsOpenProtocol !== -1) {

        newMessages[existsOpenProtocol] = { ...messagesList[existsOpenProtocol], messages: [...messagesList[existsOpenProtocol].messages, { text: input, sender: ROLE_USER }]};
      } else {
        newMessages = [...messagesList, {id: protocolId, messages: [{ text: input, sender: ROLE_OPERATOR }]}];
      }
      
      // setMessagesList(newMessages);
      // setInput("");
      // setLoader(true);

      // try {
      //   const result = await axios.post(
      //     `http://localhost:5000/api/operator/${protocolId}`,
      //     {
      //       messages: newMessages,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   console.log({result})

      //   setMessagesList(result.data);
      // } catch (error) {
      //   console.error("Error sending message:", error);
      //   setMessagesList("Error communicating with server");
      // }

      setMessagesList(newMessages);
      setLoader(true);
      setInput("");

      setTimeout(() => {
        newMessages[existsOpenProtocol] = { ...messagesList[existsOpenProtocol], messages: [...messagesList[existsOpenProtocol].messages, { text: "Resposta do cliente", sender: ROLE_SYSTEM }]};
        setMessagesList(newMessages);
        setLoader(false);

      }, 1000);
    }
  };

  const fetchMessagens = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/messages-list"
      );

    setMessagesList((prev) => [
        ...prev,
        ...response.data,
    ]);
    } catch (error) {
      console.error("Error fetching callList:", error);
    }
  };

  useEffect(() => {
    fetchMessagens();
}, []);

  useEffect(() => {
    let hideLoading;

    if (loading !== null) {
      hideLoading = setTimeout(() => {
        setLoading(null);
      }, 500);
    }
    const parentElement = document.querySelector(".call-info-container");

    if (parentElement) {
      const parentHeight = parentElement.clientHeight;
      setHeight(parentHeight);
    }

    const handleResize = () => {
      if (parentElement) {
        setHeight(parentElement.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(hideLoading);
    };
  }, [setHeight, loading]);

  const callItem = findProtocol ? findProtocol : callList[0];
  const {
    protocol: protocolInfo,
    client,
    call_type,
    contract,
    priority,
  } = callItem;


  return (
    <section className="d-flex margin top-20 gap-10">
      <section className="call-info-container d-flex flex column gap-10">
        <section className="background--white border radius-5 ">
          <LabelComponent
            title={`N° Chamado: ${protocolInfo.id}`}
            keyValue={
              <>
                <KeyValueComponent label="Prioridade:" value={priority} />
                <KeyValueComponent
                  label="Tipo de Chamado:"
                  value={call_type.title}
                />
              </>
            }
            content={
              <div className="content-button d-flex column gap-10">
                <div className="background--gray-500 d-flex padding-10-20 border radius-5 gap-10">
                  <button
                    className="close-call--btn bg-none d-flex align-center gap-10 border b-none color--white font weight--bold pointer"
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                  >
                    Atualizar chamado
                    <img
                      src={isOptionsOpen ? arrowUp : arrowDown}
                      alt="Atualizar Chamado"
                    />
                  </button>
                </div>
                {isOptionsOpen && (
                  <ul className="dropdown-menu">
                    {STATUS_ORDER.map((item) => (
                      <div key={item.id} className="d-flex column gap-10">
                        <li
                          onClick={() =>
                            handleOptionClick(item, protocolInfo.id)
                          }
                        >
                          {item.value}
                        </li>
                        <div className="divisor background--gray-font-200"></div>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            }
          />
        </section>

        <section className="background--white border radius-5">
          <LabelComponent
            title={client.company_name}
            keyValue={
              <>
                <KeyValueComponent
                  label="Nome do Cliente:"
                  value={client.name}
                />
                <KeyValueComponent
                  label={`${client.document_type}:`}
                  value={client.document_number}
                />
              </>
            }
            content={
              <div className="d-flex column">
                <KeyValueComponent
                  icon={location}
                  label="Endereço:"
                  value={`${client.address.street}, ${client.address.street_number} - ${client.address.state_code}`}
                />
                <KeyValueComponent
                  icon={contact}
                  label="Contato:"
                  value={client.phone}
                />
              </div>
            }
          />
        </section>

        <section className="background--white border radius-5">
          <div className="margin bottom-20">
            <LabelComponent
              title="Plano de Suporte Técnico Premium"
              keyValue={
                <>
                  <KeyValueComponent
                    label="Acesso remoto e Presencial"
                    value=""
                  />
                  <KeyValueComponent
                    label="Renovação de contrato:"
                    value={new Date(contract.renewal_contract).toLocaleString(
                      "pt-BR",
                      { year: "numeric", month: "numeric", day: "numeric" }
                    )}
                  />
                </>
              }
              content={
                <>
                  <KeyValueComponent
                    label="Valor:"
                    value={contract.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  />
                  <KeyValueComponent label="Tipo de contrato:" value="Anual" />
                </>
              }
            />
          </div>

          <div className="divisor background--gray-font-200 margin bottom-20"></div>

          <section className="interactions-history padding-10-20">
            <h3 className="margin bottom-20 color--gray-font-900">
              Histórico de Interações
            </h3>
            <div className="d-flex column align-center">
              <img
                className="margin bottom-10"
                src={notFound}
                alt="Nenhum resultado encontrado"
              />
              <h4 className="color--gray-font-900">
                Nenhum resultado encontrado
              </h4>
            </div>
          </section>
          <div className="divisor background--gray-font-200 margin bottom-20"></div>

          <section className="suggestion padding-10-20">
              {call_type.suggestion ? (
            <div className="suggestion-title d-flex">
                <img src={robot} alt="Sugestão da IA" />
                <span className="color--gray-font-700 font weight--bold">Softinho sugere:</span>
            </div>
              ) : (
                <div className="d-flex column full align-center justify-center margin bottom-10 gap-10">
                   <img src={brokeRobot} alt="Sugestão da IA" />
                  <span className="color--gray-font-700">Oops, o Softinho não conseguiu criar uma sugestão para este atendimento</span>
                </div>
              )}
            <span className="color--gray-font-700">{call_type.suggestion}</span>
          </section>
        </section>
      </section>
      <div
        className="chat-container background--white border radius-5"
        style={{ height: `${height}px` }}
      >
        <div className="header background--gray-500 color--white padding-10-20 border top-radius-5">
          <h3>{client.name}</h3>
          <span className="header-online">online</span>
        </div>
        <div className="chat-content">
          <div className="messages padding-10-20">
            {messagesList.find(item => item.id === protocolInfo.id) && messagesList
            .find(item => item.id === protocolInfo.id).messages
            .map((msg, index) => typeof msg.text !== 'object' && (
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
            ))}
          </div>
          {loader && <div className="loading"></div>}
          <div className="input-container d-flex padding-10-20 border radius-5 gap-10">
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
      </div>
    </section>
  );
};
