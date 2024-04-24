const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/actors'

const actor = {
    firstName: "Adam",
    lastName: "Sandler",
    nationality: "USA",
    image: "RANDOM",
    birthday: "05-22-1977"
}

let actorId

test("POST 'BASE_URL' returns a 201 status and res.body.name === actor.name", async()=>{
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(actor.name)
})

test("GET/actors returns a 200 status", async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
})

test("PUT 'BASE_URL/:id' return a 200 status and res.body.firstName === actors.firstName", async()=>{
    const bodyUpdate = {
        firstName: "Adam",
        lastName: "Sandler",
        nationality: "USA",
        image: "random",
        birthday: "05-22-1977"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
})

test("DELETE 'BASE_URL/:id' return a 204 status", async()=>{
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})