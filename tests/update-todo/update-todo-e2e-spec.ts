import request from 'supertest';
import { Database } from '../../src/database';
import { app } from '../../src/app';

describe(`Update Todo By ID Test Suite`, () => {
  let jwtToken, userID, todoRequestBody, id;
  beforeAll(async () => {
    await new Database().dropDatabase();

    const requestBody = {
      username: 'falknor@gmail.com',
      password: 'N$dnoq2jie',
      dob: '1992-03-01',
      tnc: true,
    };
    const responseFromSignUp = await request(app)
      .post('/user/signUp')
      .send(requestBody);
    userID = responseFromSignUp.body.ops[0]._id;

    const { username, password } = requestBody;
    const responseFromLogin = await request(app)
      .post('/user/login')
      .send({ username, password });
    jwtToken = responseFromLogin.body.token;

    todoRequestBody = {
      todo: 'Eat',
      status: 'Done',
      userID,
      createdOn: new Date(),
    };
    const responseFromPostTodo = await request(app)
      .post('/api/todo')
      .set({ 'x-token-header': jwtToken })
      .send(todoRequestBody);
    id = responseFromPostTodo.body.ops[0]._id;
  });

  afterAll(async () => {
    await new Database().dropDatabase();
  });

  it(`if todo is blank, must not update To Do item and return status 400`, async (done) => {
    const updateRequestBody = {
      todo: '',
      status: 'In Progress',
    };
    const response = await request(app)
      .put(`/api/todo/id/${id}`)
      .set({ 'x-token-header': jwtToken })
      .send(updateRequestBody);
    const { status } = response;
    expect(status).toBe(400);
    done();
  });

});