// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


$(document).ready(function(){
    $('.sidebar').sidebar({
        speed: 'normal',
        dropdownToggled: function(opened, element, belowBreakpoint)
        {
            // Change arrow icons based on dropdown menu status
            if(opened){
                element.find('.fa-angle-left').first().removeClass('fa-angle-left').addClass('fa-angle-down');
            }
            else {
                element.find('.fa-angle-down').first().removeClass('fa-angle-down').addClass('fa-angle-left');
            }
        }
    });
});