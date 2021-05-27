jQuery(function($) {

    $("#enlace-base").click(function() {
        let id = $(this).attr("href");
        $(id).addClass("activo");
    });

    $(".cancel").click(function() {
        let padre = $(this).parents("div");
        padre.removeClass("activo");
        console.log(padre);
    });

});