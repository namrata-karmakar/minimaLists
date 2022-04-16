import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Created On Test Suite`, ()=>{
    let jwtToken, userID;
    beforeAll(async () => {
        await new Database().dropDatabase();

        const requestBody = {"username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }

        const responseFromSignUp = await request(app).post('/user/signUp').send(requestBody)
        userID = responseFromSignUp.body.ops[0]._id;
        const {username, password} = requestBody
        const response = await request(app).post('/user/login').send({username, password})
        jwtToken = response.body.token;
    })
    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not create a To Do item if createdOn is blank and return status 400`, async done=>{
        const requestBody = {
            "todo" : "Ride",
            "status" : "Done",
            userID,
            "createdOn" : ""
        }
        const response = await request(app).post('/api/todo').set({'x-token-header': jwtToken}).send(requestBody)
        const {status} = response;
        expect(status).toBe(400)
        done();
    })

    it(`must not create a To Do item if createdOn format is invalid and return status 400`, async done=>{
        const requestBody = {
            "todo" : "Ride",
            "status" : "Done",
            userID,
            "createdOn" : "hello"
        }
        const response = await request(app).post('/api/todo').set({'x-token-header': jwtToken}).send(requestBody)
        const {status} = response;
        expect(status).toBe(400)
        done();
    })

    it(`must create a To Do item if createdOn format is valid and return status 201`, async done=>{
        const requestBody = {
            "todo" : "Ride",
            "status" : "Done",
            userID,
            "createdOn" : new Date()
        }
        const response = await request(app).post('/api/todo').set({'x-token-header': jwtToken}).send(requestBody)
        const {status} = response;
        expect(status).toBe(201)
        done();
    })

    it(`must create a To Do item if createdOn format is valid and return todo item`, async done=>{
        const requestBody = {
            "todo" : "Ride",
            "status" : "Done",
            userID,
            "createdOn" : new Date()
        }
        const response = await request(app).post('/api/todo').set({'x-token-header': jwtToken}).send(requestBody)
        const objectFromDB = response.body.ops[0];
        delete objectFromDB._id;
        objectFromDB.createdOn = new Date(objectFromDB.createdOn);
        expect(objectFromDB).toEqual(requestBody)
        done();
    })
    
})