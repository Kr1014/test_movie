const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/directors'

const director = {
    firstName: "Adam",
    lastName: "Kert",
    nationality: "Spain",
    image: "RANDOM",
    birthday: "08-22-1997"
}

let directorId

test("POST 'BASE_URL' returns a 201 status and res.body.name === director.firstName", async()=>{
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET/directors returns a 200 status", async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
})

test("PUT 'BASE_URL/:id' return a 200 status and res.body.firstName === directors.firstName", async()=>{
    const bodyUpdate = {
        firstName: "Lee",
        lastName: "Han",
        nationality: "USA",
        image: "random",
        birthday: "08-10-1987"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
})



test("DELETE 'BASE_URL/:id' return a 204 status", async()=>{
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})