// frontend/src/Avatar.js
import React, { useEffect } from "react";

const Avatar = () => {
  useEffect(() => {
    const iframe = document.getElementById("rpm-frame");
    iframe.onload = () => {
      iframe.contentWindow.postMessage(
        { type: "subscribe", target: "ready" },
        "*"
      );
    };

    window.addEventListener("message", (event) => {
      const { data } = event;
      if (data.type === "ready") {
        iframe.contentWindow.postMessage(
          { type: "load", url: "https://demo.readyplayer.me/avatar" },
          "*"
        );
      }
      if (data.type === "load") {
        console.log(`Avatar URL: ${data.url}`);
      }
    });
  }, []);

  return (
    <iframe
      id="rpm-frame"
      style={{
        width: "300px",
        height: "400px",
        border: "1px solid #ccc",
        position: "absolute",
        bottom: "10px",
        right: "10px",
      }}
      allow="camera *; microphone *"
      src="https://demo.readyplayer.me/avatar"
      title="Ready Player Me"
    />
  );
};

export default Avatar;
