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

export function populatePlaylist(): Playlist {
  const adoreU = new Song(
    "Adore U",
    "Fred again..",
    "/audio/adore-u.mp3"
  );

  const oneMoreTime = new Song(
    "One More Time",
    "Daft Punk",
    "/audio/one-more-time.mp3"
  );

  const theLessIKnowTheBetter = new Song(
    "The Less I Know The Better",
    "Tame Impala",
    "/audio/the-less-i-know-the-better.mp3"
  );

  const chillHousePlaylist = new Playlist([
    adoreU,
    oneMoreTime,
    theLessIKnowTheBetter,
  ]);
  return chillHousePlaylist;
}
