import ProductPage from "../Pages/ProductPage";
export class ProductService{
    // Creating Object for ProductPage
    static product = new ProductPage();
    // Doing the search part for Shirts.
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
        this.product.getInstallmentsBtm().click();
        cy.wait(3000);
    }
    static selectInstallment(bank,card,installment){
        this.openCalculateInstallment();
        this.product.getSelectBank().click();
        this.product.getSelectBank().select(bank);
        this.product.getSelectCard().click();
        this.product.getSelectCard().select(card);
        this.product.getInstallmentCalculate().click();
        cy.wait(3000);
        this.product.getResultInstallment().should('contain',installment +' cuotas sin interés');
        //;
        //
    }
    static select60Installment(){
        this.product.getSelectBank().click();
        cy.get('[id"ui-id-21"]').click();
        this.product.getSelectCard().click();
        cy.get('#selectCardByBank li:nth-child(3)').click();
        this.product.getInstallmentCalculate().click();
        cy.wait(3000);
        this.product.getResultInstallment().should('not.contain','60 cuotas sin interés');
        
    }

}