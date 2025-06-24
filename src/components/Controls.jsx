import { useState } from 'react';

const Controls = ({ setInCall, setChannelName }) => {
  const [channelInput, setChannelInput] = useState('');

  const startCall = (e) => {
    e.preventDefault();
    if (channelInput === '') return;
    setChannelName(channelInput);
    setInCall(true);
  };

  return (
    <form className="join-form" onSubmit={startCall}>
      <h2>Tham gia cuộc gọi video</h2>
      <input
        type="text"
        placeholder="Nhập tên phòng"
        value={channelInput}
        onChange={(e) => setChannelInput(e.target.value)}
      />
      <button type="submit">Tham gia</button>
    </form>
  );
};

export default Controls; 