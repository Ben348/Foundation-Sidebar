// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


$(document).ready(function(){

    $('.sidebar').sidebar({
        speed: 'normal',
        dropdownToggled: function(opened, element)
        {
            // Change arrow icons based on dropdown menu status
            if(opened){
                element.find('.fa-angle-left').first().removeClass('fa-angle-left').addClass('fa-angle-down');
            }
            else {
                element.find('.fa-angle-down').first().removeClass('fa-angle-down').addClass('fa-angle-left');
            }
        },
        breakpointPassed: function(belowBreakpoint){
            if(belowBreakpoint) {
                // Destroy the bar
                console.log('Destroying bar...');
                $('.sidebar .sb-scrollable').slimScroll({destroy: true}).css('height', 'auto');
            }
            else {
                console.log('Making bar...');
                // Make the bar
                slimscrollSidebar();
            }
        }
    });
    
    // Slimscroll the side bar if above breakpoint
    if(!$('.sidebar').sidebar('breakpoint')){
        // Add slimScroll to the sidebar
        slimscrollSidebar();
    }
});

function slimscrollSidebar(){
    $('.sidebar .sb-scrollable').slimScroll({
        height: 'auto',
        railVisible: true
    });
}