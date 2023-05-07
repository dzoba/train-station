// TrainStation.tsx
import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { TrainScene } from './TrainScene';

export const TrainStation: React.FC = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      parent: 'train-station',
      scene: [TrainScene],
      backgroundColor: '#000000', // Optional: Set the background color to black
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, [width, height]);

  return <div id="train-station" />;
};
