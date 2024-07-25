import HomePage from "../Pages/HomePage";
export class HomeService{
    
    static home = new HomePage();
    
    static searchProduct(product){
        this.home.getSearchBtm().click();
        this.home.getSearchTextBox().clear().type(product).type('{enter}');
    }
    static verifyCountProduct(count){
        this.home.getTotalProduct().should('contain','Mostrando 12 de '+count+' equipos');
    }
    static selectFilter(filter){
        this.home.getFilterBtm().click();
        this.home.getFilterItems().contains(filter).click();
        cy.wait(10000);
    }
    static selectProduct(index){
        this.home.getProductList().children('li').eq(index).click();
    }
    static selectSort(cat){
        this.home.getSortQL();
        this.home.getSortItems().contains(cat).click();
        cy.wait(1000);
    }
    static verifyCounterfilter(value){
        this.home.getFilterBtm().should('contain', value);
    }

}
