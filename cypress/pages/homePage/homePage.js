import { homeElements } from "./homeElements";
import { homeSelectors } from "./homeSelectors";

class HomePage {

    constructor() {
        this.selectors = homeSelectors
        this.elements = homeElements
    }

    selectCountry(countryName) {
        this.elements.getCountry().select(countryName)
    }

    selectCity(cityName) {
        this.elements.getCity().select(cityName)
    }

    typeModel(value) {
        this.elements.getModel().type(value)
    }

    submitSearch() {
        this.elements.getSearchBtn().click()
    }

    searchData(data) {
        this.selectCountry(data.country)
        this.selectCity(data.city)
        this.typeModel(data.model)        
        cy.insertDate(this.selectors.PICKUP_DATE, data.pickup_date)
        cy.insertDate(this.selectors.DROPOFF_DATE, data.dropoff_date)
        this.submitSearch()
    }

    checkResultsTable(dataMatrix) {
        this.elements.getSearchResults().within(() => {
            cy.get('tr').each( (row, index) => {
                cy.log('index', index)
                if (index === 0) {
                    cy.get('th[scope="col"]').each( (columnHeader, i) => {
                        cy.wrap(columnHeader).should('have.text', dataMatrix[index][i])
                    })
                } else {
                    cy.wrap(row).within(() => {
                        cy.get('th[scope="row"]').should('have.text', dataMatrix[index][0])
                        cy.get('td').each( (value, i) => {
                            cy.wrap(value).should('have.text', dataMatrix[index][i + 1])
                        })
                    })                   
                }
            })
        })
    }

    clickRentButton(row, destUrl) {
        this.elements.getRentBtns().eq(row - 1).click().then(() => {
            cy.url().should('include', destUrl)
        })
    }

}

export const hp = new HomePage()