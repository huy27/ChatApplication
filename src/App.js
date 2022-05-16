import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/Chat';

function App() {
  const [connection, setConnection] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");

  const joinRoom = async (user, room) => {
    setUser(user);
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://803c-116-102-20-249.ngrok.io/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message}]);
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
        : <Chat user={user} messages={messages} sendMessage={sendMessage}/>
      }
    </div>
  );
}

export default App;
