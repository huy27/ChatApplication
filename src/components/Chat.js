import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

const Chat = ({ user, messages, sendMessage }) => <div>

    <div className='chat'>
        <MessageContainer user={user} messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;
