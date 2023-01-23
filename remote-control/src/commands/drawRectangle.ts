import { Button, mouse, Point, straightTo } from "@nut-tree/nut-js";

export const drawRectangle = async (xPos: number, yPos?: number) => {
  const { x, y } = await mouse.getPosition();
  mouse.config.mouseSpeed = 1000;

  xPos = yPos ? xPos * 2 : xPos;
  yPos = yPos ? yPos : xPos;

  await mouse.pressButton(Button.LEFT);
  await mouse.drag(straightTo(new Point(x + xPos, y)));
  await mouse.drag(straightTo(new Point(x + xPos, y + yPos)));
  await mouse.drag(straightTo(new Point(x, y + yPos)));
  await mouse.drag(straightTo(new Point(x, y)));

  await mouse.releaseButton(Button.LEFT);
};
