// Track.ts
import Phaser from 'phaser';

export class Track extends Phaser.GameObjects.Rectangle {
  public trackNumber: number;
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, trackNumber: number) {
    super(scene, x, y, width, 1, 0xffff00);
    this.trackNumber = trackNumber;
    scene.add.existing(this);
  }
}
