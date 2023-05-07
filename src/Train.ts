// Train.ts
import Phaser from 'phaser';

enum TrainState {
  Accelerating,
  Stopping,
  Stopped,
  Moving,
}

export class Train extends Phaser.GameObjects.Rectangle {
  private speed: number;
  private state: TrainState;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x - 60, y, 100, 30, 0x00ff00);
    this.speed = 0;
    this.state = TrainState.Accelerating;
    this.setOrigin(0, 0.5); // Add this line to set the train's origin to the center of its height
    scene.add.existing(this);
  }

  public update(delta: number): void {
    switch (this.state) {
      case TrainState.Accelerating:
        this.speed = Math.min(this.speed + 0.1 * delta, 150);
        if (this.x >= this.scene.scale.width / 2 - 50) {
          this.state = TrainState.Stopping;
        }
        break;
      case TrainState.Stopping:
        this.speed = Math.max(this.speed - 0.1 * delta, 0);
        if (this.speed === 0) {
          this.state = TrainState.Stopped;
          const stopTime = Phaser.Math.Between(5000, 12000);
          setTimeout(() => {
            this.state = TrainState.Moving;
          }, stopTime);
        }
        break;
      case TrainState.Stopped:
        this.speed = 0;
        break;
      case TrainState.Moving:
        this.speed = Math.min(this.speed + 0.1 * delta, 150);
        break;
    }

    this.x += this.speed * delta / 1000;
  }
}
