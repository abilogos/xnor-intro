$(document).ready(function(){
    //toggleNavBarBorderRaduius($("nav.navbar").first());
    $("nav.navbar").first().click(function(){
        toggleNavBarBorderRaduius($(this));
    });
});

function toggleNavBarBorderRaduius(navBar) {    
    if(navBar.find(".navbar-toggler").hasClass("collapsed")){
        navBar.parent().css("border-top-left-radius", "5%");
        navBar.parent().css("border-bottom-left-radius", "5%");

    } else{
        navBar.parent().css("border-top-left-radius", "0px");
        navBar.parent().css("border-bottom-left-radius", "0px");
    }
}