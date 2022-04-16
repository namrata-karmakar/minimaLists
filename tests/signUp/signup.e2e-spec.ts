import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe('signUp e2e test suite', () => {

    beforeEach(async ()=>{
        await new Database().dropDatabase();
    })

    afterEach(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must be alive`, async done=>{
       const response = await request(app).get(`/isAlive`).send();
       const {status,} = response;
       expect(status).toBe(200)
       done();
    })

    it(`must create a user and return 201`, async done=>{
        const requestBody = {
            "username" : "nciqehqw@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp').send(requestBody)
        const { status } = response;
        expect(status).toBe(201)
        done();
    })

    it(`must create a user and return the original user`, async done=>{
        const requestBody = {
            "username" : "nciqehqw@gmail.com",
            "password" : "N$dnoq2jie",
            "dob" : "1992-03-01",
            "tnc" : true
        }
        const response = await request(app).post('/user/signUp')
        .send(requestBody)
        const objectFromDB = response.body.ops[0];
        delete objectFromDB._id;
        expect(objectFromDB).toEqual(requestBody)
        done();
    })
})

