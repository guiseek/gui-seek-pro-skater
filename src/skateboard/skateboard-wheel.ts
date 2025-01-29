import {Vec3, WheelInfo} from 'cannon-es'
import {cannon} from '../utils'
import {Object3D} from 'three'

export class SkateboardWheel extends WheelInfo {
  constructor(radius: number, public object: Object3D) {
    const chassisConnectionPointLocal = cannon.mapper
      .toVec3(object.position)
      .clone()

    chassisConnectionPointLocal.y = 0.92

    super({
      radius,
      chassisConnectionPointLocal,
      directionLocal: new Vec3(0, -1, 0),
      axleLocal: new Vec3(-1, 0, 0),
    })
  }
}
