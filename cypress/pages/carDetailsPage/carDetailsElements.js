import { detailsSelectors } from "./carDetailsSelectors";

class CarDetailsElements {

    getDetailsCard() {
        return cy.get(detailsSelectors.DETAILS_CARD)
    }

    getCardHeader() {
        return cy.get(detailsSelectors.CARD_HEADER)
    }

    getCardTitle() {
        return cy.get(detailsSelectors.CARD_TITLE)
    }

    getCardTexts() {
        return cy.get(detailsSelectors.CARD_TEXTS)
    }

    getCardDates() {
        return cy.get(detailsSelectors.CARD_DATES)
    }

    getRentBtn() {
        return cy.get(detailsSelectors.RENT_BTN)
    }

};

export const detailsElements = new CarDetailsElements();