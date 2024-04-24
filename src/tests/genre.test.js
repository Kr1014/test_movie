const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/genres'

const genre = {
   name : "Action"
}

let genreId

test("POST 'BASE_URL' returns a 201 status and res.body.name === genre.name", async()=>{
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(genre.name)
})

test("GET/genres returns a 200 status", async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
})

test("PUT 'BASE_URL/:id' return a 200 status and res.body.firstName === genres.name", async()=>{
    const bodyUpdate = {
        name: "Comedy"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

test("DELETE 'BASE_URL/:id' return a 204 status", async()=>{
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})