import {Object3D, Vector3} from 'three'
import {Camera} from './camera'

export class Follower {
  #camera: Camera
  #target?: Object3D

  #offset = {
    back: new Vector3(0, 2, -8),
    front: new Vector3(0, 4, 24),
  }

  setOffset(key: 'back' | 'front', x: number, y: number, z: number) {
    this.#offset[key].set(x, y, z)
  }

  #current = this.#offset.back

  #followSpeed = 0.1

  constructor(camera: Camera) {
    this.#camera = camera

    this.update()
  }

  setTarget(target: Object3D) {
    this.#target = target

    this.#camera.lookAt(target.position)
  }

  setView(view: 'front' | 'back') {
    this.#current = this.#offset[view]
  }

  toggle = () => {
    if (this.#current === this.#offset.back) {
      this.#current = this.#offset.front
    } else {
      this.#current = this.#offset.back
    }
  }

  update(_delta = 0) {
    if (!this.#target) return

    const targetPosition = new Vector3()
      .copy(this.#target.position)
      .add(this.#current.clone().applyQuaternion(this.#target.quaternion))

    this.#camera.position.lerp(targetPosition, this.#followSpeed)

    this.#camera.lookAt(this.#target.position)
  }
}
