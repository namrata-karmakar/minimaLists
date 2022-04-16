const request = require("supertest");
const { Database } = require("../../src/database");
const { app } = require("../../src/app");

describe(`Status Test Suite`, () => {
  let jwtToken, userID;
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

  it(`must not create a To Do item if status is blank and return status 400`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "",
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

  it(`must create a To Do item if status is "Done" and return status 201`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const { status } = response;
    expect(status).toBe(201);
    done();
  });

  it(`must create a To Do item if status is "Done" and return todo item`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "Done",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const objectFromDB = response.body.ops[0];
    delete objectFromDB._id;
    objectFromDB.createdOn = new Date(objectFromDB.createdOn);
    expect(objectFromDB).toEqual(requestBody);
    done();
  });

  it(`must create a To Do item if status is "In Progress" and return status 201`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "In Progress",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const { status } = response;
    expect(status).toBe(201);
    done();
  });

  it(`must create a To Do item if status is "In Progress" and return todo item`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "In Progress",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const objectFromDB = response.body.ops[0];
    delete objectFromDB._id;
    objectFromDB.createdOn = new Date(objectFromDB.createdOn);
    expect(objectFromDB).toEqual(requestBody);
    done();
  });

  it(`must create a To Do item if status is "Not Started" and return status 201`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "Not Started",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const { status } = response;
    expect(status).toBe(201);
    done();
  });

  it(`must create a To Do item if status is "Not Started" and return todo item`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "Not Started",
      userID,
      createdOn: new Date(),
    };
    const response = await request(app)
      .post("/api/todo")
      .set({ "x-token-header": jwtToken })
      .send(requestBody);
    const objectFromDB = response.body.ops[0];
    delete objectFromDB._id;
    objectFromDB.createdOn = new Date(objectFromDB.createdOn);
    expect(objectFromDB).toEqual(requestBody);
    done();
  });

  it(`must not create a To Do item if status is invalid and return status 400`, async (done) => {
    const requestBody = {
      todo: "Ride",
      status: "Completed",
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
});
