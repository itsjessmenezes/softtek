/* eslint-disable no-undef */
import express from "express";
import axios from "axios";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import list from "../utils/callList.json" assert { type: "json" };

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

config();

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

let callList = list;
let advancedCallList = [];
let messageList = [];

app.get("/api/messages-list", async (req, res) => res.json(messageList));

app.get("/api/call-list", (req, res) => res.json(callList));

app.get("/api/advanced-call-list", (req, res) => res.json(advancedCallList));

app.post("/api/call-list", (req, res) => {
  const data = req.body;

  if (!data || data.length === 0) {
    return res.status(400).send("Dados da chamada não fornecidos");
  }

  callList.push(data);
  res.status(201).json(data);
});

app.post("/api/advanced-call-list", (req, res) => {
  const data = req.body;

  if (!data || data.length === 0) {
    return res.status(400).send("Dados da chamada não fornecidos");
  }

  advancedCallList.push(data);
  res.status(201).json(data);
});

app.post("/api/gpt", async (req, res) => {
  const { conversation, call_type } = req.body;

  try {
    const script = `Você é um assistente que ajuda a modificar objetos com base em conversas.
        A seguir está a descrição de um objeto. Modifique os campos title e description e suggestion com base na conversa fornecida.
        A conversa está separada por sender, sendo user e system.
        O campo title deverá ser uma das oçoes a seguir: Problema, Requisição, Mudança, Reclamação ou Solicitação.
        Descrição original do objeto: ${JSON.stringify(call_type)}.
        Mensages para a analise da conversa: ${JSON.stringify(conversation)}`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: script,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const messageContent = response.data.choices[0].message.content;

    res.json(messageContent);
  } catch (error) {
    console.error("Error on preparing new call object:", error);
    res.status(400).send("Error on preparing new call object");
  }
});

app.post("/api/create-protocol", async (req, res) => {
  const protocolId = 123023926 + callList.length;
  // const protocolId = Math.floor(100000000 + Math.random() * 900000000).toString();
  const toLocalDateString = (date) => {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
  }

  return res.json({
    protocol: {
    id: protocolId,
    create_date: toLocalDateString(new Date()),
  },
})
});

app.post("/api/client-chat/:protocolId", async (req, res) => {
  const { messages: listMessages } = req.body;
  const { protocolId } = req.params;
  const messages = listMessages.find(
    (item) => item.id === Number(protocolId)
  ).messages;


  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: process.env.EXPORTED_CONTENT,
          },
          ...messages.map((msg) => ({
            role: msg.sender.toLowerCase() === "user" ? "user" : "system",
            content: msg.text,
          })),
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const messageContent = response.data.choices[0].message.content;
    messageList = listMessages;

    const existsOpenProtocol = messageList.findIndex(
      (msg) => msg.id === Number(protocolId)
    );

    if (!existsOpenProtocol) {
      messageList[existsOpenProtocol].messages = [
        ...messageList[existsOpenProtocol].messages,
        { text: messageContent, sender: "system" },
      ];
    } else {
      messageList.push({
        id: protocolId,
        messages: [{ text: messageContent, sender: "system" }],
      });
    }

    res.json(messageList);
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).send("Error communicating with OpenAI");
  }
});

app.post("/api/operator-chat/:protocolId", async (req, res) => {
  const { messages: listMessages } = req.body;
  const { protocolId } = req.params;

  const messages = listMessages.find(
    (item) => item.id === Number(protocolId)
  ).messages;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: process.env.SCRIPT_HELP_OPERATOR,
          },
          ...messages.map((msg) => ({
            role: msg.sender.toLowerCase() === "user" ? "user" : "system",
            content: msg.text,
          })),
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const messageContent = response.data.choices[0].message.content;

    messageList = listMessages;

    const existsOpenProtocol = messageList.findIndex(
      (msg) => msg.id === Number(protocolId)
    );

    if (!existsOpenProtocol) {
      messageList[existsOpenProtocol].messages = [
        ...messageList[existsOpenProtocol].messages,
        { text: messageContent, sender: "system" },
      ];
    } else {
      messageList.push({
        id: protocolId,
        messages: [{ text: messageContent, sender: "system" }],
      });
    }

    res.json(messageList);
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).send("Error communicating with OpenAI");
  }
});

app.post("/api/operator/:protocolId", async (req, res) => {
  const { messages } = req.body;

  try {
    messageList = messages;

    res.json(messageList);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(400).send("Error sending message");
  }
});

app.delete("/api/call-list/:id", (req, res) => {
  const { id } = req.params;

  
  const newList = callList.filter(item => String(item.protocol.id) !== id);

  callList = [...newList];
  return res.json(newList);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
