import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';

let socket;

const Chat = ({ location }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('qwerty');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  console.log('111name = ', name);

  useEffect(() => {

    const result = queryString.parse(location.search);
    const email = result.email;
    const Name = result.name;
    console.log('result = ', result);
    console.log('result.name = ', name);

    const room = result.room;
//    const { email, Name, room } = queryString.parse(location.search);

    console.log(location.search);
    console.log(email, Name, room);

    socket = io(ENDPOINT);

    console.log('222name = ', name);
    setEmail(email);
    setRoom(room);
    setName(Name);
//    setName(name);
    console.log('333name = ', name);

    socket.emit('join', { email, Name, room }, (error) => {

      console.log('name = ', name);
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {

    socket.on('message', message => {
      setId(message.userId);
      console.log('***massage= ', message);
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      console.log('***id = ', id);
      socket.emit('sendMessage', {id, message}, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
