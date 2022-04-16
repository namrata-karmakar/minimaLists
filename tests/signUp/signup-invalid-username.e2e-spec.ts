import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Signup Test Suite for invalid username format`, ()=>{

    beforeAll(async ()=>{
        await new Database().dropDatabase();
    })

    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not create a user when username blank and return status 400`, async done=>{
        const requestBodyWithWrongEmail = {
            "username" : "",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWithWrongEmail)
        const { status } = response;
        expect(status).toBe(400)
        done();
    })

    it(`must not create a user when username invalid and return status 400`, async done=>{
        const requestBodyWithWrongEmail = {
            "username" : "falknorgmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWithWrongEmail)
        const { status } = response;
        expect(status).toBe(400)
        done();
    })
})
