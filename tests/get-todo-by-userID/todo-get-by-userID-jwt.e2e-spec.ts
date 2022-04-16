import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Get Todo By UserID Test Suite for JWT`, () => {
  let jwtToken, userID, todoRequestBody;
  beforeAll(async () => {
    await new Database().dropDatabase();

    const requestBody = {
      username: "falknor@gmail.com",
      password: "N$dnoq2jie",
      dob: "1992-03-01",
      tnc: true,
    };
    const responseFromSignUp = await request(app)
      .post("/user/signUp")
      .send(requestBody);
    userID = responseFromSignUp.body.ops[0]._id;

    const { username, password } = requestBody;
    const responseFromLogin = await request(app)
      .post("/user/login")
      .send({ username, password });
    jwtToken = responseFromLogin.body.token;

    todoRequestBody = {
      todo: "Eat",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
    await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(todoRequestBody);
  });

  afterAll(async () => {
    await new Database().dropDatabase();
  });

  it(`must not get ToDo when no token provided and return status 403`, async (done) => {
    const response = await request(app).get(`/api/todo/user/${userID}`).send();
    const { status } = response;
    expect(status).toBe(403);
    done();
  });

  it(`must not get ToDo when incorrect token provided and return status 403`, async (done) => {
    const jwt = 1;
    const response = await request(app)
      .get(`/api/todo/user/${userID}`)
      .set({ "x-token-header": jwt })
      .send();
    const { status } = response;
    expect(status).toBe(403);
    done();
  });

  it(`must get a To Do item when valid jwt is provided and return status 200`, async (done) => {
    const response = await request(app)
      .get(`/api/todo/user/${userID}`)
      .set({ "x-token-header": jwtToken })
      .send();
    const { status } = response;
    expect(status).toBe(200);
    done();
  });

  it(`must get a To Do item when valid jwt is provided and return same todo`, async (done) => {
    const response = await request(app)
      .get(`/api/todo/user/${userID}`)
      .set({ "x-token-header": jwtToken })
      .send();
    const { body } = response;
    const [todo] = body;
    delete todo._id;
    todo.createdOn = new Date(todo.createdOn);
    expect(todo).toEqual(todoRequestBody);
    done();
  });
});
