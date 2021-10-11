$(document).ready(function() {

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

});

$(document).ready(function() {
    $('.toggle-button').on('click', function() {

        $('.animated-icon').toggleClass('open');
    });
});