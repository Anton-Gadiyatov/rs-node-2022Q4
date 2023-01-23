import { mouse } from "@nut-tree/nut-js";
import { Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";

export const printScreen = async () => {
  const { x, y } = await mouse.getPosition();

  const screenShoot = await screen.grabRegion(
    new Region(Math.max(0, x - 100), Math.max(0, y - 100), 200, 200)
  );

  const jimp = new Jimp(300, 300);
  jimp.bitmap.data = screenShoot.data;

  const img = await jimp.getBufferAsync(Jimp.MIME_PNG);
  const base64 = img.toString("base64");

  return base64;
};
