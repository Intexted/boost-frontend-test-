// frontend/src/JoinRoom.js
import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";

const JoinRoom = () => {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socket = useRef(null);
  const localStream = useRef(null);
  const peerConnection = useRef(null);
  const iceServers = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    socket.current = io.connect("https://boost-backend-test.vercel.app:5000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        localStream.current = stream;
        socket.current.emit("join-room", roomId);
      });

    socket.current.on("user-connected", (userId) => {
      callUser(userId);
    });

    socket.current.on("offer", (offer, userId) => {
      handleOffer(offer, userId);
    });

    socket.current.on("answer", (answer) => {
      handleAnswer(answer);
    });

    socket.current.on("ice-candidate", (candidate) => {
      handleIceCandidate(candidate);
    });

    socket.current.on("user-disconnected", (userId) => {
      console.log(`User ${userId} disconnected`);
      // Handle user disconnection logic if needed
    });

    return () => {
      socket.current.disconnect();
    };
  }, [roomId]);

  const callUser = (userId) => {
    peerConnection.current = new RTCPeerConnection(iceServers);
    peerConnection.current.addStream(localStream.current);
    peerConnection.current.createOffer().then((offer) => {
      peerConnection.current.setLocalDescription(offer);
      socket.current.emit("offer", offer, roomId);
    });

    peerConnection.current.onaddstream = (event) => {
      remoteVideoRef.current.srcObject = event.stream;
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", event.candidate, roomId);
      }
    };
  };

  const handleOffer = (offer, userId) => {
    peerConnection.current = new RTCPeerConnection(iceServers);
    peerConnection.current.addStream(localStream.current);
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    peerConnection.current.createAnswer().then((answer) => {
      peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answer", answer, roomId);
    });

    peerConnection.current.onaddstream = (event) => {
      remoteVideoRef.current.srcObject = event.stream;
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", event.candidate, roomId);
      }
    };
  };

  const handleAnswer = (answer) => {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const handleIceCandidate = (candidate) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection.current.addIceCandidate(iceCandidate);
  };

  return (
    <div>
      <h1>Room: {roomId}</h1>
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
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <Avatar />
    </div>
  );
};

export default JoinRoom;
