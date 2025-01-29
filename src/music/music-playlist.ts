export class MusicPlaylist {
  #current = 0

  get current() {
    return this.#current
  }

  get file() {
    return this.items[this.#current]
  }

  get path() {
    return `musics/${this.file}`
  }

  get name() {
    return this.file.replace(/.ogg/gi, '')
  }

  constructor(public items: string[]) {}

  next() {
    if (this.#current < this.items.length) {
      this.#current++
    } else {
      this.#current = 0
    }
  }

  prev() {
    if (this.#current > 1) {
      this.#current--
    } else {
      this.#current = this.items.length - 1
    }
  }
}
