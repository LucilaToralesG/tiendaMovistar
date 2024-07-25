import ProductPage from "../Pages/ProductPage";
export class ProductService{
    
    static product = new ProductPage();
    
    static searchProduct(product){
        this.product.getSearchBtm().click({force: true});
        this.product.getSearchTextBox().clear().type(product);
        this.product.getSearchBtm().click();
    }
    static verifyProductName(name){
        this.product.getProductName().should('be.visible');
        this.product.getProductName().should('contain',name);
    }
    static selectFilter(filter){
        this.product.getFilterBtm().click();
        this.product.getFilterItems().contains(filter).click();
    }
    static openCalculateInstallment(){
        cy.contains('Calculá tus cuotas').should('be.visible');
        this.product.getInstallmentsBtm().click();
    }
    static selectInstallment(bank,card){
        this.openCalculateInstallment();
        this.product.getBankBox().click();
        this.product.getBankOpcion().find('li').contains(bank).click({force: true});
        this.product.getCardBox().click();
        this.product.getCardOpcion().find('li').contains(card).click({force: true});
        this.product.getResultInstallmentBtm().click();
    }
    static verifyInstallmentAvailable(available,installments){
        this.product.getResultInstallmentInfo().should('be.visible');
        this.product.getResultInstallmentInfo().should(available, installments+' cuotas sin interés de');
    }

}
