import { useState, useEffect, useRef } from 'react';
import AgoraRTM from 'agora-rtm-sdk';
import config from '../config';

const Chat = ({ channelName }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initRTM = async () => {
      // Khởi tạo client RTM
      const rtmClient = AgoraRTM.createInstance(config.appId);
      
      // ID ngẫu nhiên cho mỗi người dùng
      const uid = Math.floor(Math.random() * 10000).toString();
      
      try {
        // Login vào Agora RTM
        await rtmClient.login({ uid });
        
        // Tạo kênh với tên tương ứng
        const rtmChannel = rtmClient.createChannel(channelName);
        
        // Tham gia kênh
        await rtmChannel.join();

        // Bắt sự kiện khi có tin nhắn mới
        rtmChannel.on('ChannelMessage', (message, memberId) => {
          setMessages(prev => [
            ...prev, 
            { text: message.text, sender: memberId, time: new Date().toLocaleTimeString() }
          ]);
        });

        setClient(rtmClient);
        setChannel(rtmChannel);
      } catch (error) {
        console.log("Error initializing RTM:", error);
      }
    };

    initRTM();

    return () => {
      // Clean up
      if (channel) {
        channel.leave();
      }
      if (client) {
        client.logout();
      }
    };
  }, [channelName]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text.trim() === "" || !channel) return;

    try {
      // Gửi tin nhắn đến channel
      await channel.sendMessage({ text });
      
      // Thêm tin nhắn vào state để hiển thị
      setMessages(prev => [
        ...prev, 
        { text, sender: 'Tôi', time: new Date().toLocaleTimeString() }
      ]);
      
      // Xóa input sau khi gửi
      setText('');
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender === 'Tôi' ? 'sent' : 'received'}`}
          >
            <span className="message-sender">{message.sender}</span>
            <p>{message.text}</p>
            <span className="message-time">{message.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default Chat; 