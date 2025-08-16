import { useState, useEffect } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const user = {
  _id: String(Math.random()),
  name: "Farid Safi"
};

let ws = null;

const Screen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws = new WebSocket("ws://localhost:8080");
    return () => {
      ws.close();
      ws = null;
    };
  }, []);

  useEffect(() => {
    const handleReceive = event => {
      const message = JSON.parse(event.data);
      setMessages([message, ...messages]);
    };

    if (ws) {
      ws.addEventListener("message", handleReceive);
    }
    return () => {
      if (ws) {
        ws.removeEventListener("message", handleReceive);
      }
    };
  }, [messages]);

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messagesToSend => {
          const message = messagesToSend[0];
          ws.send(JSON.stringify(message));
          setMessages([message, ...messages]);
        }}
        user={user}
      />
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === "android"}
      />
    </>
  );
};

export default Screen;