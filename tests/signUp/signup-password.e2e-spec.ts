import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Signup Test Suite for Password`, ()=>{

    beforeAll(async ()=>{
        await new Database().dropDatabase();
    })

    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not take blank password and return status 400`, async done=>{
        const requestBodyWrongPassword = {
            "username" : "falknor@gmail.com",
            "password" : "",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWrongPassword)
        const { status } = response;
        expect(status).toBe(400)
        done();
    })

    it(`must not take weak password and return status 400`, async done=>{
        const requestBodyWrongPassword = {
            "username" : "falknor@gmail.com",
            "password" : "ndnie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWrongPassword)
        const { status } = response;
        expect(status).toBe(400)
        done();
    })
})