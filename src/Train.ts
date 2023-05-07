// Train.ts
import Phaser from 'phaser';

enum TrainState {
  Accelerating,
  Stopping,
  Stopped,
  Moving,
}

export class Train extends Phaser.GameObjects.Container {
  private speed: number;
  private maxSpeed: number;
  private totalWidth: number;
  private stoppingX: number;
  private trainState: TrainState;
  private rectangles: Phaser.GameObjects.Rectangle[] = [];
  public trackNumber: number;

  constructor(scene: Phaser.Scene, x: number, y: number, maxSpeed: number, trackNumber: number) {
    super(scene, x, y);

    this.trackNumber = trackNumber;
    // Store the provided maxSpeed value
    this.maxSpeed = maxSpeed;

    const numRectangles = Phaser.Math.Between(2, 8);
    const rectangleWidth = 60;
    const rectangleHeight = 30;

    for (let i = 0; i < numRectangles; i++) {
      const rectangle = scene.add.rectangle(i * (rectangleWidth + 2), -rectangleHeight / 2, rectangleWidth, rectangleHeight, 0x00ff00);
      this.add(rectangle);
      this.rectangles.push(rectangle);
    }

    this.speed = 0;
    this.trainState = TrainState.Accelerating;

    this.totalWidth = numRectangles * rectangleWidth + (numRectangles - 1) * 2;
    this.x = -this.totalWidth;

    this.stoppingX = Phaser.Math.Between(0, this.scene.scale.width);

    scene.add.existing(this);
  }

  public update(delta: number): void {
    switch (this.trainState) {
      case TrainState.Accelerating:
        this.speed = Math.min(this.speed + 0.1 * delta, this.maxSpeed); // Use this.maxSpeed instead of 150
        if (this.x >= this.stoppingX) { // Check if the train has reached the stopping position
          this.trainState = TrainState.Stopping;
        }
        break;
      case TrainState.Stopping:
        this.speed = Math.max(this.speed - 0.1 * delta, 0);
        if (this.speed === 0) {
          this.trainState = TrainState.Stopped;
          const stopTime = Phaser.Math.Between(5000, 12000);
          setTimeout(() => {
            this.trainState = TrainState.Moving;
          }, stopTime);
        }
        break;
      case TrainState.Stopped:
        this.speed = 0;
        break;
      case TrainState.Moving:
        this.speed = Math.min(this.speed + 0.1 * delta, this.maxSpeed); // Use this.maxSpeed instead of 150
        break;
    }

    this.x += this.speed * delta / 1000;
  }
}
