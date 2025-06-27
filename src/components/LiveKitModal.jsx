import { useState, useCallback } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import VoiceAssistant from "./VoiceAssistant";

const LiveKitModal = ({ setShowSupport }) => {
  const [isSubmittingName, setIsSubmittingName] = useState(true);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);

  const getToken = useCallback(async (userName) => {
  try {

    //const response = await fetch(`${import.meta.env.VITE_API_URL}/getToken?name=${userName}`);
    // Uncomment the line below to use the environment variable for API URL
    // Urls updated
    const response = await fetch('https://url-prefix-gqb6cccdewfjbxeq.australiasoutheast-01.azurewebsites.net/getToken?name=' + userName);

    const token = await response.text();
    setToken(token);
    setIsSubmittingName(false);
    } catch (error) {
     console.error(error);
    }
    }, []);

    const handleNameSubmit = (e) => {
    e.preventDefault();
        if (name.trim()) {
            getToken(name);
        }
    };

  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="support-room">
                {isSubmittingName ? (
                    <form onSubmit={handleNameSubmit} className="name-form">
                        <h2>Enter your name to begin</h2>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                        />      
                        <button type="submit">Connect</button>   
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setShowSupport(false)}>
                        Cancel</button>               
                    </form>
                ) : token ? (
                  <LiveKitRoom
                    serverUrl={"wss://cavaagent-8ar4xmei.livekit.cloud"}
                    token={token}
                    connect={true}
                    video={false}
                    audio={true}
                    onDisconnected={() => {
                        setShowSupport(false);
                        setIsSubmittingName(true);
                    }}
                  >
                    <RoomAudioRenderer />
                    <VoiceAssistant />
                  </LiveKitRoom>
                ) : null}
            </div>
        </div>
    </div>
  );
};

export default LiveKitModal;