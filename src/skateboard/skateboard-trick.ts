import {SkateboardAction} from './skateboard-actions'
import {Skateboard} from './skateboard'
import {Vec3} from 'cannon-es'
import {Axis} from '../types'

export interface SkateboardMovement {
  readonly forces?: Axis[]
  readonly rotation?: Axis
}

export interface SkateboardTrickConfig extends SkateboardMovement {
  name: string
  action: SkateboardAction
}

export class SkateboardTrick {
  constructor(readonly name: string, private movement: SkateboardMovement) {}

  execute(skateboard: Skateboard) {
    if (skateboard.raycast.numWheelsOnGround) {
      skateboard.sound.kick.play()
    }

    const {rotation, forces} = this.movement

    if (rotation) {
      /* Local Angular Velocity => World Angular Velocity */
      const lav = this.#fromTrickAxis(rotation)
      const wav = skateboard.collision.quaternion.vmult(lav)
      skateboard.collision.angularVelocity.copy(wav)
    }

    if (forces) {
      forces.forEach((force) => {
        const vector = this.#fromTrickAxis(force)
        skateboard.collision.applyLocalImpulse(vector)
      })
    }
  }

  #fromTrickAxis({x, y, z}: Axis) {
    return new Vec3(x ?? 0, y ?? 0, z ?? 0)
  }
}
