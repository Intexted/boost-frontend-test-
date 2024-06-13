// App.js
import React from "react";
import {
  SuperVizRoomProvider,
  VideoConference,
  MatterportIframe,
} from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";
import { v4 as uuidv4 } from "uuid";

const DEVELOPER_KEY = "eciw2amd5hj9x1ltltt3yzqw6wtp9l"; // Replace with your actual Developer Key
const groupId = sampleInfo.id;
const MATTERPORT_KEY = "q6d6c4irtct3gh355qa5bp8pa";
const groupName = sampleInfo.name;
const participant = Math.floor(Math.random() * 100);

function App() {
  const roomId = "jm5WwEA3HUN";
  const modelId = "jm5WwEA3HUN";

  const collaborationMode = {
    enabled: "true",
    position: "right",
    modalPosition: "right",
    initialView: "list",
  };

  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
      debug={true}
      group={{
        id: groupId,
        name: groupName,
      }}
      participant={{
        id: participant.toString(),
        name: "John " + participant,
      }}
      roomId={roomId}
    >
      <VideoConference
        participantType="host"
        collaborationMode={collaborationMode}
        defaultAvatars={true}
      />
      <section>
        <MatterportIframe
          width={window.innerWidth}
          height={window.innerHeight}
          bundleUrl={`/showcase-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
          matterportKey={MATTERPORT_KEY}
          isAvatarsEnabled={true}
          isLaserEnabled={true}
          avatarConfig={{
            height: 1.6,
            scale: 1,
            laserOrigin: {
              x: 0,
              y: 0,
              z: 0,
            },
          }}
        />
      </section>
    </SuperVizRoomProvider>
  );
}

export default App;
