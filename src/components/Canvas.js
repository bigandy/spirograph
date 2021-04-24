import { useEffect, useRef } from "react";

import useWindowSize from "../hooks/useWindowResize";

const circle = (ctx, x, y, size, color) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.strokeStyle = "transparent";
  ctx.fill();
  ctx.stroke();
};

const plotCircle = (ctx, j, multiplier, centreX, centreY, r, size) => {
  let angleDeg = j * multiplier; // degree in angle from top

  let radians = angleDeg * (Math.PI / 180);
  const pointY = centreY - Math.cos(radians) * r; // specific point y on the circle for the angle
  const pointX = centreX + Math.sin(radians) * r;

  const color = `hsla(${10 * j}, 100%, 50%, 0.9)`;
  //   const color = `hsl(317, 90%, 41%)`;

  circle(ctx, pointX, pointY, size, color);
};

const Canvas = () => {
  const canvasRef = useRef(null);
  const { height, width } = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (width && height) {
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      let j = 0,
        requestId;
      const centreX = ctx.canvas.width / 2; // centre x of circle
      const centreY = ctx.canvas.height / 2; // centre y of circle
      const r = ctx.canvas.width / 4; // radius
      const multiplier = Math.PI / 0.1;
      const render = () => {
        // plotCircle(ctx, j, multiplier, centreX, centreY, r, j % 3 ? 7 : 10);

        let angleDeg = j; // degree in angle from top

        let radians = angleDeg * (Math.PI / 180);
        const pointY = centreY - Math.cos(radians) * r; // specific point y on the circle for the angle
        const pointX = centreX + Math.sin(radians) * r;

        plotCircle(ctx, j, multiplier, pointY, pointX, r, j % 7 === 0 ? 3 : 10);

        j += 0.1;

        requestId = requestAnimationFrame(render);
      };
      render();
      return () => {
        cancelAnimationFrame(requestId);
      };
    }
  }, [width, height]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
