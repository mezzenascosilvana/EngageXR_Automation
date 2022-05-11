/// <reference types="Cypress" />
const dataJson = require('../../fixtures/createuser')

describe('post user request', () => {
    let accessToken = '75b4c26e56c1cad8debbf8a8b5059e3c331bfe330e0920b8de2e05edd061430e'
    let randomText = ""
    let testEmail = ""

    /**
     * Creatr User- Post Rest call
     * Using hard coded json payload in the script, randon eamil id in payload
     * and read a json from cypress fixture and use it in request body
     */
    it.only('create user test', () => {

        // generate random emails
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
                //2. get user (GET)
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users/' + userId,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('id', userId)
                    expect(res.body).has.property('name', payload.name)
                    expect(res.body).has.property('status', payload.status)
                    expect(res.body).has.property('email', testEmail)
                })
            })

        })
    })
})