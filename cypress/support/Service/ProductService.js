import { productPage } from "../Pages/ProductPage";
class ProductService{
    
    searchProduct(product){
        productPage.getSearchBtm().click({force: true});
        productPage.getSearchTextBox().clear().type(product);
        productPage.getSearchBtm().click();
    }
    verifyProductName(name){
        productPage.getProductName().should('be.visible');
        productPage.getProductName().should('contain',name);
    }
    selectFilter(filter){
        productPage.getFilterBtm().click();
        productPage.getFilterItems().contains(filter).click();
    }
    openCalculateInstallment(){
        cy.contains('Calculá tus cuotas').should('be.visible');
        productPage.getInstallmentsBtm().click();
    }
    selectInstallment(bank,card){
        this.openCalculateInstallment();
        productPage.getBankBox().click();
        productPage.getBankOpcion().find('li').contains(bank).click({force: true});
        productPage.getCardBox().click();
        productPage.getCardOpcion().find('li').contains(card).click({force: true});
        productPage.getResultInstallmentBtm().click();
    }
    verifyInstallmentAvailable(available,installments){
        productPage.getResultInstallmentInfo().should('be.visible');
        if (installments==1) {
            productPage.getResultInstallmentInfo().should(available, installments+' cuota sin interés de');
        } else {
            productPage.getResultInstallmentInfo().should(available, installments+' cuotas sin interés de');
        }
        
    }

    pressAddCard(){
        productPage.getAddCard().should('be.visible').click();
    }
    
    validateInstallment(size){
        productPage.getResultInstallmentInfo().children('tr').should('have.length', size);
    }

    validarInstallmentCardBank(bank,card){
        productPage.getBankCardDescription().should('be.visible').children('strong').first().and('contain', card);
        productPage.getBankCardDescription().should('be.visible').children('strong').last().and('contain',bank);
    }


} 
export const productService = new ProductService();