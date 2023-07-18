import { rentalSelectors } from "./carRentalSelectors";

class CarRentalElements {

    getName() {
        return cy.get(rentalSelectors.NAME_INPUT)
    }

    getLastName() {
        return cy.get(rentalSelectors.LAST_NAME_INPUT)
    }

    getCardNo() {
        return cy.get(rentalSelectors.CARD_NO_INPUT)
    }

    getEmail() {
        return cy.get(rentalSelectors.EMAIL_INPUT)
    }

    getRentBtn() {
        return cy.get(rentalSelectors.RENT_BTN)
    }

    getAlert() {
        return cy.get(rentalSelectors.INCORRECT_DATA_ALERT)
    }

};

export const rentalElements = new CarRentalElements();