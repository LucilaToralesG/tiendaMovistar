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
    getUsedBtm(){
        return cy.get('.category-slider > .slick-list > .slick-track > [data-slick-index="1"] > :nth-child(1) > .item > a');
    }
    getMoreBtm(){
        return cy.get('#moreProductsBtn');
    }
}
export const homePage = new HomePage();