/// <reference types="Cypress" />
const dataJson = require('../../fixtures/bodyRequest')
describe('api test cases',() => {
    var payload = ""
    let accesstoken= '75b4c26e56c1cad8debbf8a8b5059e3c331bfe330e0920b8de2e05edd061430e'

    /**
     * Get all the user created for URL= https://gorest.co.in/public/v2/users
     */
    it('get user', () => {        
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer '+accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
        })
    })
 /**
  * Get a specific user 
  */
    it('get user by id', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users/3910',
            headers: {
                'authorization': 'Bearer '+accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq('Paola Lucero without space')
        })    
    })  
})