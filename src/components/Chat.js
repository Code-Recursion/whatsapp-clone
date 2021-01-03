import React, { useState, useEffect } from "react";
import "../styles/chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import {useStateValue} from "./StateProvider";
import firebase from "firebase"

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("")
  const [message, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

        db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("typed msg >> ", input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      name:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      message:input,
    })

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/4.5/api/male/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen {new Date(
            message[message.length - 1]?.timestamp?.toDate()
          ).toUTCString()}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {message.map((message) => (
          <p className={`chat__message ${message.name === user.displayName && "chat__message"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message} <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placholder="Type a message"
          />

          <button type="submit" onClick={sendMessage}>
            send message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
