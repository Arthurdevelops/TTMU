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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
      setCurrentTime(0);
    };

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

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [playlist]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.src = audio.url;
    audioElement.load();

    if (audioPlaying) {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audio, audioPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const newTime = parseFloat(e.target.value);
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  function handleNextTrack(): void {
    const nextTrack = playlist?.nextTrack();
    if (nextTrack) {
      setAudio(nextTrack);
    }
  }

  function handlePreviousTrack(): void {
    const previousTrack = playlist?.previousTrack();
    if (previousTrack) {
      setAudio(previousTrack);
    }
  }

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
      <button
        onClick={handlePreviousTrack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Previous
      </button>
      <div className="flex flex-col items-center gap-2">
        <audio
          ref={audioRef}
          src={audio.url}
          className="hidden"
          preload="auto"
        ></audio>
        <h2>{audio.title}</h2>
        <h3>by {audio.artist}</h3>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm">{formatTime(duration)}</span>
        </div>
        <button
          onClick={toggleAudio}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {audioPlaying ? "Stop" : "Play"}
        </button>
      </div>
      <button
        onClick={handleNextTrack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
