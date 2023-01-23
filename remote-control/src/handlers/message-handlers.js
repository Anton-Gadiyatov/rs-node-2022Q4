import { mouse, left, right, up, down } from "@nut-tree/nut-js";

const moveMouse = async (direction, distantion) => {
  if (direction === "up") {
    await mouse.move(up(distantion));
  }
  if (direction === "right") {
    await mouse.move(right(distantion));
  }
  if (direction === "down") {
    await mouse.move(down(distantion));
  }
  if (direction === "left") {
    await mouse.move(left(distantion));
  }
};

export const messageHandlers = (message) => {
  if (message.startsWith("mouse_up")) {
    const distantion = Number(message.split(" ")[1]);
    moveMouse("up", distantion);
  }
  if (message.startsWith("mouse_down")) {
    const distantion = Number(message.split(" ")[1]);
    moveMouse("down", distantion);
  }
  if (message.startsWith("mouse_left")) {
    const distantion = Number(message.split(" ")[1]);
    moveMouse("left", distantion);
  }
  if (message.startsWith("mouse_right")) {
    const distantion = Number(message.split(" ")[1]);
    moveMouse("right", distantion);
  }
  return message;
};
