"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

interface HandResults {
  multiHandLandmarks: NormalizedLandmark[][];
  multiHandedness: Array<{
    label: string;
    score: number;
  }>;
}

interface HandsOptions {
  locateFile: (file: string) => string;
}

interface Hands {
  setOptions: (options: {
    maxNumHands: number;
    modelComplexity: number;
    minDetectionConfidence: number;
    minTrackingConfidence: number;
  }) => void;
  onResults: (callback: (results: HandResults) => void) => void;
  send: (options: { image: HTMLVideoElement }) => Promise<void>;
  close: () => void;
}

declare global {
  interface Window {
    Hands: new (options: HandsOptions) => Hands;
  }
}

export default function VideoCanva() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [distance, setDistance] = useState<number>(0);
  const handsRef = useRef<Hands | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const calculateDistance = (landmarks: NormalizedLandmark[]) => {
    // Index 4 est le pouce, Index 8 est l'index
    const thumb = landmarks[4];
    const index = landmarks[8];

    const dx = thumb.x - index.x;
    const dy = thumb.y - index.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Initialiser MediaPipe Hands
        handsRef.current = new window.Hands({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });

        handsRef.current.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        handsRef.current.onResults((results: HandResults) => {
          if (
            results.multiHandLandmarks &&
            results.multiHandLandmarks.length > 0
          ) {
            const landmarks = results.multiHandLandmarks[0];
            const newDistance = calculateDistance(landmarks);
            setDistance(newDistance);
          }
        });

        // Fonction pour traiter chaque frame
        const processFrame = async () => {
          if (videoRef.current && handsRef.current) {
            await handsRef.current.send({ image: videoRef.current });
          }
          animationFrameRef.current = requestAnimationFrame(processFrame);
        };

        // Démarrer le traitement des frames
        processFrame();
      }
      setIsOn(true);
    } catch (err) {
      console.error("Erreur d'accès à la webcam :", err);
    }
  }, []);

  useEffect(() => {
    // Charger le script MediaPipe Hands
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
    script.async = true;
    script.onload = startWebcam;
    document.body.appendChild(script);

    return () => {
      stopWebcam();
      document.body.removeChild(script);
    };
  }, [startWebcam]);

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (handsRef.current) {
      handsRef.current.close();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsOn(false);
    setDistance(0);
  };

  return (
    <div className="text-center p-4">
      <video
        ref={videoRef}
        width={640}
        height={480}
        className="rounded-md shadow-md"
        muted
      />
      <div className="mt-4">
        <p className="text-xl font-bold">Distance: {distance.toFixed(3)}</p>
        {isOn ? (
          <button onClick={stopWebcam}>Arrêter la webcam</button>
        ) : (
          <button onClick={startWebcam}>Démarrer la webcam</button>
        )}
      </div>
    </div>
  );
}
