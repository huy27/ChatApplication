import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import ConnectedUsers from './ConnectedUsers';

const Chat = ({ users, user, messages, sendMessage }) => {
    return (
        <div>
            <ConnectedUsers users={users} />
            <div className='chat'>
                <MessageContainer user={user} messages={messages} />

                <SendMessageForm sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;
