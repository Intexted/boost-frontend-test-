// frontend/src/CreateRoom.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setRoomId(id);
    navigate(`/room/${id}`);
  };

  return (
    <div>
      <h1>Create Room</h1>
      <button onClick={handleCreateRoom}>Create Room</button>
      {roomId && (
        <div>
          <p>Share this link with guests:</p>
          <input
            type="text"
            value={`${window.location.origin}/room/${roomId}`}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
