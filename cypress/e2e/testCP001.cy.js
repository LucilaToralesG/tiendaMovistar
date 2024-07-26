import { HomeService } from "../support/Service/HomeService";
import { ProductService } from "../support/Service/ProductService";

describe('CP001: Tienda Movistar', function(){
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

    it('CP001: Busqueda del articulo A14, con pago en 3 cuotas', function(){
        
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Buscar el equipo A14');
        HomeService.searchProduct(this.data.producto);

        cy.log('Stept # 3: Seleccionarla primera coincidencia');
        HomeService.selectProduct(0);

        cy.log('Stept # 4: Verificar que sea el equipo indicado');
        ProductService.verifyProductName('Galaxy A14 4G');

        cy.log('Stept # 5: Seleccionar las cuotas sin interes');
        ProductService.selectInstallment('American Express','American Express');

        cy.log('Stept # 6: Verificar que esten disponibles las cuotas indicadas');
        ProductService.verifyInstallmentAvailable('contain',3);

    })

})