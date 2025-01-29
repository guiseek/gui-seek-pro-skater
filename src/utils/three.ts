import {
  Ray,
  Camera,
  Vector3,
  Object3D,
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
} from 'three'

const toBoxGeometry = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `A geometria não possui vértices válidos para calcular o bounding box.`
  }

  const size = new Vector3()
  geometry.boundingBox.getSize(size)

  const center = new Vector3()
  geometry.boundingBox.getCenter(center)

  const boxGeometry = new BoxGeometry(size.x, size.y, size.z)

  boxGeometry.translate(center.x, center.y, center.z)

  return boxGeometry
}

const toCylinderGeometry = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `A geometria não possui vértices válidos para calcular o bounding box.`
  }

  const size = new Vector3()
  geometry.boundingBox.getSize(size)

  const radius = Math.max(size.x, size.z) / 2

  const height = size.y

  const cylinderGeometry = new CylinderGeometry(radius, radius, height, 32)

  const center = new Vector3()
  geometry.boundingBox.getCenter(center)

  cylinderGeometry.translate(center.x, center.y, center.z)

  return cylinderGeometry
}

const getBoundingSphere = (geometry: BufferGeometry) => {
  geometry.computeBoundingSphere()

  if (!geometry.boundingSphere) {
    throw `Bounding sphere is ${typeof geometry.boundingSphere}`
  }

  return geometry.boundingSphere
}

const getBoundingBox = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `Bounding sphere is ${typeof geometry.boundingBox}`
  }

  return geometry.boundingBox
}

const direct = (camera: Camera, object: Object3D) => {
  const vector = new Vector3(0, 0, 1)
  vector.unproject(camera)
  const ray = new Ray(object.position, vector.sub(object.position).normalize())
  return ray.direction
}

const utils = {getBoundingSphere, getBoundingBox, direct}

const factory = {toBoxGeometry, toCylinderGeometry}

export const three = {factory, utils}
