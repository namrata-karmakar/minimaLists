import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Update Todo By ID Test Suite for JWT`, () => {
	let jwtToken, userID, todoRequestBody, id;
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
		const responseFromPostTodo = await request(app)
			.post("/api/todo")
			.set({ "x-token-header": jwtToken })
			.send(todoRequestBody);
		id = responseFromPostTodo.body.ops[0]._id;
	});

	afterAll(async () => {
		await new Database().dropDatabase();
	});

	it(`must not update ToDo when no token provided and return status 403`, async (done) => {
		const updateRequestBody = {
			todo: "Ride",
			status: "In Progress",
		};
		const response = await request(app)
			.put(`/api/todo/id/${id}`)
			.send(updateRequestBody);
		const { status } = response;
		expect(status).toBe(403);
		done();
	});

	it(`must not update ToDo when incorrect token provided and return status 403`, async (done) => {
		const jwt = 1;
		const updateRequestBody = {
			todo: "Ride",
			status: "In Progress",
		};
		const response = await request(app)
			.put(`/api/todo/id/${id}`)
			.set({ "x-token-header": jwt })
			.send(updateRequestBody);
		const { status } = response;
		expect(status).toBe(403);
		done();
	});

	it(`must update a To Do item when valid jwt is provided and return status 200`, async (done) => {
		const updateRequestBody = {
			todo: "Ride",
			status: "In Progress",
		};
		const response = await request(app)
			.put(`/api/todo/id/${id}`)
			.set({ "x-token-header": jwtToken })
			.send(updateRequestBody);
		const { status } = response;
		expect(status).toBe(200);
		done();
	});

	it(`must update a To Do item when valid jwt is provided and return nModified result 1`, async (done) => {
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
