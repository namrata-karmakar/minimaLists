import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Signup Test Suite for terms and conditions`, ()=>{
    beforeAll(async ()=>{
        await new Database().dropDatabase();
    })

    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not take blank tnc and return status 400`, async done=>{
        const requestBodyWithFalseTNC = {
            "username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : ""
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWithFalseTNC)
        const {status} = response;
        expect(status).toBe(400)
        done();
    })

    it(`must not take the tnc and return status 400`, async done=>{
        const requestBodyWithFalseTNC = {
            "username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : false
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWithFalseTNC)
        const {status} = response;
        expect(status).toBe(400)
        done();
    })
})