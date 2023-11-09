import Phaser from "phaser";
import { ScratchScene } from "./scenes/ScratchScene";

export function phaser(params) {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: "#87ceeb",
    scene: ScratchScene,
    ...params,
  });

  return game;
}
