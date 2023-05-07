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
      backgroundColor: 0x000000,
      scene: [TrainScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
        width: window.innerWidth, // Set the width to the window.innerWidth
        height: window.innerHeight, // Set the height to the window.innerHeight
      },
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, [width, height]);

  return <div id="train-station" />;
};
