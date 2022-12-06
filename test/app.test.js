
'use strict';

const request = require('supertest')
const app = require('../app.js') 
const express = require('express')

describe('Test the things service',()=>{
    // test('GET / succeeds',async ()=>{
    //     const res = await request(app).get('/');
    //     expect(res.statusCode).toBe(200)
    // })
    test('GET /inventions succeeds',()=>{
        return request(app)
        .get('/inventions')
        .expect(200)
    })
})



