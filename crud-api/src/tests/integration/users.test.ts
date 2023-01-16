import test from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";
import { validateUserId } from "../../utils/validateUser.js";

test("Users Integration Test Suite 1", async (t) => {
  const TEST_PORT = 9013;

  const { createServer } = await import("../../server/server.js");
  const server = createServer(TEST_PORT);

  const testServerAdress = `http://localhost:${TEST_PORT}/api/users`;

  const userData = {
    username: "Alex",
    age: 22,
    hobbies: ["swimming"],
  };

  const postRequest = await fetch(testServerAdress, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  const postResult = await postRequest.json();

  await t.test("it should create user", async (t) => {
    assert.deepStrictEqual(
      postRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(postRequest.status, 201);

    assert.strictEqual(postResult.username, userData.username);
    assert.strictEqual(postResult.age, userData.age);
    assert.deepStrictEqual(postResult.hobbies, userData.hobbies);
    assert.strictEqual(validateUserId(postResult.id), true);
  });

  await t.test("it should get user", async (t) => {
    const id = postResult.id;

    const request = await fetch(`${testServerAdress}/${id}`);

    assert.deepStrictEqual(
      request.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(request.status, 200);

    const result = await request.json();
    assert.strictEqual(result.username, postResult.username);
    assert.strictEqual(result.age, postResult.age);
    assert.deepStrictEqual(result.hobbies, postResult.hobbies);
    assert.strictEqual(result.id, postResult.id);
  });

  await t.test("it should delete user", async (t) => {
    const id = postResult.id;

    const deleteRequest = await fetch(`${testServerAdress}/${id}`, {
      method: "DELETE",
    });

    assert.deepStrictEqual(
      deleteRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(deleteRequest.status, 204);

    const getRequest = await fetch(testServerAdress);
    assert.deepStrictEqual(
      getRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(getRequest.status, 200);
    const result = await getRequest.json();
    assert.deepStrictEqual(result, []);
  });

  await promisify(server.close.bind(server))();
});

test("Users Integration Test Suite 2", async (t) => {
  const TEST_PORT = 9013;

  const { createServer } = await import("../../server/server.js");
  const server = createServer(TEST_PORT);

  const testServerAdress = `http://localhost:${TEST_PORT}/api/users`;

  const userData = {
    username: "Alex",
    hobbies: ["swimming"],
  };

  const postRequest = await fetch(testServerAdress, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  const postResult = await postRequest.json();

  await t.test("it should error message on wrong user data", async (t) => {
    assert.deepStrictEqual(
      postRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(postRequest.status, 400);

    assert.strictEqual(postResult.message, "User data is not valid");
  });

  await t.test("it should error message on wrong user id", async (t) => {
    const id = "asdas-zxczxc";

    const request = await fetch(`${testServerAdress}/${id}`);

    assert.deepStrictEqual(
      request.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(request.status, 400);

    const result = await request.json();
    assert.strictEqual(result.message, "userId is not a valid uuid");
  });

  await t.test(
    "it should error message on delete user with wrong id",
    async (t) => {
      const id = "123e4567-e89b-12d3-a456-426614174000";

      const deleteRequest = await fetch(`${testServerAdress}/${id}`, {
        method: "DELETE",
      });

      assert.deepStrictEqual(
        deleteRequest.headers.get("Content-Type"),
        "application/json"
      );

      assert.strictEqual(deleteRequest.status, 404);

      const result = await deleteRequest.json();
      assert.strictEqual(result.message, `user with id: ${id} doesn't exist`);
    }
  );

  await promisify(server.close.bind(server))();
});

test("Users Integration Test Suite 1", async (t) => {
  const TEST_PORT = 9013;

  const { createServer } = await import("../../server/server.js");
  const server = createServer(TEST_PORT);

  const testServerAdress = `http://localhost:${TEST_PORT}/api/users`;

  const userData = {
    username: "Alex",
    age: 22,
    hobbies: ["swimming"],
  };

  await t.test("it should get users", async (t) => {
    const getRequest = await fetch(testServerAdress);
    assert.deepStrictEqual(
      getRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(getRequest.status, 200);
    const result = await getRequest.json();
    assert.deepStrictEqual(result, []);

    const failGetRequest = await fetch(`${testServerAdress}/asdasdasd`);
    assert.deepStrictEqual(
      getRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(failGetRequest.status, 404);
    const failResult = await getRequest.json();
    assert.deepStrictEqual(
      failResult.message,
      "You tried to access not existing route"
    );
  });

  const postRequest1 = await fetch(testServerAdress, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  const postResult1 = await postRequest1.json();

  const postRequest2 = await fetch(testServerAdress, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  const postResult2 = await postRequest2.json();

  await t.test("it should put user", async (t) => {
    const id = postResult1.id;
    const newUserData = {
      username: "Lex",
      age: 25,
    };

    const request = await fetch(`${testServerAdress}/${id}`, {
      method: "PUT",
      body: JSON.stringify(newUserData),
    });

    assert.deepStrictEqual(
      request.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(request.status, 200);

    const result = await request.json();
    assert.strictEqual(result.username, newUserData.username);
    assert.strictEqual(result.age, newUserData.age);
    assert.deepStrictEqual(result.hobbies, postResult1.hobbies);
    assert.strictEqual(result.id, postResult1.id);
  });

  await t.test("it should delete user", async (t) => {
    const id = postResult2.id;

    const deleteRequest = await fetch(`${testServerAdress}/${id}`, {
      method: "DELETE",
    });

    assert.deepStrictEqual(
      deleteRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(deleteRequest.status, 204);

    const getRequest = await fetch(testServerAdress);
    assert.deepStrictEqual(
      getRequest.headers.get("Content-Type"),
      "application/json"
    );

    assert.strictEqual(getRequest.status, 200);
    const result = await getRequest.json();
    assert.strictEqual(result[0].id, postResult1.id);
  });

  await promisify(server.close.bind(server))();
});
