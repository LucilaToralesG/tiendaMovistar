import { HomeService } from "../support/Service/HomeService";
import { ProductService } from "../support/Service/ProductService";

describe('Search elements', function(){
    before(function(){
        cy.fixture('example').then(function(data)
        {
            this.data=data ;
        })

    })
    beforeEach(function(){
        cy.log('Stept # 0: Navegar a la pagina de tienda Movistar');
        cy.Navigate();
        cy.wait(3000);
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

    it('CP001: Busqueda del articulo A14, con pago en 3 cuotas', function(){
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Buscar el equipo A14');
        HomeService.searchProduct(this.data.producto);

        cy.log('Stept # 3: Seleccionarla primera coincidencia');
        HomeService.selectProduct(0);

        cy.log('Stept # 4: Verificar que sea el equipo indicado');
        ProductService.verifyProductName(this.data.producto);

        cy.log('Stept # 5: Seleccionar las cuotas sin interes');
        ProductService.select60Installment();

        cy.log('Stept # 6: Verificar que esten disponibles las cuotas indicadas');
        //ProductService.verifyInstallment('3 cuotas sin interés de');

    })

    it('CP003: Seleccionar un equipo y verificar que no acepte 60 cuotas sin interes', function(){
        
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Seleccionar el equipo indicado');
        HomeService.selectProduct(2);

        cy.log('Stept # 3: Verificar que sea el equipo indicado');
        ProductService.verifyProductName('Moto G04 4G');

        cy.log('Stept # 4: Seleccionar las cuotas sin interes');
        ProductService.selectInstallment(0,0);

        cy.log('Stept # 5: Verificar que esten disponibles las cuotas indicadas');
        ProductService.verifyInstallment('3 cuotas sin interés de');
    })

    

    it.only('Aplicar filtros a los productos de la tienda', function(){
        cy.log('Stept # 1: Verificar que sea la pagina indicada');
        cy.url().should('include', this.data.baseUrl);

        cy.log('Stept # 2: Verificar valor inicial del contador de filtros');
        HomeService.verifyCounterfilter('Filtrar ');

        cy.log('Stept # 3: Filtrar por precio');
        HomeService.selectFilter(this.data.precio);

        cy.log('Stept # 4: Verificar si aumento el contador de filtros');
        HomeService.verifyCounterfilter(1);

        cy.log('Stept # 5: Ordenar por marca');
        HomeService.selectSort(this.data.sort);

        cy.log('Stept # 4: Verificar que el contador de filtros no haya aumentado');
        HomeService.verifyCounterfilter(1);
    })
})