import {Direction} from '../types'
import {Actions} from '../core'

export type SkateboardAction =
  | Direction
  | 'space'
  | 's'
  | 'q'
  | 'e'
  | 'a'
  | 'd'
  | 'z'
  | 'c'
  | 'x'
  | 'g'
  | 'f'
  | 'b'

export class SkateboardActions extends Actions<SkateboardAction> {
  state = {
    up: false,
    right: false,
    down: false,
    left: false,
    space: false,
    s: false,
    q: false,
    e: false,
    a: false,
    d: false,
    z: false,
    c: false,
    x: false,
    g: false,
    f: false,
    b: false,
  }
}
