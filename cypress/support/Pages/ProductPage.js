class ProductPage {
    getProductName(){
        return cy.get('.page-title');
    }
    getInstallmentsBtm(){
        return cy.get('#open-installments-modal');
    }
    getSelectBank(){
        return cy.get('#inputbank');
    }
    getSelectCard(){
        return cy.get('[id="inputCard"]');
    }
    getInstallmentCalculate(){
        return cy.get('#calculate_btn > .btn-primary');
    }
    getResultInstallment(){
        return cy.get('#bodyTable')
    }
}
export default ProductPage