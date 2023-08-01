///<reference types = "Cypress"/>
beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage;
    cy.clearAllSessionStorage;
    cy.log('cach and cookies cleared');
    cy.reload();
});
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('almosafer.js', () => {
    it.skip('first three test cases language,contact number,currency', () => {
        cy.visit("https://www.almosafer.com/en")
        // currency check
        cy.get('[data-testid="Header__CurrencySelector"]').should('contain',"SAR")

        // contant check
        cy.get('.sc-dRFtgE').should('contain',"966554400000")

        // language check
        cy.get('[data-testid="Header__LanguageSwitch"]').should('contain',"العربية")
        
        
    });
    it.skip('test the logo of qitaf', () => {
        cy.visit("https://www.almosafer.com/en")
        cy.get('.sc-ghsgMZ').should('be.visible')
        
    });
    it.skip('check hotel tab is not selected', () => {
        cy.visit("https://www.almosafer.com/en");
        cy.get('#uncontrolled-tab-example-tab-hotels').should('have.attr', 'aria-selected').and('equal', 'false')

    });
    it.skip('check the depature date and return date', () => {
        cy.visit("https://www.almosafer.com/en")

        const currentDate = new Date()
        const day = currentDate.getDate()

        const expectedForDepature = day + 1
        const expectedForReturn = day + 2

        cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-hcnlBt').should('contain',expectedForDepature)
        cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-hcnlBt').should('contain', expectedForReturn)

    });
    it.skip('randomly change the language of the website and create one assertion for each change', () => {

        const websites = ["https://www.almosafer.com/en", "https://www.almosafer.com/ar"]

        const RandomIndex = Math.floor(Math.random()*websites.length)
        cy.visit(websites[RandomIndex])

        cy.url().then((url) => {

            if (url.includes('ar')) {


                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr','src').and('include',"ar")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "English")

            } else if (url.includes('en')) {



                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr','src').and('include',"en")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "العربية")



            }
        })

        
    });

    it.only('randomly change the language of the website and create one assertion for each change, switch to hotel search tab, randomly select "1 room, 2 adults, 0 children" or "1 room, 1 adult, 0 children" option and point 7 and point 8 ', () => {

        const websites = ["https://www.almosafer.com/en", "https://www.almosafer.com/ar"]

        const RandomIndex = Math.floor(Math.random()*websites.length)
        cy.visit(websites[RandomIndex])

        cy.url().then((url) => {
            let ArabicCities = ["جدة","دبي"]
            let randomArabic = Math.floor(Math.random()*ArabicCities.length)
            let EnglishCities = ["Dubui","Jeddah","Riyadh"]
            let randomEndlish = Math.floor(Math.random()*EnglishCities.length)

            let roomVisitor = ["A","B"]

            let randomvistorNo = Math.floor(Math.random()*roomVisitor.length)

            if (url.includes('ar')) {


                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr','src').and('include',"ar")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "English")

                cy.get('#uncontrolled-tab-example-tab-hotels').click()
                cy.get('[data-testid="AutoCompleteInput"]').type(ArabicCities[randomArabic])
                cy.get('[data-testid="AutoCompleteResultItem0"] > .sc-12clos8-5 > .sc-12clos8-6 > .sc-12clos8-8').click()
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
                cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(roomVisitor[randomvistorNo])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]')
                cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()




                cy.get(".Price__Value").then((elements) => {
                    // Step 4: Extract prices as text from elements and convert to numeric values
                    const prices = elements.toArray().map((element) => {
                      const priceText = element.innerText.replace(/[^0-9.]/g, "");
                      return parseFloat(priceText);
                    });
                
                    // Step 5: Get the first and last prices from the sorted list
                    const firstPrice = prices[0];
                    const lastPrice = prices[prices.length - 1];
                
                    // Step 6: Compare the first and last prices
                    expect(firstPrice).to.be.at.most(lastPrice);
                  });

                  cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]', { timeout: 20000 }).should('exist').should('be.visible').should('contain', "وجدنا");

                

            } else if (url.includes('en')) {



                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr','src').and('include',"en")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "العربية")

                cy.get('#uncontrolled-tab-example-tab-hotels').click()
                cy.get('[data-testid="AutoCompleteInput"]').type(EnglishCities[randomEndlish])
                cy.get('[data-testid="AutoCompleteResultItem0"] > .sc-12clos8-5 > .sc-12clos8-6 > .sc-12clos8-8').click()
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
                cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(roomVisitor[randomvistorNo])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]')
                cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()


                cy.get(".Price__Value").then((elements) => {
                    
                    const prices = elements.toArray().map((element) => {
                      const priceText = element.innerText.replace(/[^0-9.]/g, "");
                      return parseFloat(priceText);
                    });
                
                    
                    const firstPrice = prices[0];
                    const lastPrice = prices[prices.length - 1];
                
                    
                    expect(firstPrice).to.be.at.most(lastPrice);
                  });

                  cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]', { timeout: 20000 }).should('exist').should('be.visible').should('contain',"found");

                  


               



            }
        })

        
    });
}
);