import { moveMouse } from "../commands/moveMouse.js";
import { getMousePosition } from "../commands/getMousePosition.js";

export const messageHandler = async (message) => {
  const [command, ...args] = message.split(" ");
  const x = Number(args[0]);
  const y = Number(args[1]);

  if (command === "mouse_up") {
    moveMouse("up", x);
  }
  if (command === "mouse_down") {
    moveMouse("down", x);
  }
  if (command === "mouse_left") {
    moveMouse("left", x);
  }
  if (command === "mouse_right") {
    moveMouse("right", x);
  }
  if (command === "mouse_position") {
    const { xPos, yPos } = await getMousePosition();
    return `${command} ${xPos},${yPos}`;
  }

  return message;
};
