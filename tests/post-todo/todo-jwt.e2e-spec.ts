import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`ToDo Test Suite for JWT`, () => {
  let jwtToken, userID, requestBody;

  beforeAll(async () => {
    await new Database().dropDatabase();
    const requestSignupBody = {
      username: "falknor@gmail.com",
      password: "N$dnoq2jie",
      dob: "1992-03-01",
      tnc: true,
    };
    const responseFromSignUp = await request(app)
      .post("/user/signUp")
      .send(requestSignupBody);
    userID = responseFromSignUp.body.ops[0]._id;
    const { username, password } = requestSignupBody;
    const response = await request(app)
      .post("/user/login")
      .send({ username, password });
    jwtToken = response.body.token;
    requestBody = {
      todo: "Ride",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
  });

  afterAll(async () => {
    await new Database().dropDatabase();
  });

  it(`must not create ToDo when no token provided and return status 403`, async (done) => {
    const response = await request(app).post("/api/todo").send(requestBody);
    const { status } = response;
    expect(status).toBe(403);
    done();
  });

  it(`must not create ToDo when incorrect token provided and return status 403`, async (done) => {
    const jwt = 1;
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwt })
      .send(requestBody);
    const { status } = response;
    expect(status).toBe(403);
    done();
  });

  it(`must create a ToDo when correct token provided and return status 201`, async (done) => {
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const { status } = response;
    expect(status).toBe(201);
    done();
  });
});
