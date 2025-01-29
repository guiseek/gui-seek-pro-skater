import {
  Box,
  Vec3,
  Trimesh,
  Cylinder,
  Quaternion,
  ConvexPolyhedron,
} from 'cannon-es'
import {
  Box3,
  Mesh,
  Vector3,
  Vector3Like,
  BoxGeometry,
  PlaneGeometry,
  BufferGeometry,
  QuaternionLike,
  CylinderGeometry,
} from 'three'

const toVec3 = (v: Vector3Like) => {
  return new Vec3(v.x, v.y, v.z)
}

const toQuat = (q: QuaternionLike) => {
  return new Quaternion(q.x, q.y, q.z, q.w)
}

const toBox = (geometry: BoxGeometry | PlaneGeometry) => {
  const box = new Box3().setFromObject(new Mesh(geometry))
  const size = box.getSize(new Vector3())
  return new Box(new Vec3(size.x / 2, size.y / 3, size.z / 2))
}

const toCylinder = (geometry: CylinderGeometry, numSegments = 16) => {
  const box = new Box3().setFromObject(new Mesh(geometry))
  const size = box.getSize(new Vector3())
  const radius = Math.max(size.x, size.y) / 2
  const height = size.y

  return new Cylinder(radius, radius, height, numSegments)
}

const toTrimesh = (geometry: BufferGeometry) => {
  if (!geometry.index) {
    throw `A geometria precisa de indices definidos`
  }

  const vertices = Array.from(geometry.attributes.position.array)
  const indices = Array.from(geometry.index.array)

  return new Trimesh(vertices, indices)
}

const toConvex = (geometry: BufferGeometry) => {
  if (!geometry.index) {
    throw `A geometria precisa de indices definidos`
  }

  const position = Array.from(geometry.attributes.position.array)

  const vertices: Vec3[] = []

  for (let i = 0; i < position.length; i += 3) {
    vertices.push(new Vec3(position[i], position[i + 1], position[i + 2]))
  }

  const index = geometry.index.array

  const faces = Array.from({length: index.length / 3}, (_, i) => {
    return [index[i * 3], index[i * 3 + 1], index[i * 3 + 2]]
  })

  return new ConvexPolyhedron({vertices, faces})
}

const mapper = {toVec3, toQuat}

const factory = {toBox, toCylinder, toTrimesh, toConvex}

export const cannon = {mapper, factory}
