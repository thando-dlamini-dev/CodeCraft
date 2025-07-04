import React, { useEffect, useState } from "react";

const GridDisappearingEffect = () => {
  const rows = 12;
  const cols = 20;
  const totalSquares = rows * cols;

  const [visibleSquares, setVisibleSquares] = useState(
    Array(totalSquares).fill(true)
  );
  const [allHidden, setAllHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSquares((prev) => {
        const newSquares = [...prev];
        const randomIndex = Math.floor(Math.random() * totalSquares);

        if (newSquares[randomIndex]) {
          newSquares[randomIndex] = false;
        }

        if (newSquares.every((square) => !square)) {
          setAllHidden(true);
          clearInterval(interval);
        }

        return newSquares;
      });
    }, 0.01); // Adjust speed if needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-screen h-screen grid grid-cols-20 pointer-events-none grid-rows-12 gap-0 ${allHidden ? "hidden" : ""}`}>
      {visibleSquares.map((isVisible, index) => (
        <div
          key={index}
          className={`w-full h-full bg-orange-300 transition-all duration-300 ${isVisible ? "" : "invisible"}`}
        />
      ))}
    </div>
  );
};

export default GridDisappearingEffect;
