import { Button, mouse, Point, straightTo } from "@nut-tree/nut-js";

export const drawCircle = async (px) => {
  const { x, y } = await mouse.getPosition();
  mouse.config.mouseSpeed = 5000;

  await mouse.move(
    straightTo(
      new Point(x + Number(px) * Math.cos(0), y + Number(px) * Math.sin(0))
    )
  );

  await mouse.pressButton(Button.LEFT);

  for (let i = 0; i <= Math.PI * 2; i += 0.1) {
    const xPos = x + Number(px) * Math.cos(i);
    const yPos = y + Number(px) * Math.sin(i);
    await mouse.drag(straightTo(new Point(xPos, yPos)));
  }

  await mouse.releaseButton(Button.LEFT);
};
