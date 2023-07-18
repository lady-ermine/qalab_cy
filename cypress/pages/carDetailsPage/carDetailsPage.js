import { detailsElements } from "./carDetailsElements";
import { detailsSelectors } from "./carDetailsSelectors";

class CarDetailsPage {

    constructor() {
        this.selectors = detailsSelectors
        this.elements = detailsElements
    }

    checkHeader(text) {
        this.elements.getCardHeader().should('contain', text)
    }

    checkTitle(text) {
        this.elements.getCardTitle().should('have.text', text)
    }

    checkText(textArr) {
        this.elements.getCardTexts().each( (text, i) => {
            cy.wrap(text).should('have.text', textArr[i])
        })
    }

    clickRentBtn(destinationUrl) {
        this.elements.getRentBtn().should('be.visible').click().then(() => {
            cy.url().should('include', destinationUrl)
        })
    }
}

export const dp = new CarDetailsPage()