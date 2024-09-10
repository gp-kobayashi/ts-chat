"use client"; 

import styles from "./page.module.css";
import io from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:5000")

export default function Home() {

  type Data ={
    message: string;
  }

  const [message, setMessage] = useState("");
  const [list, setList] = useState<Data[]>([]);

  const handleSendMessage = () =>{
    socket.emit("send_message",{message: message});
    setMessage("");
  };

  socket.on("received_message",(data: Data) =>{
    setList([...list, data]);
  });

  return (
    <div className={styles.container}>
      <h2>チャットアプリ</h2>
      <div className={styles.chatInputButton}>
        <input type="text"
        placeholder="チャット…"
        onChange={(e) => setMessage(e.target.value)}
        value={message}/>
        <button onClick={() => handleSendMessage()}>チャット送信</button>
      </div>
      {list.map((chat) =>(
        <div className={styles.chatArea} key={chat.message}>
          {chat.message}
        </div>
      ))}
    </div>
  );
}
