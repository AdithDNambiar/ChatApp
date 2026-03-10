import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import RoomsSidebar from "../components/RoomsSidebar";

function MainLayout() {

  const [showRooms, setShowRooms] = useState(false);
  const navigate = useNavigate();

  const selectRoom = (room) => {
    navigate("/chat/" + room);
  };

  return (

    <div style={{
      display: "flex",
      height: "100vh"
    }}>

      {/* MAIN SIDEBAR */}
      <Sidebar toggleRooms={() => setShowRooms(!showRooms)} />

      {/* ROOMS SIDEBAR */}
      {showRooms && (
        <RoomsSidebar selectRoom={selectRoom} />
      )}

      {/* PAGE CONTENT */}
      <div style={{
        flex: 1,
        padding: "20px",
        background: "#f4f4f4",
        overflow: "auto"
      }}>
        <Outlet />
      </div>

    </div>

  );
}

export default MainLayout;