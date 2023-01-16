const getPostData = (request): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk.toString();
      });

      request.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { getPostData };
