// TrainScene.ts
import Phaser from 'phaser';
import { Train } from './Train';
import { Track } from './Track';

export class TrainScene extends Phaser.Scene {
  private trains: Train[] = [];
  private tracks: Track[] = [];
  private tracksInUse: number[] = []; // Add this line

  constructor() {
    super('TrainScene');
  }

  public create(): void {
    // Create tracks
    const trackWidth = this.scale.width * 2;
    // const trackWidth = this.game.canvas.width;

    const trackCount = Math.floor(this.scale.height / (30 * 1.25));
    for (let i = 0; i < trackCount; i++) {
      const trackY = (this.scale.height / trackCount) * (i + 0.5);
      const track = new Track(this, 0, trackY, trackWidth, i);
      this.tracks.push(track);
    }

    const createTrain = () => {
      const availableTracks = this.tracks
        .map((_, index) => index)
        .filter((index) => !this.tracksInUse.includes(index));

      if (availableTracks.length === 0) {
        const nextTrainTime = Phaser.Math.Between(3000, 10000);
        setTimeout(createTrain, nextTrainTime);
        return;
      }

      const randomTrackIndex = Phaser.Math.Between(0, availableTracks.length - 1);
      const selectedTrackIndex = availableTracks[randomTrackIndex];
      const selectedTrack = this.tracks[selectedTrackIndex];

      this.tracksInUse.push(selectedTrackIndex);

      const maxSpeed = Math.floor(Math.random() * 201) + 50;
      const train = new Train(this, -50, selectedTrack.y + 15, maxSpeed, selectedTrack.trackNumber);
      this.trains.push(train);

      const nextTrainTime = Phaser.Math.Between(500, 2000);
      setTimeout(createTrain, nextTrainTime);
    };

    createTrain();

  }

  public update(_time: number, delta: number): void {
    this.trains.forEach((train) => {
      train.update(delta);
    });

    this.trains = this.trains.filter((train) => {
      const outOfView = train.x >= this.scale.width + 50;
      if (outOfView) {
        const trackIndex = this.tracks.findIndex((track) => track.trackNumber === train.trackNumber);
        console.log(' out of view trackIndex', trackIndex)
        this.tracksInUse = this.tracksInUse.filter((index) => index !== trackIndex);
        console.log('tracksInUse', this.tracksInUse)
      }
      return !outOfView;
    });
  }
}
