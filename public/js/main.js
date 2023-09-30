$(document).ready(function(){
    //toggleNavBarBorderRaduius($("nav.navbar").first());
    $("nav.navbar").first().click(function(){
        toggleNavBarBorderRaduius($(this));
    });
    if ($(".projects-description").length ) {
        for(el of document.getElementsByClassName("projects-description"))
        slowPageScroll(el);
    }
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

function slowPageScroll(obj) {
    obj.scrollBy(0,1);
    scrolldelay = setTimeout(slowPageScroll,200,obj);
}