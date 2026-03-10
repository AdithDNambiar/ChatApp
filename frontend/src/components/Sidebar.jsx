import { useNavigate } from "react-router-dom";

function Sidebar({ toggleRooms }) {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div style={{
      width: "200px",
      flexShrink:0,
      background: "#0b0f2b",
      color: "white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px"
    }}>

      {/* Top Section */}

      <div>

        <h2 style={{ marginBottom: "30px" }}>ChatApp</h2>

        <p
          style={{ cursor: "pointer", marginBottom: "15px" }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={toggleRooms}
        >
          Rooms
        </p>

      </div>

      {/* Bottom Section */}

      <div>

        <p style={{ marginBottom: "10px" }}>
          {user?.username}
        </p>

        <button
          onClick={logout}
          style={{
            background: "transparent",
            border: "none",
            color: "red",
            cursor: "pointer"
          }}
        >
          Disconnect & Logout
        </button>

      </div>

    </div>

  );
}

export default Sidebar;