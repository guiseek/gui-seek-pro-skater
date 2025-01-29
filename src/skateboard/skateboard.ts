import {SkateboardAction, SkateboardActions} from './skateboard-actions'
import {Body, RaycastVehicle, Vec3} from 'cannon-es'
import {SkateboardSound} from './skateboard-sound'
import {SkateboardParts} from './skateboard-parts'
import {SkateboardTrick} from './skateboard-trick'
import {SkateboardWheel} from './skateboard-wheel'
import {Group, Mesh, Object3D} from 'three'
import {cannon, three} from '../utils'

export class Skateboard {
  parts: SkateboardParts

  collision: Body

  raycast: RaycastVehicle

  actions: SkateboardActions

  wheels: SkateboardWheel[] = []

  object: Group

  settings = {maxforce: 30, maxSteerVal: 0.2, brakeForce: 4}

  constructor(object: Object3D, readonly sound: SkateboardSound) {
    this.parts = new SkateboardParts(object)
    this.actions = new SkateboardActions()

    this.collision = new Body({mass: 20})

    this.raycast = new RaycastVehicle({
      chassisBody: this.collision,
      /* x */ indexRightAxis: 0,
      /* y */ indexUpAxis: 1,
      /* z */ indexForwardAxis: 2,
    })

    this.collision.position.set(
      this.parts.deckCollision.position.x,
      this.parts.deckCollision.position.y + 4,
      this.parts.deckCollision.position.z - 10
    )
    this.collision.quaternion.set(
      this.parts.deckCollision.quaternion.x,
      this.parts.deckCollision.quaternion.y,
      this.parts.deckCollision.quaternion.z,
      this.parts.deckCollision.quaternion.w
    )

    {
      /* Shape */
      const geometry = three.factory.toBoxGeometry(
        this.parts.deckCollision.geometry
      )
      const offset = new Vec3(
        this.parts.deckCollision.position.x,
        this.parts.deckCollision.position.y,
        this.parts.deckCollision.position.z
      )
      this.collision.addShape(cannon.factory.toBox(geometry), offset)
    }

    {
      /* Nose */
      const geometry = three.factory.toBoxGeometry(
        this.parts.deckNoseCollision.geometry
      )
      const offset = new Vec3(
        this.parts.deckNoseCollision.position.x,
        this.parts.deckNoseCollision.position.y,
        this.parts.deckNoseCollision.position.z
      )
      this.collision.addShape(cannon.factory.toBox(geometry), offset)
    }

    {
      /* Tail */
      const geometry = three.factory.toBoxGeometry(
        this.parts.deckTailCollision.geometry
      )
      const offset = new Vec3(
        this.parts.deckTailCollision.position.x,
        this.parts.deckTailCollision.position.y,
        this.parts.deckTailCollision.position.z
      )
      this.collision.addShape(cannon.factory.toBox(geometry), offset)
    }

    {
      /* Truck Front */
      const geometry = three.factory.toBoxGeometry(
        this.parts.truckFrontCollision.geometry
      )
      const offset = new Vec3(
        this.parts.truckFrontCollision.position.x,
        this.parts.truckFrontCollision.position.y,
        this.parts.truckFrontCollision.position.z
      )
      this.collision.addShape(cannon.factory.toBox(geometry), offset)
    }

    {
      /* Truck Back */
      const geometry = three.factory.toBoxGeometry(
        this.parts.truckBackCollision.geometry
      )
      const offset = new Vec3(
        this.parts.truckBackCollision.position.x,
        this.parts.truckBackCollision.position.y,
        this.parts.truckBackCollision.position.z
      )
      this.collision.addShape(cannon.factory.toBox(geometry), offset)
    }

    this.object = new Group()
    this.object.add(
      this.parts.deckParent,
      this.parts.truckFrontParent,
      this.parts.truckBackParent
    )

    this.#addWheel(
      this.parts.wheelFrontLeftCollision,
      this.parts.wheelFrontLeftParent
    )
    this.#addWheel(
      this.parts.wheelFrontRightCollision,
      this.parts.wheelFrontRightParent
    )
    this.#addWheel(
      this.parts.wheelBackLeftCollision,
      this.parts.wheelBackLeftParent
    )
    this.#addWheel(
      this.parts.wheelBackRightCollision,
      this.parts.wheelBackRightParent
    )

    this.collision.addEventListener('collide', this.#onCollide)

    this.#listen()
  }

  update(_delta: number) {
    this.object.position.copy(this.collision.position)
    this.object.quaternion.copy(this.collision.quaternion)

    for (let i = 0; i < this.raycast.wheelInfos.length; i++) {
      const wheel = this.raycast.wheelInfos[i]

      this.raycast.updateWheelTransform(i)

      const {position, quaternion} = this.wheels[i].object

      position.copy(wheel.worldTransform.position)
      quaternion.copy(wheel.worldTransform.quaternion)
    }
  }

  addTrick(action: SkateboardAction, trick: SkateboardTrick) {
    this.actions.on(action, (state) => {
      if (state) trick.execute(this)
    })
  }

  reset() {
    this.collision.velocity.set(0, 0, 0)
    this.collision.position.set(0, 22, -20)
    this.collision.quaternion.set(0, 0, 0, 1)
    this.collision.angularVelocity.set(0, 0, 0)

    this.raycast.wheelInfos.forEach((wheel) => {
      wheel.worldTransform.position.set(0, 0, 0)
      wheel.worldTransform.quaternion.set(0, 0, 0, 1)
    })

    this.object.position.copy(this.collision.position)
    this.object.quaternion.copy(this.collision.quaternion)

    this.raycast.wheelInfos.forEach((wheel, index) => {
      const {object} = this.wheels[index]
      object.position.copy(wheel.worldTransform.position)
      object.quaternion.copy(wheel.worldTransform.quaternion)
    })
  }

  #onCollide = () => {
    if (!this.sound.collision.isPlaying) {
      this.sound.collision.play()
    }
  }

  #listen() {
    this.actions.on('up', (state) => {
      if (state) {
        this.raycast.applyEngineForce(-this.settings.maxforce, 0)
        this.raycast.applyEngineForce(-this.settings.maxforce, 1)
        this.raycast.applyEngineForce(-this.settings.maxforce, 2)
        this.raycast.applyEngineForce(-this.settings.maxforce, 3)
        // this.sound.running.setVolume(0.4)
      } else {
        this.raycast.applyEngineForce(0, 0)
        this.raycast.applyEngineForce(0, 1)
        this.raycast.applyEngineForce(0, 2)
        this.raycast.applyEngineForce(0, 3)
      }
    })

    this.actions.on('down', (state) => {
      if (state) {
        this.raycast.applyEngineForce(this.settings.maxforce, 0)
        this.raycast.applyEngineForce(this.settings.maxforce, 1)
        this.raycast.applyEngineForce(this.settings.maxforce, 2)
        this.raycast.applyEngineForce(this.settings.maxforce, 3)
        // this.sound.running.setVolume(0.4)
      } else {
        this.raycast.applyEngineForce(0, 0)
        this.raycast.applyEngineForce(0, 1)
        this.raycast.applyEngineForce(0, 2)
        this.raycast.applyEngineForce(0, 3)
      }
    })

    this.actions.on('left', (state) => {
      if (state) {
        this.raycast.setSteeringValue(this.settings.maxSteerVal, 0)
        this.raycast.setSteeringValue(this.settings.maxSteerVal, 1)
      } else {
        this.raycast.setSteeringValue(0, 0)
        this.raycast.setSteeringValue(0, 1)
      }
    })

    this.actions.on('right', (state) => {
      if (state) {
        this.raycast.setSteeringValue(-this.settings.maxSteerVal, 0)
        this.raycast.setSteeringValue(-this.settings.maxSteerVal, 1)
      } else {
        this.raycast.setSteeringValue(0, 0)
        this.raycast.setSteeringValue(0, 1)
      }
    })

    this.actions.on('space', (state) => {
      if (state) {
        this.raycast.setBrake(this.settings.brakeForce, 0)
        this.raycast.setBrake(this.settings.brakeForce, 1)
        this.raycast.setBrake(this.settings.brakeForce, 2)
        this.raycast.setBrake(this.settings.brakeForce, 3)
        // this.sound.running.setVolume(0)
      } else {
        this.raycast.setBrake(0, 0)
        this.raycast.setBrake(0, 1)
        this.raycast.setBrake(0, 2)
        this.raycast.setBrake(0, 3)
      }
    })
  }

  #addWheel(collision: Mesh, object: Object3D) {
    const {radius} = three.utils.getBoundingSphere(collision.geometry)
    const wheel = new SkateboardWheel(radius, object)
    this.raycast.addWheel(wheel)
    this.wheels.push(wheel)
  }
}
