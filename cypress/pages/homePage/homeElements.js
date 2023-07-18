import { homeSelectors } from "./homeSelectors";

class HomeElements {

    getCountry() {
        return cy.get(homeSelectors.COUNTRY)
    }

    getCity() {
        return cy.get(homeSelectors.CITY)
    }

    getModel() {
        return cy.get(homeSelectors.MODEL)
    }

    getPickUpDate() {
        return cy.get(homeSelectors.PICKUP_DATE)
    }

    getDropOffDate() {
        return cy.get(homeSelectors.DROPOFF_DATE)
    }

    getSearchBtn() {
        return cy.get(homeSelectors.SEARCH_BTN)
    }

    getfillFormWarn() {
        return cy.get(homeSelectors.FILL_FORM_WARNING)
    }

    getSearchResults() {
        return cy.get(homeSelectors.SEARCH_RESULTS_TABLE)
    }

    getRentBtns(row) {
        return cy.get(homeSelectors.RENT_BUTTONS)
    }

};

export const homeElements = new HomeElements();