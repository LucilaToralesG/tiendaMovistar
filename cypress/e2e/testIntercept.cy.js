import { homeService } from "../support/Service/HomeService";
import { productService } from "../support/Service/productService";
import cuotas from "../Builders/cuotasBuilder.json";
import equipos from "../Builders/equiposBuilder.json";

describe('intercept: Tienda Movistar', function(){
    before(function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    })
    
    beforeEach(function(){
        cy.log('Stept # 0: Navegar a la pagina de tienda Movistar');
        cy.Navigate();
    })

    it('CP005: Seleccionar un equipo y verificar que unicamente acepte 1 pago', function(){
        cy.intercept({
            method: 'GET',
            url: '/financingconsult/financingconsult/getinstallments?amount=*&card=*&bank=*&productid=*&_=*',

        },{
            body: []

        }).as('unaCuota');
        
        cy.url().should('include', 'tiendaonline.movistar','Stept # 1: Verificar que sea la pagina indicada');

        cy.log('Stept # 1: Seleccionar el equipo indicado');
        homeService.selectProduct(1);

        cy.log('Verificar que sea el equipo indicado');
        productService.verifyProductName('Moto E14 64GB');

        cy.log('Stept # 2: Seleccionar las cuotas sin interes');
        productService.selectInstallment('American Express','American Express');
        cy.wait('@unaCuota');
        cy.log('Validar que se muestren la tarjeta y el banco indicado');
        productService.validarInstallmentCardBank('American Express','American Express');

        cy.log('Verificar que solo este disponible en un pago');
        productService.verifyInstallmentAvailable('not.contain',1);
    });

    it('CP006: Seleccionar un equipo y verificar que acepte 60 cuotas', function(){
        cy.intercept({
            method: 'GET',
            url: '/financingconsult/financingconsult/getinstallments?amount=*&card=*&bank=*&productid=*&_=*',

        },{
            body: [cuotas[5]],

        }).as('sesentaCuota');
        cy.url().should('include', 'tiendaonline.movistar', 'Verificar que sea la pagina indicada');

        cy.log('Stept # 1: Seleccionar el equipo indicado');
        homeService.selectProduct(1);

        cy.log('Verificar que sea el equipo indicado');
        productService.verifyProductName('Moto E14 64GB');

        cy.log('Stept # 2: Seleccionar las cuotas sin interes');
        productService.selectInstallment('American Express','American Express');
        cy.wait('@sesentaCuota').then(({request, response}) => {
            cy.get('#bodyTable').children('tr').should('have.length', response['body'].length,'Validar que solo se muestre 60 cuotas');
        });
        cy.log('Validar que se muestren la tarjeta y el banco indicado');
        productService.validarInstallmentCardBank('American Express','American Express');

        cy.log('Verificar que esten disponibles las cuotas indicadas');
        productService.verifyInstallmentAvailable('contain',60);
    });

    it('CP007: Visualizar solo 2 equipos en la tienda', function(){
        cy.intercept({
            method: 'GET',
            url: '/graphql?query=%7B%20products(%20filter:%20%7B%20category_id:%20%7Beq:%20%224%22%7D%20%20%7D,%20%20pageSize:%2012,%20%20%20%20%20%20%20%20%20currentPage:%201%20)%20%7B%20total_count%20%20aggregations%20%7B%20attribute_code%20count%20label%20position%20options%20%7B%20label%20value%20count%20%7D%20%20%20%20%20%20%20%20%20%7D%20items*',

        },{
            body: equipos,
        }).as('carrito');
        cy.log('Verificar que sea la pagina indicada');
        cy.url().should('include', 'tiendaonline.movistar');
        cy.log('Stept # 1: Recargar la pagina');
        cy.reload();
        cy.wait('@carrito').then(({request,response}) => {
            cy.log('Validar que la cantidad de equipos sean 2');
            homeService.verifyCountProduct(response['body']['data']['products']['total_count']);
        });
        cy.log('Verificar que no este habilitado el boton mas equipos');
        homeService.verifyDisabledMore();
    });

//
    it('CP008: Seleccionar una tarjeta equivocada y verificar de error', function(){
      cy.intercept('GET', '/financingconsult/financingconsult/getinstallments?amount=*&card=*&bank=*&productid=*&_=*', (req) => {
        req.url='/financingconsult/financingconsult/getinstallments?amount=*&card=Visa&bank=*&productid=*&_=*'
        req.continue((res) =>{
            expect(res.statusCode).to.equal(500); 
        })
      }).as('tarjetaEquivocada');
        cy.url().should('include', 'tiendaonline.movistar','Verificar que sea la pagina indicada');

        cy.log('Stept # 1: Seleccionar el equipo indicado');
        homeService.selectProduct(1);

        cy.log('Verificar que sea el equipo indicado');
        productService.verifyProductName('Moto E14 64GB');

        cy.log('Stept # 2: Seleccionar las cuotas sin interes');
        productService.selectInstallment('American Express','American Express');
        cy.wait('@tarjetaEquivocada');
        
    });

})