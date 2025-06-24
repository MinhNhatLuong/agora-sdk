import { useState } from 'react'
import VideoCall from './components/VideoCall'
import Chat from './components/Chat'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <div className="app">
      <h1>Agora Video Chat</h1>
      
      {!inCall ? (
        <Controls setInCall={setInCall} setChannelName={setChannelName} />
      ) : (
        <div className="in-call-container">
          <VideoCall setInCall={setInCall} channelName={channelName} />
          <Chat channelName={channelName} />
        </div>
      )}
    </div>
  )
}

export default App
