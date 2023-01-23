import { Button, mouse, Point, straightTo } from "@nut-tree/nut-js";

export const drawCircle = async (px: number) => {
  const { x, y } = await mouse.getPosition();
  mouse.config.mouseSpeed = 5000;

  await mouse.move(
    straightTo(new Point(x + px * Math.cos(0), y + px * Math.sin(0)))
  );

  await mouse.pressButton(Button.LEFT);

  for (let i = 0; i <= Math.PI * 2; i += 0.1) {
    const xPos = x + px * Math.cos(i);
    const yPos = y + px * Math.sin(i);
    await mouse.drag(straightTo(new Point(xPos, yPos)));
  }

  await mouse.releaseButton(Button.LEFT);
};
