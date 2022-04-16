import request from 'supertest'
import { Database } from '../../src/database'
import { app } from '../../src/app'

describe(`Signup Test Suite for date of birth`, ()=>{

    beforeAll(async ()=>{
        await new Database().dropDatabase();
    })

    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not take blank dob and return status 400`, async done=>{
        const requestBodyWrongDOB = {
            "username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWrongDOB);
        const { status } = response;
        expect(status).toBe(400);
        done();
    })

    it(`must not take the dob and return status 400`, async done=>{
        const requestBodyWrongDOB = {
            "username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "2009-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBodyWrongDOB);
        const { status } = response;
        expect(status).toBe(400);
        done();
    })
})