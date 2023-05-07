// TrainScene.ts
import Phaser from 'phaser';
import { Train } from './Train';

export class TrainScene extends Phaser.Scene {
  private trains: Train[] = [];

  constructor() {
    super('TrainScene');
  }

  public create(): void {
    setInterval(() => {
      const train = new Train(this, -50, this.scale.height / 2);
      this.trains.push(train);
    }, 10000);
  }

  public update(time: number, delta: number): void {
    this.trains.forEach((train) => {
      train.update(delta);
    });

    this.trains = this.trains.filter((train) => train.x < this.scale.width + 50);
  }
}
