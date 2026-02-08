$(document).ready(function () {
    $("#openCreate").on("click", function (e) {
        e.preventDefault();
        $(".login-wrapper").fadeOut(100);
        $(".create-wrapper").fadeIn(100);
    });

    $("#forgetWrapper").on("click", function (e) {
        e.preventDefault();
        $(".login-wrapper").fadeOut(100);
        $(".forget-wrapper").fadeIn(100);
    });

    $("#backToLoginFromCreate").on("click", function (e) {
        e.preventDefault();
        $(".create-wrapper").fadeOut(100);
        $(".login-wrapper").fadeIn(100);
    });
    $("#backToLoginFromForget").on("click", function (e) {
        e.preventDefault();
        $(".forget-wrapper").fadeOut(100);
        $(".login-wrapper").fadeIn(100);
    }); 
});


