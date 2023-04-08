import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-board3d',
  templateUrl: './board3d.component.html',
  styleUrls: ['./board3d.component.css']
})
export class Board3dComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input() public rotationSpeedX: number = 0.03;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  @Input() public texture: string = '/assets/cubeTexture2.jpg';

  @Input() public cameraZ: number = 400;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(2, 2, 2);
  private material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material); //, this.material

  private renderer!: THREE.WebGLRenderer;

  private sence!: THREE.Scene;

  constructor() { }

  ngAfterViewInit(): void {
    this.createScence();
    this.startRenderingLoop();
  }

  ngOnInit(): void {
    //this.createScence();
  }

  createScence() {
    this.sence = new THREE.Scene();
    this.sence.background = new THREE.Color(0xb0b0b0)
    this.sence.add(this.cube);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: Board3dComponent = this;
    (
      function render() {
        requestAnimationFrame(render);
        component.animateCube();
        component.renderer.render(component.sence, component.camera);
      }()
    );
  }

}
