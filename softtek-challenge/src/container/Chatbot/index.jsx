/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { ROLE_SYSTEM, ROLE_USER } from "../../utils/actions";
import bdClients from "../../utils/bdClients.json";
import { useCallList } from "../../context/useCallList";

import './style.css';
import '../Calls/style.css';
export const Chatbot = ({
  messages,
  setMessages,
}) => {
    const { 
        callList,
    } = useCallList();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const documentTypes = ["CPF", "CNPJ", "Nome da Empresa"];
  const serviceTypes = ["Cadastro", "Financeiro", "Suporte Técnico"];
  const [formValues, setFormValues] = useState({
    clientName: "",
    document: {
      type: documentTypes[0],
      value: "",
    },
    service: {
      type: serviceTypes[0],
    },
  });

  const { clientName, document, service } = formValues;
  /**
   * 
   * verificar como farei para ter um novo contato com o gpt e ele preencher os campos que faltam no redirect
   */
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
        console.log('Added to Call List:', response.data);
    } catch (error) {
        console.error('Error adding to call list:', error);
    }
  }

  const handleSubmitGPT = async (event) => {
    event.preventDefault();

    if (message.trim()) {
      const newMessages = [...messages, { text: message, sender: ROLE_USER }];
      console.log({ newMessages, messages });
      setMessages(newMessages);
      setMessage("");
      setLoading(true);

      try {
        const result = await axios.post(
          "http://localhost:5000/api/chat",
          {
            messages: newMessages,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setMessages((prev) => [
          ...prev,
          { sender: ROLE_SYSTEM, text: result.data.message },
        ]);

        const resultMessage = result.data.message;
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
                  id: 123023932 + callList.length,
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
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages("Error communicating with server");
      }
    }

    setLoading(false);
  };

  console.log(formValues);



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
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      {loading && <div className="loading">Carregando...</div>}
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmitGPT()}
          placeholder="Digite uma mensagem..."
        />
        <button onClick={handleSubmitGPT}>Enviar</button>
      </div>
    </div>
  );
}
