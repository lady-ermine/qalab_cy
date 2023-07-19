import { dp } from "../pages/carDetailsPage/carDetailsPage";
import { rp } from "../pages/carRentalPage/carRentalPage";
import { hp } from "../pages/homePage/homePage";
import { FILL_FORM_WARNING, COUNTRIES, CITIES, SEARCH_RESULTS } from '../data/homePageData'
import { HEADER, TITLE, CARD_TEXT, DATES } from '../data/carDetailsData'
import { RENT_URL, FULL_NAME, CARD_NUMBER, INCORRECT_EMAIL } from '../data/carRentalData'

const FORM_DATA = {
    country: 'Poland',
    city: 'Cracow',
    model: 'RAV4',
    pickup_date: 0,
    dropoff_date: 1
}

describe('Lab tests', () => {

    beforeEach('Open page', () => {
        cy.visit('/')   
    })

    it('User should submit search form and get search results', () => {

        // Given
        cy.contains(FILL_FORM_WARNING)
        hp.elements.getSearchResults().should('not.exist')
        cy.checkDropdownOptions(hp.selectors.COUNTRY, COUNTRIES)
        cy.checkDropdownOptions(hp.selectors.CITY, CITIES)

        // When
        hp.searchData(FORM_DATA)

        // Then
        hp.elements.getSearchResults().should('exist')
        hp.checkResultsTable(SEARCH_RESULTS)
    })

    it('User should be able to see details of a chosen car', () => {

        // Given
        hp.searchData(FORM_DATA)
        hp.elements.getSearchResults().should('exist')

        // When
        hp.clickRentButton(1, 'details/45')

        // Then
        dp.elements.getDetailsCard().within(() => {
            dp.checkHeader(HEADER)
            dp.checkTitle(TITLE)
            dp.checkText(CARD_TEXT)
            dp.elements.getCardDates().each( (date, i) => {
                cy.countDate(i).then( dateValue  => {
                    cy.wrap(date).should('have.text', DATES[i] + dateValue)
                })
            })
        })
        dp.clickRentBtn('/rent/45')
    })

    it('User should not be able to submit invalid email', () => {

        // Given
        hp.searchData(FORM_DATA)
        hp.elements.getSearchResults().should('exist')
        hp.clickRentButton(1, 'details/45')
        dp.clickRentBtn(RENT_URL)

        // When
        rp.enterName(FULL_NAME.split(' ')[0])
        rp.enterLastName(FULL_NAME.split(' ')[1])
        rp.enterCardNo(CARD_NUMBER)
        rp.enterEmail(INCORRECT_EMAIL)
        rp.clickRentBtn()

        // Then
        rp.checkAlert('Please provide valid email')
        cy.url().should('include', RENT_URL)
    })
})
