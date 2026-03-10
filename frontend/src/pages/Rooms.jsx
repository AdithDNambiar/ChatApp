import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const joinRoom = (room) => {
    navigate("/chat/" + room);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select a Room</h2>

      {rooms.map((room, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button onClick={() => joinRoom(room)}>
            Join {room}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Rooms;