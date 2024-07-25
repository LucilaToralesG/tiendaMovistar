class ProductPage {
    getProductName(){
        return cy.get('.page-title');
    }
    getInstallmentsBtm(){
        return cy.get('#open-installments-modal');
    }
    getBankBox(){
        return cy.get('#inputbank');
    }
    getBankOpcion(){
        return cy.get('#selectBank');
    }
    getCardBox(){
        return cy.get('#inputCard');
    }
    getCardOpcion(){
        return cy.get('#selectCardByBank');
    }
    getResultInstallmentBtm(){
        return cy.get('#calculate_btn > .btn-primary');
    }
    getResultInstallmentInfo(){
        return cy.get('#installmentsTable');
    }
}
export default ProductPage