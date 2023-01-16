import cluster from "node:cluster";
import os from "node:os";
// import * as dotenv from "dotenv";
// dotenv.config();

// const PORT = Number.isSafeInteger(Number(process.env.PORT))
//   ? Number(process.env.PORT)
//   : 5000;

if (cluster.isPrimary) {
  const cpusCount = os.cpus().length;
  for (let i = 0; i < cpusCount - 1; i++) {
    // const worker = cluster.fork({ PORT: PORT + i });
    const worker = cluster.fork();
    worker.on("exit", () => {
      cluster.fork();
    });
  }
} else {
  await import("./index.js");
}
