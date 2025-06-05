"use client";

import { useRef, useState } from "react";
import { Playlist, Song } from "../utils/music_classes";
export default function AudioPlayer() {
  populatePlaylist();
  const chillHousePlaylist = new Playlist(["/audio/playlist/adore-u.mp3"]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<Song>("/audio/playlist/adore-u.mp3");
  const [playlist, setPlaylist] = useState<Playlist | null>(chillHousePlaylist);

  function toggleAudio() {
    setAudioPlaying(!audioPlaying);
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    } else {
      console.error("Audio element is not available");
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <button onClick={() => playlist?.nextTrack()}>Previous</button>
      <button>Next</button>
      <audio
        ref={audioRef}
        src={playlist?.tracks[0]}
        className="w-3/4"
        controls
        preload="auto"
      >
        Your browser does not support the audio element.
      </audio>
      <button onClick={toggleAudio}>{audioPlaying ? "Stop" : "Play"}</button>
    </div>
  );
}
function populatePlaylist() {
  const adoreU = new Song(
    "Adore U",
    "Fred again..",
    "/audio/playlist/adore-u.mp3"
  );
}
