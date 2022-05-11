/// <reference types="Cypress" />
const dataJson = require('../../fixtures/createuser')

describe('post user request', () => {
    let accessToken = '75b4c26e56c1cad8debbf8a8b5059e3c331bfe330e0920b8de2e05edd061430e'
    let randomText = ""
    let testEmail = ""


    it.only('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        
        cy.fixture('createuser').then((payload) => {
        //1. create user (POST)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                //"name": "API Cypress",
                // "gender": "male",
                // "email": "apiTesting30@gmail.com",
                // "status": "active"
                "name": payload.name,
                "gender": payload.gender,
                "email": testEmail,
                "status": payload.status
            }

        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('email', testEmail)
            expect(res.body).has.property('name', payload.name)
            expect(res.body).has.property('status', payload.status)
            expect(res.body).has.property('gender', payload.gender)
        }).then((res) => {
            const userId = res.body.id
            cy.log("user id is: " + userId)
            //2. update user (PUT)
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    //  "name": "API Cypress Updated2",
                    //  "gender": "male",
                    //  "email": "apiTesting3@gmail.com",
                    //  "status": "disable"
                    "name": payload.name + "   updated",
                    "gender": payload.gender,
                    "email": testEmail,
                    "status": payload.status
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).has.property('email', testEmail)
                expect(res.body).has.property('name', payload.name + "   updated")
                expect(res.body).has.property('status', payload.status)
                expect(res.body).has.property('gender', payload.gender)
            })
        })
    })
    })
})