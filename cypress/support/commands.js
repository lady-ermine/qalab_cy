Cypress.Commands.add('countDate', (daysAhead) => {
    const date = new Date()
    date.setDate((date.getDate() + daysAhead))
    const dateString = date.toLocaleDateString('fr-CA')
    return cy.wrap(dateString)
})

Cypress.Commands.add('insertDate', (field, daysAhead) => {
    cy.countDate(daysAhead).then( dateValue => {
        cy.get(field).type(dateValue)
    })
})

Cypress.Commands.add('checkDropdownOptions', (selectId, optionsArr) => {
    cy.get(`${selectId} option`).should('have.length', optionsArr.length).each( (option, index) => {
        cy.wrap(option).should('have.text', optionsArr[index])
    })
})