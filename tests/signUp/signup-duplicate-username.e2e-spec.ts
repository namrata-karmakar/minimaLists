import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Signup Test Suite for Duplicate Username`, ()=>{

    beforeAll(async ()=>{ 
        const requestBody = {
            "username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        await new Database().dropDatabase();
        await request(app).post('/user/signUp').send(requestBody);
    })

    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not create a user with same username and return status 400`, async done=>{
        const requestBody = {
            "username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBody)
        const {status} = response;
        expect(status).toBe(400)
        done();
    })
})

