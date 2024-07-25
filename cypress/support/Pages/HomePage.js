class HomePage {
    getSearchBtm() {
        return cy.get('#search_action');
    }
    getSearchTextBox(){
        return cy.get('#search');
    }
    getProductList(){
        return cy.get('.products > ol');
    }
    getTotalProduct(){
        return cy.get('.total-products');
    }
    getFilterBtm(){
        return cy.get('.block-subtitle');
    }
    getFilterItems(){
        return cy.get('#filters-items');
    }
    getSortQL(){
        return cy.get('.toolbar-sorter');
    }
    getSortItems(){
        return cy.get('#options-sorter');
    }
}
export default HomePage