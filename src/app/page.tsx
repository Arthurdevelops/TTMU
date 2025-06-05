import AudioPlayer from "./components/AudioPlayer";
import VideoCanva from "./components/VideoCanva";

export default function Home() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center gap-5 bg-slate-100">
      <h1 className="text-6xl font-bold">Turn The Music Up</h1>
      <VideoCanva />
      aduio player
      <AudioPlayer />
    </section>
  );
}
