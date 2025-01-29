import {Camera, Follower, Http, Loader, Renderer, StateActions} from './core'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Skatepark} from './skatepark'
import {World} from 'cannon-es'
import {noop} from './utils'
import {
  Skateboard,
  SkateboardSound,
  SkateboardTrick,
  SkateboardTrickConfig,
} from './skateboard'
import './style.scss'
import {
  Scene,
  Clock,
  AudioListener,
  DirectionalLight,
  PositionalAudio,
} from 'three'
import {Music} from './music'

let paused = false
// let started = false

const scene = new Scene()
const world = new World()

const clock = new Clock()

world.gravity.set(0, -9.82, 0)

const camera = new Camera()

const renderer = new Renderer(app)

const controls = new Follower(camera)

const actions = new StateActions()

const http = new Http()

const stats = new Stats()
stats.showPanel(0)

document.body.appendChild(stats.dom)

const dirLight = new DirectionalLight(0xf0fdd1, 1)

scene.add(dirLight)

const music = new Music()

const loader = Loader.getInstance()

let skateboard: Skateboard
let skatepark: Skatepark

const loadModels = (urls: string[]) => {
  return Promise.all(urls.map((url) => loader.loadGLTF(url)))
}
const loadAudios = (urls: string[]) => {
  return Promise.all(urls.map((url) => loader.loadAudio(url)))
}

const init = async () => {
  const model = await loadModels(['skatepark.glb', 'skateboard.glb'])

  skatepark = new Skatepark(model[0].scene)

  skatepark.bodies.forEach((body) => world.addBody(body))

  scene.add(skatepark.object)

  const buffer = await loadAudios(['kick.mp3', 'collision.mp3'])

  const listener = new AudioListener()

  const kick = new PositionalAudio(listener).setBuffer(buffer[0])
  const collision = new PositionalAudio(listener).setBuffer(buffer[1])
  const skateboardSound = new SkateboardSound(kick, collision)

  skateboard = new Skateboard(model[1].scene, skateboardSound)

  world.addBody(skateboard.collision)

  skateboard.raycast.addToWorld(world)

  scene.add(skateboard.object)

  skateboard.wheels.forEach((wheel) => {
    scene.add(wheel.object)
  })

  const tricks = await http.get<SkateboardTrickConfig[]>('data/tricks.json')

  tricks.forEach((trick) => {
    const {action, name, ...movement} = trick
    skateboard.addTrick(action, new SkateboardTrick(name, movement))
  })

  controls.setTarget(skateboard.object)

  start.remove()

  document.body.appendChild(music.dom.container)
  music.dom.play.click()

  animate()

  console.log('oi')

  actions.on('r', (state) => {
    if (state) skateboard.reset()
  })

  actions.on('p', (state) => {
    if (state) paused = !paused
  })

  clearEnter()
}

const clearEnter = actions.on('enter', (state) => (state ? init() : noop()))

// addEventListener('keydown', init)

const animate = () => {
  requestAnimationFrame(animate)

  stats.begin()

  if (paused) return

  const delta = clock.getDelta()

  world.step(1 / 60, delta, 3)

  skateboard.update(delta)

  controls.update(delta)

  // debug.update()

  renderer.render(scene, camera)

  stats.end()
}
