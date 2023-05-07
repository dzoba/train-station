// Track.ts
import Phaser from 'phaser';

export class Track extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, x: number, y: number, width: number) {
    super(scene, x, y, width, 1, 0xffff00);
    scene.add.existing(this);
  }
}
