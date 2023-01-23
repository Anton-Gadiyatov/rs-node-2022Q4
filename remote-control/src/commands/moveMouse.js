import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export const moveMouse = async (direction, px) => {
  if (direction === "up") {
    await mouse.move(up(px));
  }
  if (direction === "right") {
    await mouse.move(right(px));
  }
  if (direction === "down") {
    await mouse.move(down(px));
  }
  if (direction === "left") {
    await mouse.move(left(px));
  }
};
