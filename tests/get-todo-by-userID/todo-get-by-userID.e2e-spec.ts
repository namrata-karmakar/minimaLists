import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Get Todo by User ID Test Suite`, () => {
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
		const responseFromTodo = await request(app)
			.post("/api/todo")
			.set({ "x-token-header": jwtToken })
			.send(todoRequestBody);
	});

	afterAll(async () => {
		await new Database().dropDatabase();
	});

	it(`must not get ToDo when no userID provided and return status 404`, async (done) => {
		const response = await request(app)
			.get(`/api/todo/user/`)
			.set({ "x-token-header": jwtToken })
			.send();
		const { status } = response;
		expect(status).toBe(404);
		done();
	});

	it(`must not get ToDo when userID not in valid format and return status 400`, async (done) => {
		const incorrectUserID = "1";
		const response = await request(app)
			.get(`/api/todo/user/${incorrectUserID}`)
			.set({ "x-token-header": jwtToken })
			.send();
		const { status } = response;
		expect(status).toBe(400);
		done();
	});

	it(`must not get ToDo when userID is valid but not in DB and return status 400`, async (done) => {
		const incorrectUserID = "507f1f77bcf86cd799439011";
		const response = await request(app)
			.get(`/api/todo/user/${incorrectUserID}`)
			.set({ "x-token-header": jwtToken })
			.send();
		const { status } = response;
		expect(status).toBe(400);
		done();
	});

	it(`must get a To Do item when userID is valid and present in DB and return status 200`, async (done) => {
		const response = await request(app)
			.get(`/api/todo/user/${userID}`)
			.set({ "x-token-header": jwtToken })
			.send();
		const { status } = response;
		expect(status).toBe(200);
		done();
	});

	it(`must get a To Do item when userID is valid and present in DB and return ToDo item`, async (done) => {
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
