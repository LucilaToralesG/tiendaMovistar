import { homePage } from "../Pages/HomePage";
class HomeService{
    searchProduct(product){
        homePage.getSearchBtm().click();
        homePage.getSearchTextBox().clear().type(product).type('{enter}');
    }
    verifyCountProduct(count){
        if (count>12) {
            homePage.getTotalProduct().should('contain','Mostrando 12 de '+count+' equipos');
        } else {
            homePage.getTotalProduct().should('contain','Mostrando '+count+' equipos');
        }
        
    }
    selectFilter(filter){
        homePage.getFilterBtm().click();
        homePage.getFilterItems().contains(filter).click({force: true});
    }
    selectProduct(index){
        homePage.getProductList().children('li').eq(index).click();
    }
    selectSort(cat){
        homePage.getSortQL().click();
        homePage.getSortItems().find('li').contains(cat).click({force: true});
    }
    verifyCounterfilter(value){
        homePage.getFilterBtm().should('contain', value);
    }
    
    selectUsedPhone(){
        homePage.getUsedBtm().should('be.visible').click();
    }
    verifyDisabledMore(){
        homePage.getMoreBtm().should('be.visible').and('be.disabled');
    }

}
export const homeService = new HomeService();