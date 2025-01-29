import { WebGLRenderer } from 'three';

export class Renderer extends WebGLRenderer {
  constructor(container: HTMLElement) {
    super({ antialias: true });
    this.setClearColor(0xffffff);
    this.setPixelRatio(devicePixelRatio);
    this.setSize(innerWidth, innerHeight);
    container.appendChild(this.domElement);
  }
}
