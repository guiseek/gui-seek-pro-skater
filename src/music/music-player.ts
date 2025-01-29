import {MusicPlaylist} from './music-playlist'

export class MusicPlayer {
  #audio: HTMLAudioElement

  get audio() {
    return this.#audio
  }

  get isPaused() {
    return this.#audio.paused
  }

  readonly playlist: MusicPlaylist

  constructor(items: string[]) {
    this.#audio = new Audio()

    this.playlist = new MusicPlaylist(items)
  }
}
