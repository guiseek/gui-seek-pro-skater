import {Object3D} from 'three'

export abstract class Parts<T extends string = string> {
  constructor(protected object: Object3D) {}

  protected getPart<R>(name: T) {
    const part = this.object.getObjectByName(name)

    if (!part) {
      throw `Part ${name} does not found`
    }

    return part as R
  }
}
