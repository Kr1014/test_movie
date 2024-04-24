const request = require("supertest")
const app = require("../app")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
require("../models")

const BASE_URL = '/api/v1/movies'

const movie = {
        name : "Kung Fu Panda",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63Co08Xo67f1MDqM3-tlCh1j_4hUpo7Y4LuA2NXzN6z_mtfQ7",
        sinopsis : "When their owner Andy prepares to go to college, cowboy Woody, astronaut Buzz and the rest of their toy friends begin to worry about their uncertain future.",
        releaseYear: "2001"
}

let movieId

test("POST 'BASE_URL' returns a 201 status and res.body.name === movie.name", async()=>{
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(movie.name)
})

test("GET/movies returns a 200 status", async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
})

test("PUT 'BASE_URL/:id' return a 200 status and res.body.firstName === movies.firstName", async()=>{
    const bodyUpdate = {
        name : "Toy Story 3",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63Co08Xo67f1MDqM3-tlCh1j_4hUpo7Y4LuA2NXzN6z_mtfQ7",
        sinopsis : "When their owner Andy prepares to go to college, cowboy Woody, astronaut Buzz and the rest of their toy friends begin to worry about their uncertain future.",
        releaseYear: "2011"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})


test("Post -> URL_BASE/:id/actors, should return statusCode 200, and res.body.length === 1", async()=>{
    const actor = {
        firstName: "Tom",
        lastName: "Holland",
        nationality: "USA",
        image: "random",
        birthday: "05-22-1997"
    }
    const createActor = await Actor.create(actor)
    
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActor.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    
    expect(res.body[0].movieActors.actorId).toBe(createActor.id)
    expect(res.body[0].movieActors.movieId).toBe(movieId)
    
    await createActor.destroy()
})

test("Post -> URL_BASE/:id/directors, should return statusCode 200, and res.body.length === 1", async()=>{
   const director = {
        firstName: "Lee",
        lastName: "Unkrich",
        nationality: "United States",
        image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/252175_v9_bb.jpg",
        birthday: "1967-08-08T00:00:00.000Z"
   }
    const createDirector = await Director.create(director)
    
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirector.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    
    expect(res.body[0].movieDirectors.directorId).toBe(createDirector.id)
    expect(res.body[0].movieDirectors.movieId).toBe(movieId)
    
    await createDirector.destroy()
})

test("Post -> URL_BASE/:id/genres, should return statusCode 200, and res.body.length === 1", async()=>{
    const genre = {
        name : "Animation, adventure"
    }
     const createGenre = await Genre.create(genre)
     
     const res = await request(app)
     .post(`${BASE_URL}/${movieId}/genres`)
     .send([createGenre.id])
     
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.length).toBe(1)
     
     expect(res.body[0].movieGenres.genreId).toBe(createGenre.id)
     expect(res.body[0].movieGenres.movieId).toBe(movieId)
     
     await createGenre.destroy()
 })



test("DELETE 'BASE_URL/:id' return a 204 status", async()=>{
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})