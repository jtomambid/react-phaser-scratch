/* eslint-disable no-undef */
import ScratchCard from "../../assets/scratch.png";
import coins from "../../assets/back-coin.png";

export class ScratchScene extends Phaser.Scene {
  constructor() {
    super("ScratchScene");
  }
  preload() {
    this.load.image("scratchCard", ScratchCard);
    this.load.image("coins", coins);
  }

  create() {
    const bg = this.add.image(400, 350, "scratchCard").setScale(0.25);

    const coins = [];

    // const maskGraphics = this.make.graphics();
    // coins.mask = maskGraphics.createGeometryMask();

    // Initialize a scratch area on top of the scratch card
    // const scratchArea = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    // maskGraphics.fillStyle(0x000000);
    // maskGraphics.fillRectShape(scratchArea);

    let isScratching = false;

    const underlay = [
      "Try Again",
      "Try Again",
      "Try Again",
      "Try Again",
      "Try Again",
      "Win",
      "Try Again",
      "Try Again",
      "Try Again",
    ];

    const result = [];

    const rt = this.make
      .renderTexture({
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        add: false,
      })
      .setOrigin(0.0);

    // this.brush = this.make.image({
    //   key: KEY_BRUSH,
    //   add: false,
    // });

    for (let i = 0; i < 9; i++) {
      // Create text as the underlying content
      const text = result.push(
        this.add.text(0, 0, underlay[i], {
          fontFamily: "Arial",
          fontSize: 20,
          color: "#ffffff",
          align: "center",
        })
      );

      coins.push(
        // Create interactive coins
        this.add.sprite(0, 0, "coins").setScale(0.185).setInteractive()
      );

      coins.mask = new Phaser.Display.Masks.BitmapMask(this, rt);
      coins.mask.invertAlpha = true;
    }
    Phaser.Actions.GridAlign(result, {
      width: 3,
      height: 3,
      cellWidth: 150,
      cellHeight: 150,
      x: 180,
      y: 270,
      position: Phaser.Display.Align.CENTER,
    });

    Phaser.Actions.GridAlign(coins, {
      width: 3,
      height: 3,
      cellWidth: 150,
      cellHeight: 150,
      x: -30,
      y: 60,
    });

    // coins.forEach((coin, index) => {
    //   coin.on("pointerdown", () => {
    //     coins[index].setVisible(false); // Hide the coin
    //     underlay[index] = ""; // Clear the text
    //   });
    // });

    // this.input.on("pointerdown", () => {
    //   isScratching = true;
    // });

    // this.input.on("pointerup", () => {
    //   isScratching = false;
    // });

    this.input.on(
      "pointermove",
      (pointer) => {
        if (pointer.isDown) {
          // Calculate the position of the pointer relative to the scratch card
          const posX = pointer.x - coins.x;
          const posY = pointer.y - coins.y;
          rt.draw(coins, posX, posY);
        }
      },
      this
    );

    // const reveal = this.add
    //   .grid(850, 250, 300, 300, 150, 150, 0x00b9f2)
    //   .setInteractive();

    // const cover = this.add.grid(850, 250, 300, 300, 150, 150, 0xb038d7);

    // Define your grid (2D array representing the game world)
    // const grid = [
    //   [1, 1, 1, 1],
    //   [1, 0, 0, 1],
    //   [1, 0, 1, 1],
    //   [1, 1, 1, 1],
    // ];

    // // Define grid cell size (e.g., 64x64 pixels)
    // const cellSize = 64;

    // // Handle input to move the character
    // this.input.on("pointerup", (pointer) => {
    //   const gridX = Math.floor(pointer.x / cellSize);
    //   const gridY = Math.floor(pointer.y / cellSize);

    //   if (grid[gridY][gridX] === 0) {
    //     // Valid move, update character's position
    //   }
    // });
  }
}
