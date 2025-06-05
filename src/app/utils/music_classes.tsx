export class Playlist {
  public tracks: Song[];
  private currentTrackIndex: number;

  constructor(tracks: Song[]) {
    this.tracks = tracks;
    this.currentTrackIndex = 0;
  }

  public getCurrentTrack(): Song {
    return this.tracks[this.currentTrackIndex];
  }

  public nextTrack(): Song {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    return this.getCurrentTrack();
  }

  public previousTrack(): Song {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    return this.getCurrentTrack();
  }

  public reset(): void {
    this.currentTrackIndex = 0;
  }
}

export class Song {
  public title: string;
  public artist: string;
  public url: string;

  constructor(title: string, artist: string, url: string) {
    this.title = title;
    this.artist = artist;
    this.url = url;
  }
}
