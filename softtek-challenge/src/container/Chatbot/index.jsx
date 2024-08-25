/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { ROLE_USER } from "../../utils/actions";
import bdClients from "../../utils/bdClients.json";
import { useCallList } from "../../context/useCallList";
import callList from '../../utils/callList.json';

import './style.css';
export const Chatbot = ({
  messagesList,
  setMessagesList,
}) => {
    const { 
        setCallList,
    } = useCallList();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [hasRedirectedToOperator, setHasRedirectedToOperator] = useState(false);
  const documentTypes = ["CPF", "CNPJ", "Nome da Empresa"];
  const serviceTypes = ["Cadastro", "Financeiro", "Suporte Técnico"];
  const [formValues, setFormValues] = useState({
    clientName: "test",
    document: {
      type: documentTypes[0],
      value: "farmacity",
    },
    service: {
      type: serviceTypes[0],
    },
  });

  const { clientName, document, service } = formValues;
  const protocolId = 123023937 + callList.length;
  const verifyCompanyExists = bdClients.find(({ client }) => {
    if (document.type === "nome da empresa") {
      return (
        client.company_name.toLowerCase() === document.value.toLowerCase()
      );
    }
    return (
      client.document_type === document.type &&
      client.document_number === document.value
    );
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();


    if (!verifyCompanyExists) {
      alert(
        "Não encontramos a empresa informada, verifique os dados e tente novamente"
      );
    } else {
      setOpenChat(true);
      setMessage(
        `Olá, meu nome é ${clientName}, falo da empresa ${document.value}. Preciso de ajuda com ${service.type}, poderia me orientar?`
      );
    }
  };

  const saveNewItem = async (newCall) => {
    try {
        const response = await axios.post('http://localhost:5000/api/call-list', newCall);
        setCallList(prev => ([...prev, response.data]))

    } catch (error) {
        console.error('Error adding to call list:', error);
    }
  }

  const sendMessageToOperator = async (newMessages) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/operator/${protocolId}`,
        {
          messages: newMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const findConversation = result.data.find(item => item.id === Number(protocolId));
      const { id, messages: responseMessages } = findConversation;
      
      const resultMessage = responseMessages[responseMessages.length - 1].text;
      setMessagesList(result.data);

      if (
        (resultMessage.includes("redirec") &&
          resultMessage.includes("atendente")) ||
        (resultMessage.includes("transfi") &&
          resultMessage.includes("atendim")) ||
        (resultMessage.includes("encamin") &&
          resultMessage.includes("atenden"))
      ) {

        if (verifyCompanyExists) {
          const newCall = {
              ...verifyCompanyExists,
              protocol: {
                id,
                create_date: new Date().toISOString(),
              },
              client : {
                  ...verifyCompanyExists.client,
                  name: formValues.clientName
              },
              status: "Aberto",
              call_type: {
                title: "Erro",
                description: "Falha no sistema de contabilidade",
              },
              priority: service.type === 'Cadastro' ? 'BAIXA' : service.type === 'Financeiro' ? 'MEDIA' : 'ALTA',
              description:
                "Problema no sistema de contabilidade causando falhas ao gerar relatórios fiscais.",
            }

            saveNewItem(newCall);
        }

        alert(
          "Seu atendimento será redirecionado a um atendente. Por favor, aguarde."
        );
        setHasRedirectedToOperator(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessagesList("Error communicating with server");
    }
  }
  
  const sendMessageToGPT = async (newMessages) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/chat/${protocolId}`,
        {
          messages: newMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const findConversation = result.data.find(item => item.id === Number(protocolId));
      const { id, messages: responseMessages } = findConversation;
      
      const resultMessage = responseMessages[responseMessages.length - 1].text;
      setMessagesList(result.data);

      if (
        (resultMessage.includes("redirec") &&
          resultMessage.includes("atendente")) ||
        (resultMessage.includes("transfi") &&
          resultMessage.includes("atendim")) ||
        (resultMessage.includes("encamin") &&
          resultMessage.includes("atenden"))
      ) {

        if (verifyCompanyExists) {
          const newCall = {
              ...verifyCompanyExists,
              protocol: {
                id,
                create_date: new Date().toISOString(),
              },
              client : {
                  ...verifyCompanyExists.client,
                  name: formValues.clientName
              },
              status: "Aberto",
              call_type: {
                title: "Erro",
                description: "Falha no sistema de contabilidade",
              },
              priority: service.type === 'Cadastro' ? 'BAIXA' : service.type === 'Financeiro' ? 'MEDIA' : 'ALTA',
              description:
                "Problema no sistema de contabilidade causando falhas ao gerar relatórios fiscais.",
            }

            saveNewItem(newCall);
        }

        alert(
          "Seu atendimento será redirecionado a um atendente. Por favor, aguarde."
        );
        setHasRedirectedToOperator(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessagesList("Error communicating with server");
    }
  }


  const handleSubmitGPT = async (event) => {
    event.preventDefault();
    let newMessages = messagesList;
   
    if (message.trim()) {
      const existsOpenProtocol = messagesList.length > 0 ? messagesList.findIndex(item => Number(item.id) === protocolId) : -1;
     
      if(existsOpenProtocol !== -1) {
        newMessages[existsOpenProtocol] = { ...messagesList[existsOpenProtocol], messages: [...messagesList[existsOpenProtocol].messages, { text: message, sender: ROLE_USER }]};
      } else {
        newMessages = [...messagesList, {id: protocolId, messages: [{ text: message, sender: ROLE_USER }]}];
      }
    }

    if(hasRedirectedToOperator) {
      sendMessageToOperator(newMessages);
      return;
    }

      setMessagesList(newMessages);
      setMessage("");
      setLoading(true);

      sendMessageToGPT(newMessages);

    setLoading(false);
  };

  return !openChat ? (
    <div className="container">
      <div className="form-container">
        <h2>Formulário de Atendimento</h2>
        <form className="form" onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label htmlFor="client-name">Nome do Cliente:</label>
            <input
              type="text"
              id="client-name"
              name="client-name"
              value={clientName}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  clientName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="document-type">Dado da Empresa</label>
            <div className="form-content">
              <select
                name="document-type"
                id="document-type"
                value={document.type}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    document: { ...prev.document, type: e.target.value },
                  }))
                }
                required
              >
                {documentTypes.map((doc) => (
                  <option key={doc} value={doc.toLowerCase()}>
                    {doc}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="document-type"
                name="document-type"
                value={document.value}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    document: {
                      ...prev.document,
                      value:
                        document.type === "nome da empresa"
                          ? e.target.value
                          : e.target.value.replace(/\D/g, ""),
                    },
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="service-type">Tipo de Atendimento</label>
            <select
              name="service-type"
              id="service-type"
              value={service.type}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  service: { ...prev.service, type: e.target.value },
                }))
              }
              required
            >
              {serviceTypes.map((doc) => (
                <option key={doc} value={doc.toLowerCase()}>
                  {doc}
                </option>
              ))}
            </select>
          </div>
          <div className="form-submit">
            <button className="submit-btn" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <section className="chat-section">
          <div className="chat-container background--white border radius-5">
      <div className="chat-content chat-content-chatbot">
        <div className="messages messages-chatbot padding-10-20">
        {messagesList.length > 0 && messagesList.find(item => item.id === Number(protocolId))
        .messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        </div>
      </div>
      {loading && <div className="loading"></div>}
      <div className="input-container d-flex padding-10-20 border radius-5 gap-10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmitGPT()}
          placeholder="Digite uma mensagem..."
        />
        <button className="background--purple-gradient" onClick={handleSubmitGPT}>Enviar</button>
      </div>
    </div>
    </section>
  );
}
