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

  it(`must not update a To Do item if status is blank and return status 400`, async (done) => {
    const updateRequestBody = {
      todo: 'Ride',
      status: '',
    };
    const response = await request(app)
      .put(`/api/todo/id/${id}`)
      .set({ 'x-token-header': jwtToken })
      .send(updateRequestBody);
    const { status } = response;
    expect(status).toBe(400);
    done();
  });

  it(`must update a To Do item if status is invalid and return status 400`, async (done) => {
    const updateRequestBody = {
      todo: "Ride",
      status: "Completed"
    };
    const response = await request(app)
      .put(`/api/todo/id/${id}`)
      .set({ 'x-token-header': jwtToken })
      .send(updateRequestBody);
    const { status } = response;
    expect(status).toBe(400);
    done();
  });

  it(`must update a To Do item if status is "Done" and return status 200`, async (done) => {
    const updateRequestBody = {
      todo: 'Ride',
      status: 'Done',
    };
    const response = await request(app)
      .put(`/api/todo/id/${id}`)
      .set({ 'x-token-header': jwtToken })
      .send(updateRequestBody);
    const { status } = response;
    expect(status).toBe(200);
    done();
  });

  it(`must update a To Do item if status is "In Progress" and return status 200`, async (done) => {
    const updateRequestBody = {
      todo: 'Ride',
      status: 'In Progress',
    };
    const response = await request(app)
      .put(`/api/todo/id/${id}`)
      .set({ 'x-token-header': jwtToken })
      .send(updateRequestBody);
    const { status } = response;
    expect(status).toBe(200);
    done();
  });

  it(`must update a To Do item if status is "Not Started" and return status 200`, async (done) => {
    const updateRequestBody = {
      todo: 'Ride',
      status: 'Not Started',
    };
    const response = await request(app)
      .put(`/api/todo/id/${id}`)
      .set({ 'x-token-header': jwtToken })
      .send(updateRequestBody);
    const { status } = response;
    expect(status).toBe(200);
    done();
  });

  it(`must update a To Do item if status is "Done" and return nModified result 1`, async (done) => {
		const updateRequestBody = {
			todo: "Ride",
			status: "Done",
		};
		const response = await request(app)
			.put(`/api/todo/id/${id}`)
			.set({ "x-token-header": jwtToken })
			.send(updateRequestBody);
		const { body } = response;
		expect(body.result.nModified).toBe(1);
		done();
	});

  it(`must update a To Do item if status is "In Progress" and return nModified result 1`, async (done) => {
		const updateRequestBody = {
			todo: "Ride",
			status: "In Progress",
		};
		const response = await request(app)
			.put(`/api/todo/id/${id}`)
			.set({ "x-token-header": jwtToken })
			.send(updateRequestBody);
		const { body } = response;
		expect(body.result.nModified).toBe(1);
		done();
	});

  it(`must update a To Do item if status is "Not Started" and return nModified result 1`, async (done) => {
		const updateRequestBody = {
			todo: "Ride",
			status: "Not Started",
		};
		const response = await request(app)
			.put(`/api/todo/id/${id}`)
			.set({ "x-token-header": jwtToken })
			.send(updateRequestBody);
		const { body } = response;
		expect(body.result.nModified).toBe(1);
		done();
	});

});
