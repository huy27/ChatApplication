import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/Chat';

function App() {
  const [connection, setConnection] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    setUser(user);
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://chat-server-huy.somee.com/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      })

      connection.on("UsersInRoom", users => {
        console.log("users", users);
        setUsers(users);
      })

      await connection.start();
      await connection.invoke("JoinRoom", { user, room })
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app">
      {!connection
        ? <Lobby joinRoom={joinRoom} />
        : <Chat user={user} users={users} messages={messages} sendMessage={sendMessage} />
      }
    </div>
  );
}

export default App;
