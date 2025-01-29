import {create} from '../utils'
import {MusicPlayer} from './music-player'

export class Music {
  files = [
    `A Tribe Called Quest - Can I Kick It.ogg`,
    `Bad Religion - 21st Century.ogg`,
    `Jurassic 5 - Concrete Schoolyard.ogg`,
    `The Offspring - All I Want.ogg`,
    `Wu-Tang Clan - C.R.E.A.M..ogg`,
  ]

  player: MusicPlayer

  dom = {
    container: create('fieldset'),
    title: create('legend'),
    play: create('button', {textContent: 'Play'}),
    prev: create('button', {textContent: 'Anterior'}),
    next: create('button', {textContent: 'Próxima'}),
  }

  constructor() {
    this.player = new MusicPlayer(this.files)

    this.dom.container.append(
      this.dom.title,
      this.dom.prev,
      this.dom.play,
      this.dom.next
    )

    this.player.audio.addEventListener('play', () => {
      this.dom.title.textContent = this.player.playlist.name
    })

    this.player.audio.addEventListener('ended', this.#next)

    this.dom.play.addEventListener('click', () => {
      if (!this.player.audio.src) {
        this.player.audio.src = this.player.playlist.path
      }

      if (this.player.isPaused) {
        this.player.audio.play()
        this.dom.play.textContent = 'Pause'
      } else {
        this.player.audio.pause()
        this.dom.play.textContent = 'Play'
      }
    })

    this.dom.prev.addEventListener('click', this.#prev)

    this.dom.next.addEventListener('click', this.#next)
  }

  #prev = () => {
    this.player.playlist.prev()
    this.player.audio.src = this.player.playlist.path
    this.player.audio.play()
  }

  #next = () => {
    this.player.playlist.next()
    this.player.audio.src = this.player.playlist.path
    this.player.audio.play()
  }
}
