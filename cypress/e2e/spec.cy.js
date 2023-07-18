import { detailsElements } from "../pages/carDetailsPage/carDetailsElements";
import { dp } from "../pages/carDetailsPage/carDetailsPage";
import { detailsSelectors } from "../pages/carDetailsPage/carDetailsSelectors";
import { rp } from "../pages/carRentalPage/carRentalPage";
import { hp } from "../pages/homePage/homePage";

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

    it('should submit form and show search results', () => {

        const FILL_FORM_WARNING = 'Please fill pickup and drop off dates'

        const countries = ['France', 'Germainy', 'Poland']

        const cities = ['Berlin', 'Cracow', 'Paris', 'Wroclaw']

        const SEARCH_RESULTS = [
            ['#', 'Company', 'Model', 'License plate', 'Price', 'Price per day', 'Action'],
            ['45', 'Adams-Barnett', 'Toyota RAV4', '228-JIB', '45$', '45$', 'Rent'],
            ['56', 'Hubbard Ltd', 'Toyota RAV4', 'LJJ 758', '42$', '42$', 'Rent'],
        ]

        // Given
        cy.contains(FILL_FORM_WARNING)
        hp.elements.getSearchResults().should('not.exist')
        cy.checkDropdownOptions(hp.selectors.COUNTRY, countries)
        cy.checkDropdownOptions(hp.selectors.CITY, cities)

        // When
        hp.searchData(FORM_DATA)

        // Then
        hp.elements.getSearchResults().should('exist')
        hp.checkResultsTable(SEARCH_RESULTS)
    })

    it('should show details of a first car in the results table', () => {

        const CARD_TEXT = [
            'Price per day: 45$',
            'Location: Poland, Cracow',
            'License plate: 228-JIB'
        ]
        const DATES = [
            ' Pickup date: ', 
            ' Dropoff date: '
        ]

        // Given
        hp.searchData(FORM_DATA)
        hp.elements.getSearchResults().should('exist')

        // When
        hp.clickRentButton(1, 'details/45')

        // Then
        detailsElements.getDetailsCard().within(() => {
            dp.checkHeader('Toyota RAV4')
            dp.checkTitle('Company: Adams-Barnett')
            dp.checkText(CARD_TEXT)
            detailsElements.getCardDates().each( (date, i) => {
                cy.countDate(i).then( dateValue  => {
                    cy.wrap(date).should('have.text', DATES[i] + dateValue)
                })
            })
        })
        dp.clickRentBtn('/rent/45')
    })

    it('should not be able to submit invalid email', () => {

        const RENT_URL = '/rent/45'
        const FULL_NAME = 'John Doe'
        const CARD_NUMBER = '987654321'
        const INCORRECT_EMAIL = 'fake'

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
