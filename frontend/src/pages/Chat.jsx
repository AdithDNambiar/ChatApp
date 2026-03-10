
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";
import "../index.css";

function Chat() {

  const { room } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  const joined = useRef(false);
  const bottomRef = useRef(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {

    if (!joined.current) {
      socket.emit("join-room", { username, room });
      joined.current = true;
    }

    socket.on("previous-messages", (data) => {
      setMessages(data);
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
      socket.off("previous-messages");
    };

  }, [room, username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFile = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setFileData({
        fileUrl: res.data.filePath,
        fileName: res.data.fileName,
        fileType: file.type
      });

    } catch (err) {
      console.log(err);
    }

  };

  const startRecording = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm"
      });

      const file = new File([audioBlob], "voice-message.webm", {
        type: "audio/webm"
      });

      const formData = new FormData();
      formData.append("file", file);

      try {

        const res = await axios.post(
          "http://localhost:5000/api/upload",
          formData
        );

        socket.emit("send-message", {
          room,
          message: "",
          fileUrl: res.data.filePath,
          fileType: "audio/webm",
          fileName: res.data.fileName
        });

      } catch (err) {
        console.log(err);
      }

    };

    mediaRecorder.start();
    setRecording(true);

  };

  const stopRecording = () => {

    mediaRecorderRef.current.stop();
    setRecording(false);

  };

  const sendMessage = () => {

    if (!message && !fileData) return;

    socket.emit("send-message", {
      room,
      message,
      fileUrl: fileData?.fileUrl,
      fileType: fileData?.fileType,
      fileName: fileData?.fileName
    });

    setMessage("");
    setFileData(null);

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (

    <div className="chat-container">

      <h2 className="room-title">{room}</h2>

      <div className="messages-container">

        {messages.map((msg, index) => {

          if (msg.system) {
            return (
              <div key={index} className="system-message">
                {msg.message}
              </div>
            );
          }

          return (

            <div
              key={index}
              className={
                msg.sender === username
                  ? "message-row own"
                  : "message-row"
              }
            >

              <div className="message-bubble">

                <div className="sender">
                  {msg.sender}
                </div>

                <div className="text">
                  {msg.message}
                </div>

                {msg.fileUrl && (

                  <div className="file">

                    {msg.fileType?.startsWith("image") && (
                      <img
                        src={`http://localhost:5000${msg.fileUrl}`}
                        width="200"
                        alt=""
                      />
                    )}

                    {msg.fileType?.startsWith("video") && (
                      <video controls width="220">
                        <source src={`http://localhost:5000${msg.fileUrl}`} />
                      </video>
                    )}

                    {msg.fileType?.startsWith("audio") && (
                      <audio controls>
                        <source src={`http://localhost:5000${msg.fileUrl}`} />
                      </audio>
                    )}

                    {!msg.fileType?.startsWith("image") &&
                      !msg.fileType?.startsWith("video") &&
                      !msg.fileType?.startsWith("audio") && (
                        <a
                          href={`http://localhost:5000${msg.fileUrl}`}
                          download
                        >
                          {msg.fileName}
                        </a>
                      )}

                  </div>

                )}

              </div>

            </div>

          );

        })}

        <div ref={bottomRef}></div>

      </div>

      <div className="input-area">

  <div className="input-box">

    <input
      type="text"
      placeholder="Type message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyPress}
    />

    <div className="input-icons">

      <label className="icon-btn">
        🔗
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleFile}
        />
      </label>

      <button
        className="icon-btn"
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? "⏹" : "🎙️"}
      </button>

      <button
        className="send-btn"
        onClick={sendMessage}
      >
        ➤
      </button>

    </div>

  </div>

</div>
    </div>

  );

}

export default Chat;
