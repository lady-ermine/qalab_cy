import { rentalElements } from "./carRentalElements";
import { rentalSelectors } from "./carRentalSelectors";

class CarRentalPage {

    constructor() {
        this.selectors = rentalSelectors
        this.elements = rentalElements
    }

    enterName(nameStr) {
        this.elements.getName().clear().type(nameStr)
    }

    enterLastName(lastNameStr) {
        this.elements.getLastName().clear().type(lastNameStr)
    }

    enterCardNo(cardNo) {
        this.elements.getCardNo().clear().type(cardNo)
    }

    enterEmail(emailStr) {
        this.elements.getEmail().clear().type(emailStr)
    }

    clickRentBtn() {
        this.elements.getRentBtn().click()
    }

    checkAlert(expText) {
        this.elements.getAlert().should('have.text', expText)
    }
}

export const rp = new CarRentalPage()