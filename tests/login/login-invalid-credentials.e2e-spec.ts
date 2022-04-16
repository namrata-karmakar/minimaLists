import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Login Test Suite for Invalid Credentials`, ()=>{

    beforeAll(async () => {
        await new Database().dropDatabase();
        const requestBody = {"username" : "falknor123@gmail.com",
        "password" : "N$dnoq2jie",
        "dob" : "1992-03-01",
        "tnc" : true
        }
        await request(app).post('/user/signUp').send(requestBody);
    })
    
    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not login when credentials are invalid and return status 401`, async done=>{
        const requestBody = {
            "username" : "hello@gmail.com",
            "password" : "ASdiw2*nsd"
        }
        const response = await request(app).post('/user/login').send(requestBody);
        const { status } = response;
        expect(status).toBe(401);
        done();
    })

    it(`must login when dots are added to username and return status 202`, async done=>{
        const requestBody = {
            "username" : "falknor.123@gmail.com",
            "password" : "N$dnoq2jie"
        }
        const response = await request(app).post('/user/login').send(requestBody);
        const { status } = response;
        expect(status).toBe(202);
        done();
    })
})

