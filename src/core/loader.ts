import {DRACOLoader, GLTFLoader, RGBELoader} from 'three/examples/jsm/Addons.js'
import {AudioLoader} from 'three'
import {create} from '../utils'

export class Loader {
  private static instance: Loader

  #gltf: GLTFLoader

  #rgbe: RGBELoader

  #audio: AudioLoader

  static getInstance() {
    if (!this.instance) {
      this.instance = new Loader()
    }

    return this.instance
  }

  private constructor() {
    this.#rgbe = new RGBELoader()
    this.#rgbe.setPath('envs/')

    this.#audio = new AudioLoader()
    this.#audio.setPath('sounds/')

    this.#gltf = new GLTFLoader()
    this.#gltf.setPath('models/')

    const draco = new DRACOLoader()
    draco.setDecoderPath('js/')

    this.#gltf.setDRACOLoader(draco)
  }

  loadGLTF(url: string) {
    const fn = this.#createProgress(url)
    return this.#gltf.loadAsync(url, fn)
  }

  loadAudio(url: string) {
    const fn = this.#createProgress(url)
    return this.#audio.loadAsync(url, fn)
  }

  loadEnv(url: string) {
    const fn = this.#createProgress(url)
    return this.#rgbe.loadAsync(url, fn)
  }

  #createProgress(url: string) {
    const text = new Text(url)

    const value = new Text(`0%`)

    const progress = create('progress', {max: 100, value: 0})

    const listItem = create('li', {}, value, progress, text)

    progressList.appendChild(listItem)

    return ({loaded, total}: ProgressEvent) => {
      const percent = Math.round((loaded / total) * 100)
      progress.value = percent
      value.textContent = `${percent}%`
      if (percent > 99) listItem.remove()
    }
  }
}
