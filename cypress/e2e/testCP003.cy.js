import { HomeService } from "../support/Service/HomeService";
import { ProductService } from "../support/Service/ProductService";

describe('CP003: Tienda Movistar', function(){
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

    it('CP003: Seleccionar un equipo y verificar que no acepte 60 cuotas sin interes', function(){
        
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Seleccionar el equipo indicado');
        HomeService.selectProduct(2);

        cy.log('Stept # 3: Verificar que sea el equipo indicado');
        ProductService.verifyProductName('Moto G04 4G');

        cy.log('Stept # 4: Seleccionar las cuotas sin interes');
        ProductService.selectInstallment('Credicoop','Visa');

        cy.log('Stept # 5: Verificar que NO esten disponibles las cuotas indicadas');
        ProductService.verifyInstallmentAvailable('not.contain',60);
    })

})