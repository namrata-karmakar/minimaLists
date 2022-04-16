import request from "supertest"
import validator from 'validator'
import { Database } from '../../src/database'
import { app } from "../../src/app"
import { ObjectID } from "mongodb"

describe(`Login Test Suite`, ()=>{

    beforeAll(async () => {
        await new Database().dropDatabase();
        const requestBody = {"username" : "falknor@gmail.com",
        "password" : "N$dnoq2jie",
        "dob" : "1992-03-01",
        "tnc" : true
        }
        await request(app).post('/user/signUp').send(requestBody);
    })
    
    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must login and return status 202`, async done=>{
        const requestBody = {"username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie"
        }
        const response = await request(app).post('/user/login').send(requestBody)
        const {status} = response;
        expect(status).toBe(202)
        done();
    })

    it(`must login and return JWT`, async done=>{
        const requestBody = {"username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie"
        }
        const response = await request(app).post('/user/login').send(requestBody)
        const { body } = response;
        const { token } = body;
        expect(validator.isJWT(token)).toBeTruthy()
        done();
    })

    it(`must login and return userID in mongoDB ObjectID format`, async done=>{
        const requestBody = {"username" : "falknor@gmail.com",
            "password" : "N$dnoq2jie"
        }
        const response = await request(app).post('/user/login').send(requestBody)
        const { body } = response;
        const { userID } = body;
        expect(ObjectID.isValid(userID)).toBeTruthy()
        done();
    })

})






