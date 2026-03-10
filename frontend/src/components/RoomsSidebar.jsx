import { useEffect, useState } from "react";
import axios from "axios";

function RoomsSidebar({ selectRoom }) {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/api/rooms")
      .then(res => setRooms(res.data));

  }, []);

  return (

    <div style={{
      width: "200px",
      background: "#8b8f99",
      color: "white",
      height: "100vh",
      padding: "20px"
    }}>

      <h3>Rooms</h3>

      {rooms.map((room, i) => (
        <p
          key={i}
          style={{
            cursor: "pointer",
            marginTop: "10px"
          }}
          onClick={() => selectRoom(room)}
        >
          {room}
        </p>
      ))}

    </div>

  );
}

export default RoomsSidebar;