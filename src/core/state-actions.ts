import {Actions} from './actions'

export type StateAction = 'enter' | 'p' | 'r'

export class StateActions extends Actions<StateAction> {
  state = {
    enter: false,
    p: false,
    r: false,
  }
}
