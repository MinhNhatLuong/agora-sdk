import { useState, useEffect } from 'react';
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import config from '../config';

const useClient = createClient({ mode: "rtc", codec: "vp8" });
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = ({ setInCall, channelName }) => {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("Error joining channel:", error);
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      // Clean up
      tracks?.[0]?.close();
      tracks?.[1]?.close();
      client.leave();
      client.removeAllListeners();
      setUsers([]);
      setStart(false);
    };
  }, [channelName, client, ready, tracks]);

  return (
    <div className="video-container">
      {start && tracks && (
        <div className="local-video">
          <h2>Bạn</h2>
          <AgoraVideoPlayer 
            videoTrack={tracks[1]} 
            style={{ height: '300px', width: '400px' }} 
          />
        </div>
      )}
      {users.length > 0 && users.map((user) => {
        if (user.videoTrack) {
          return (
            <div className="remote-video" key={user.uid}>
              <h2>Người dùng khác</h2>
              <AgoraVideoPlayer
                videoTrack={user.videoTrack}
                style={{ height: '300px', width: '400px' }}
              />
            </div>
          );
        } else return null;
      })}
      <div className="controls">
        <button onClick={() => setInCall(false)}>Kết thúc cuộc gọi</button>
      </div>
    </div>
  );
};

export default VideoCall; 