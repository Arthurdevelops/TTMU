"use client";

import { useRef, useState, useEffect } from "react";
import { Playlist, populatePlaylist, Song } from "../utils/musicUtils";

interface AudioPlayerProps {
  volume: number;
}

export default function AudioPlayer({ volume }: AudioPlayerProps) {
  const chillHousePlaylist: Playlist = populatePlaylist();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [playlist] = useState<Playlist>(chillHousePlaylist);
  const [audio, setAudio] = useState<Song>(playlist?.getCurrentTrack());

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleEnded = () => {
      const nextTrack = playlist?.nextTrack();
      if (nextTrack) {
        setAudio(nextTrack);
        audioElement.src = nextTrack.url;
        audioElement.play().catch((error) => {
          console.error("Error playing next track:", error);
        });
      }
    };

    audioElement.addEventListener("ended", handleEnded);
    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [playlist]);

  function toggleAudio() {
    setAudioPlaying(!audioPlaying);
    const audioElement = audioRef.current;
    if (!audioElement) {
      console.error("Audio element is not available");
      return;
    }

    if (audioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button onClick={() => playlist?.nextTrack()}>Previous</button>
      <div className="flex flex-col">
        <audio
          ref={audioRef}
          src={audio.url}
          className="w-3/4"
          controls
          preload="auto"
        ></audio>
        <h2>{audio.title}</h2>
        <h3>by {audio.artist}</h3>
        <button onClick={toggleAudio}>{audioPlaying ? "Stop" : "Play"}</button>
      </div>
      <button>Next</button>
    </div>
  );
}
