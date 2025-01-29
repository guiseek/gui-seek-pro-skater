import {SkateparkParts} from './skatepark-parts'
import {Body} from 'cannon-es'
import {Object3D} from 'three'
import {cannon} from '../utils'

export type SkateparkCollision = Record<keyof SkateparkParts, Body>

export class Skatepark {
  parts: SkateparkParts

  bodies: Body[] = []

  collision: SkateparkCollision

  constructor(readonly object: Object3D) {
    this.parts = new SkateparkParts(object)

    this.collision = {
      ground: new Body({mass: 0}),
      obs1: new Body({mass: 0}),
      obs2: new Body({mass: 0}),
      quarter1: new Body({mass: 0}),
      quarter2: new Body({mass: 0}),
      mainBlock1: new Body({mass: 0}),
      quarterBig: new Body({mass: 0}),
      banks1: new Body({mass: 0}),
      banks2: new Body({mass: 0}),
      banks3: new Body({mass: 0}),
      cWall: new Body({mass: 0}),
      bigLedge: new Body({mass: 0}),
      bigLedgeAngleIronLeft: new Body({mass: 0}),
      bigLedgeAngleIronRight: new Body({mass: 0}),
      outLedge: new Body({mass: 0}),
      outLedgeAngleIronLeft: new Body({mass: 0}),
      outLedgeAngleIronRight: new Body({mass: 0}),
      blockLedge: new Body({mass: 0}),
    }

    this.#prepareCollisionBody('ground')
    this.#prepareCollisionBody('mainBlock1')
    this.#prepareCollisionBody('cWall')
    this.#prepareCollisionBody('banks1')
    this.#prepareCollisionBody('banks2')
    this.#prepareCollisionBody('banks3')
    this.#prepareCollisionBody('obs1')
    this.#prepareCollisionBody('obs2')
    this.#prepareCollisionBody('bigLedge')
    this.#prepareCollisionBody('bigLedgeAngleIronLeft')
    this.#prepareCollisionBody('bigLedgeAngleIronRight')
    this.#prepareCollisionBody('outLedge')
    this.#prepareCollisionBody('outLedgeAngleIronLeft')
    this.#prepareCollisionBody('outLedgeAngleIronRight')
    this.#prepareCollisionBody('blockLedge')
    this.#prepareCollisionBody('quarter1')
    this.#prepareCollisionBody('quarter2')
    this.#prepareCollisionBody('quarterBig')
  }

  #prepareCollisionBody<K extends keyof SkateparkCollision>(key: K) {
    this.collision[key].position.set(
      this.parts[key].position.x,
      this.parts[key].position.y,
      this.parts[key].position.z
    )

    this.collision[key].quaternion.set(
      this.parts[key].quaternion.x,
      this.parts[key].quaternion.y,
      this.parts[key].quaternion.z,
      this.parts[key].quaternion.w
    )

    this.collision[key].addShape(
      cannon.factory.toTrimesh(this.parts[key].geometry)
    )

    this.bodies.push(this.collision[key])
  }
}
