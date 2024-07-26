import { HomeService } from "../support/Service/HomeService";

describe('CP002: Tienda Movistar', function(){
    before(function(){
        cy.fixture('example').then(function(data)
        {
            this.data=data ;
        })
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })

    })
    beforeEach(function(){
        cy.log('Stept # 0: Navegar a la pagina de tienda Movistar');
        cy.Navigate();
        cy.request("GET", this.data.baseUrl ).then((response) => {
            expect(response.status).to.eq(200);
        });
    })

    it('CP002: Aplicar filtros a los productos de la tienda y verificar cantidad', function(){
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Filtrar por precio');
        HomeService.selectFilter(this.data.precio);

        cy.log('Stept # 3: Filtrar por memoria Interna');
        HomeService.selectFilter(this.data.memoriaInterna);
        
        cy.log('Stept # 4: Verificar que muestre la cantidad correcta');
        HomeService.verifyCountProduct(13);
    })

})