import request from "supertest";
import { app } from "../../src/app";
import { Database } from "../../src/database";

describe(`Get UserID from Username Test Suite for JWT`, () => {
  let username, jwtToken;
  beforeAll(async () => {
    await new Database().dropDatabase();

    const requestBody = {
      username: "falknor@gmail.com",
      password: "N$dnoq2jie",
      dob: "1992-03-01",
      tnc: true,
    };
    await request(app).post("/user/signUp").send(requestBody);
    username = requestBody.username;
    const { password } = requestBody;
    const responseFromLogin = await request(app)
      .post("/user/login")
      .send({ username, password });
    jwtToken = responseFromLogin.body.token;
  });

  afterAll(async () => {
    await new Database().dropDatabase();
  });

  it(`must not get userID when no token provided & return status 403`, async (done) => {
    const response = await request(app)
      .get(`/api/user/username/${username}`)
      .send();
    const { status } = response;
    expect(status).toBe(403);
    done();
  });

  it(`must not get userID when incorrect token provided and return status 403`, async (done) => {
    const jwt = 1;
    const response = await request(app)
      .get(`/api/user/username/${username}`)
      .set({ "x-token-header": jwt })
      .send();
    const { status } = response;
    expect(status).toBe(403);
    done();
  });

  it(`must get userID when valid token is provided and return status 200`, async (done) => {
    const response = await request(app)
      .get(`/api/user/username/${username}`)
      .set({ "x-token-header": jwtToken })
      .send();
    const { status } = response;
    expect(status).toBe(200);
    done();
  });
});
