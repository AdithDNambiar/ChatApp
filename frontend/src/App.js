import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Chat from "./pages/Chat";

import MainLayout from "./layout/MainLayout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/rooms" element={<Rooms />} />

          <Route path="/chat/:room" element={<Chat />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;