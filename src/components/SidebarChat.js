import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../styles/sidebarChat.css";
import db from "../firebase";
import {Link} from "react-router-dom"

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if(id) {
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
          setMessages(snapshot.docs.map((doc) => 
          doc.data()))
      ))
    }
  },[])


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter Room Name");
    console.log(roomName);

    if (roomName) {
      // create a room in db
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to = {`/rooms/${id}`}><div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/4.5/api/male/${seed}.svg`} />
      <div className="sidebartChat__info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className="createChat">
      <h2>Create new chat</h2>
    </div>
  );
};

export default SidebarChat;
