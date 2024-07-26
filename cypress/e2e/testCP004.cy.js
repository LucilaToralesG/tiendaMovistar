import { HomeService } from "../support/Service/HomeService";

describe('CP004: Tienda Movistar', function(){
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

    it.only('Aplicar filtros y ordenar los productos y verificar  el contador', function(){
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Verificar valor inicial del contador de filtros');
        HomeService.verifyCounterfilter('Filtrar ');

        cy.log('Stept # 3: Filtrar por precio y memoria interna');
        HomeService.selectFilter(this.data.precio);

        cy.log('Stept # 4: Verificar si aumento el contador de filtros');
        HomeService.verifyCounterfilter(1);

        cy.log('Stept # 5: Ordenar por marca');
        HomeService.selectSort(this.data.sort);

        cy.log('Stept # 4: Verificar que el contador de filtros haya aumentado');
        HomeService.verifyCounterfilter(2);
    })

})