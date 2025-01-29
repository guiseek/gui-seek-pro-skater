import {Mesh, Object3D} from 'three'
import {Parts} from '../core'

export type SkateboardPart =
  | 'DeckParent'
  | 'DeckCollision'
  | 'DeckNoseCollision'
  | 'DeckTailCollision'
  | 'TruckFrontParent'
  | 'TruckFrontCollision'
  | 'TruckBackParent'
  | 'TruckBackCollision'
  | 'WheelFrontLeftParent'
  | 'WheelFrontLeftCollision'
  | 'WheelFrontRightParent'
  | 'WheelFrontRightCollision'
  | 'WheelBackLeftParent'
  | 'WheelBackLeftCollision'
  | 'WheelBackRightParent'
  | 'WheelBackRightCollision'

export class SkateboardParts extends Parts<SkateboardPart> {
  deckParent: Object3D

  deckCollision: Mesh
  deckNoseCollision: Mesh
  deckTailCollision: Mesh

  truckFrontParent: Object3D
  truckFrontCollision: Mesh
  truckBackParent: Object3D
  truckBackCollision: Mesh

  wheelFrontLeftCollision: Mesh
  wheelFrontLeftParent: Object3D
  wheelFrontRightCollision: Mesh
  wheelFrontRightParent: Object3D
  wheelBackLeftCollision: Mesh
  wheelBackLeftParent: Object3D
  wheelBackRightCollision: Mesh
  wheelBackRightParent: Object3D

  constructor(object: Object3D) {
    super(object)

    this.deckParent = this.getPart('DeckParent')
    this.deckCollision = this.getPart('DeckCollision')
    this.deckNoseCollision = this.getPart('DeckNoseCollision')
    this.deckTailCollision = this.getPart('DeckTailCollision')
    this.truckFrontParent = this.getPart('TruckFrontParent')
    this.truckFrontCollision = this.getPart('TruckFrontCollision')
    this.truckBackParent = this.getPart('TruckBackParent')
    this.truckBackCollision = this.getPart('TruckBackCollision')

    this.wheelFrontLeftCollision = this.getPart('WheelFrontLeftCollision')
    this.wheelFrontLeftParent = this.getPart('WheelFrontLeftParent')
    this.wheelFrontRightCollision = this.getPart('WheelFrontRightCollision')
    this.wheelFrontRightParent = this.getPart('WheelFrontRightParent')
    this.wheelBackLeftCollision = this.getPart('WheelBackLeftCollision')
    this.wheelBackLeftParent = this.getPart('WheelBackLeftParent')
    this.wheelBackRightCollision = this.getPart('WheelBackRightCollision')
    this.wheelBackRightParent = this.getPart('WheelBackRightParent')
  }
}
