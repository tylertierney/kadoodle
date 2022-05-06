import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Peer from "peerjs";
import { useGame } from "./GameContext";

export interface StreamsIdentifier {
  [key: string]: MediaStream;
}

interface PeerContextType {
  peer: any;
  setPeer: Dispatch<SetStateAction<any>>;
  peerId: string;
  setPeerId: Dispatch<SetStateAction<string>>;
  userStream: MediaStream | null;
  setUserStream: (userStream: MediaStream | null) => void;
  streams: StreamsIdentifier;
  setStreams: Dispatch<SetStateAction<StreamsIdentifier>>;
}

const initial: PeerContextType = {
  peer: null,
  setPeer: () => {},
  peerId: "",
  setPeerId: () => {},
  userStream: null,
  setUserStream: () => {},
  streams: {} as StreamsIdentifier,
  setStreams: () => {},
};

export const PeerContext = createContext<PeerContextType>(initial);

const PeerProvider: React.FC = ({ children }) => {
  const [peer, setPeer] = useState<Peer>();
  const [peerId, setPeerId] = useState<string>("");
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const [streams, setStreams] = useState<StreamsIdentifier>({});
  const { players, currentPlayer } = useGame();

  useEffect(() => {
    const peerInstance = new Peer();
    peerInstance.on("open", (id: string) => {
      setPeerId(id);
    });
    setPeer(peerInstance);

    peerInstance.on("call", (call) => {
      if (userStream) {
        call.answer(userStream);
      } else {
        call.answer();
      }
      call.on("stream", (remoteStream: MediaStream) => {
        setStreams((streams) => {
          let streamObj = { ...streams };
          streamObj[call.peer] = remoteStream;
          return streamObj;
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!peer) return;
    if (!userStream) return;

    for (let player of players) {
      if (player.peerId !== peerId) {
        if (!player.peerId) return;
        const call = peer.call(player.peerId, userStream);
        call.on("stream", (remoteStream: MediaStream) => {
          setStreams((streams) => {
            let streamObj = { ...streams };
            streamObj[player.peerId] = remoteStream;
            return streamObj;
          });
        });
      }
    }
  }, [players.length, userStream]);

  const ctx: PeerContextType = {
    peer,
    setPeer,
    peerId,
    setPeerId,
    userStream,
    setUserStream,
    streams,
    setStreams,
  };

  return <PeerContext.Provider value={ctx}>{children}</PeerContext.Provider>;
};

export default PeerProvider;

export const usePeer = () => useContext(PeerContext);