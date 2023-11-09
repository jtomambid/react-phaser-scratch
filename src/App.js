import React, { useLayoutEffect, useRef, useCallback } from "react";
import Phaser from "phaser";
import { phaser } from "./animations/phaser";
import "./App.css";

function App() {
  const hasBooted = useRef(false);
  const gameRef = useRef(undefined);
  const animation = useCallback((game) => {
    gameRef.current = game;
  }, []);

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (hasBooted.current) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const game = phaser({ parent: containerRef.current });
    animation(game);

    hasBooted.current = true;
  }, [animation]);

  return (
    <div className="App">
      <div ref={containerRef} className="game-root" id="phaser-container"></div>
    </div>
  );
}

export default App;
