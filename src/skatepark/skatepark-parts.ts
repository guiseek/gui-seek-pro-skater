import {Mesh, Object3D} from 'three'
import {Parts} from '../core'

export type SkateparkPart =
  | 'GROUND'
  | 'LOWRAIL'
  | 'DOWNRAIL'
  | 'CORNERRAIL'
  | 'RAIL_STRAIGHT'
  | 'OBS_1'
  | 'OBS_1_ANGLE_IRON'
  | 'OBS_2'
  | 'QUARTER_1'
  | 'QUARTER_2'
  | 'QUARTER_BIG'
  | 'MAIN_BLOCK_1'
  | 'C_WALL'
  | 'WALL_INSIDE'
  | 'WALL_FRONT'
  | 'BANKS_1'
  | 'BANKS_2'
  | 'BANKS_3'
  | 'BIG_LEDGE'
  | 'BIG_LEDGE_ANGLE_IRON_LEFT'
  | 'BIG_LEDGE_ANGLE_IRON_RIGHT'
  | 'OUTLEDGE'
  | 'OUTLEDGE_ANGLE_IRON_LEFT'
  | 'OUTLEDGE_ANGLE_IRON_RIGHT'
  | 'BLOCK_LEDGE'

export class SkateparkParts extends Parts<SkateparkPart> {
  ground: Mesh

  obs1: Mesh

  obs2: Mesh

  quarter1: Mesh

  quarter2: Mesh

  mainBlock1: Mesh

  banks1: Mesh

  banks2: Mesh

  banks3: Mesh

  cWall: Mesh

  // wallFront: Mesh

  // wallInside: Mesh

  quarterBig: Mesh

  bigLedge: Mesh
  bigLedgeAngleIronLeft: Mesh
  bigLedgeAngleIronRight: Mesh

  outLedge: Mesh
  outLedgeAngleIronLeft: Mesh
  outLedgeAngleIronRight: Mesh

  blockLedge: Mesh

  // lowRail: Mesh

  // downRail: Mesh

  // cornerRail: Mesh

  // railStraight: Mesh

  constructor(object: Object3D) {
    super(object)

    this.ground = this.getPart('GROUND')
    this.mainBlock1 = this.getPart('MAIN_BLOCK_1')
    this.cWall = this.getPart('C_WALL')
    // this.wallFront = this.getPart('WALL_FRONT')
    // this.wallInside = this.getPart('WALL_INSIDE')
    this.banks1 = this.getPart('BANKS_1')
    this.banks2 = this.getPart('BANKS_2')
    this.banks3 = this.getPart('BANKS_3')
    this.obs1 = this.getPart('OBS_1')
    this.obs2 = this.getPart('OBS_2')
    this.bigLedge = this.getPart('BIG_LEDGE')
    this.bigLedgeAngleIronLeft = this.getPart('BIG_LEDGE_ANGLE_IRON_LEFT')
    this.bigLedgeAngleIronRight = this.getPart('BIG_LEDGE_ANGLE_IRON_RIGHT')
    this.outLedge = this.getPart('OUTLEDGE')
    this.outLedgeAngleIronLeft = this.getPart('OUTLEDGE_ANGLE_IRON_LEFT')
    this.outLedgeAngleIronRight = this.getPart('OUTLEDGE_ANGLE_IRON_RIGHT')
    this.blockLedge = this.getPart('BLOCK_LEDGE')
    this.quarter1 = this.getPart('QUARTER_1')
    this.quarter2 = this.getPart('QUARTER_2')
    this.quarterBig = this.getPart('QUARTER_BIG')
    // this.lowRail = this.getPart('LOWRAIL')
    // this.downRail = this.getPart('DOWNRAIL')
    // this.cornerRail = this.getPart('CORNERRAIL')
    // this.railStraight = this.getPart('RAIL_STRAIGHT')
  }
}
