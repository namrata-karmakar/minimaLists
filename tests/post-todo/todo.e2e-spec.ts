import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Todo Test Suite`, () => {
  let jwtToken: string, userID: string;

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
    const response = await request(app)
      .post("/user/login")
      .send({ username, password });
    jwtToken = response.body.token;
  });

  afterAll(async () => {
    await new Database().dropDatabase();
  });

  it(`if todo is blank, must not create a To Do item and return status 400`, async (done) => {
    const requestBody = {
      todo: "",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const { status } = response;
    expect(status).toBe(400);
    done();
  });

  it(`must create a To Do item when valid todo is provided and return status 201`, async (done) => {
    const requestBodyWithValidToDo = {
      todo: "Ride",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBodyWithValidToDo);
    const { status } = response;
    expect(status).toBe(201);
    done();
  });

  it(`must create a To Do item when valid todo is provided and return todo`, async (done) => {
    const requestBodyWithValidToDo = {
      todo: "Ride",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBodyWithValidToDo);
    const objectFromDB = response.body.ops[0];
    delete objectFromDB._id;
    objectFromDB.createdOn = new Date(objectFromDB.createdOn);
    expect(objectFromDB).toEqual(requestBodyWithValidToDo);
    done();
  });

});
