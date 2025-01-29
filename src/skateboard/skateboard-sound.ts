import {PositionalAudio} from 'three'

export class SkateboardSound {
  constructor(
    readonly kick: PositionalAudio,
    readonly collision: PositionalAudio
  ) {}
}
