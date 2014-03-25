Foundation-Sidebar
==================

The Foundation framework by Zurb [http://foundation.zurb.com/](http://foundation.zurb.com/) provides many great components for creating responsive layouts, however it doesn’t have a sidebar component; something that is used on many websites today – especially in dashboard and admin panels.

This project aims to build a fully customisable and lightweight sidebar component for use with the Foundation framework.

**DEMO** http://ben-thomson.co.uk/foundation-sidebar/

**slimScroll DEMO** http://ben-thomson.co.uk/foundation-sidebar/slim/

##Requirements
The project requires the following libraries to work.
- jQuery [http://jquery.com/](http://jquery.com/)
- Zurb Foundation [http://foundation.zurb.com/](http://foundation.zurb.com/)
- Compass [http://compass-style.org/](http://compass-style.org/)

Extra for effects
- slimScroll (scrollbar) [https://github.com/rochal/jQuery-slimScroll](https://github.com/rochal/jQuery-slimScroll)
- Font Awesome (icons) [http://fortawesome.github.io/Font-Awesome/](http://fortawesome.github.io/Font-Awesome/)


## Installation

- Move the `_sidebar.scss` file into your `scss` folder.
- Move the `foundation.sidebar.js` file into your `javascript` folder.

Link the javascript; the script must be included **AFTER** jQuery and foundation.
````html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/foundation/js/foundation.min.js"></script>
<script src="js/foundation.sidebar.js" >
````

Compile the project: `compass compile`

### Without Compass
In the `_sidebar.scss` remove lines 57-59

````css
@include transition-property(background-color);
@include transition-duration(0.2s);
@include transition-timing-function(ease-in-out);
````

Then compile as normal

## HTML Markup
This is the default markup for the menu
````html
<div class="sidebar">
   <!-- Toggle menu button for small devices -->
   <div class="toggle-topbar">
      <a href="#">menu</a>
   </div>

   <!-- Navigation -->
   <nav>
      <ul class="sidebar-nav">
         <li><a href="#">Menu Item 1</a></li>
         <li><a href="#">Menu Item 2</a></li>
         <li class="dropdown">
            <a href="#">Menu Item 3</a>
            <ul class="dropdown-menu">
               <li><a href="#">Drop menu item 1</a></li>
               <li><a href="#">Drop menu item 2</a></li>
               <li><a href="#">Drop menu item 3</a></li>
            </ul>
         </li>
      </ul>
   </nav>
</div>
````

Once that is done call the function like below and the plugin will automatically add the events to make it work.
````javascript
// With options
$('.sidebar').sidebar({
    speed: 'normal' // Number or string - Animation speed for open/closing menu.
    dropdownToggled: function(opened, element, belowBreakpoint){}, // Dropdown toggle callback
    menuToggled: function(opened){}, // Small menu toggle callback
    breakpointPassed: function(belowBreakpoint){} // Breakpoint passed callback
});

// Without
$('.sidebar').sidebar();
````

## Callbacks
There are only 3 callbacks made at this time; they still need work to refine them to include all the features necessary in order to make the menu as customisable and flexible as possible.

### dropdownToggled(opened, element, breakpoint)
This function is called after a menu item with dropdown items is expanded/collapsed.

| Option | Value | Description |
| --- | --- | --- |
| **opened** | boolean | State of the dropdown menu. |
| **element** | object | `<li class="dropdown">` element in the main menu list. This is the element that holds the dropdown menu. |
| **belowBreakpoint** | boolean | **TRUE** if below the breakpoint or **FALSE** if above. |

````javascript
$('.sidebar').sidebar({
    dropdownToggled: function(opened, element, belowBreakpoint){
       if(opened){
          ...
       }
       else {
          ...
       }
    }
});
````

### menuToggled(opened)
This function is called **after** the small screen (vertical) menu is opened/closed.

| Option | Value | Description |
| --- | --- | --- |
| **opened** | boolean | State of the menu |
````javascript
$('.sidebar').sidebar({
    menuToggled: function(opened){
       if(opened){
          ... // Do stuff for small screen devices
       }
       else {
          ... // Do stuff for larger screens
       }
    }
});
````

### breakpointPassed(belowBreakpoint)
This function is called every time the breakpoint is passed.

| Option | Value | Description |
| --- | --- | --- |
| **belowBreakpoint** | boolean | **TRUE** if below the breakpoint or **FALSE** if above. |
````javascript
$('.sidebar').sidebar({
    breakpointPassed: function(belowBreakpoint){
       if(belowBreakpoint){
          ... // Do stuff for small screen devices
       }
       else {
          ... // Do stuff for larger screens
       }
    }
});
````
## slimScroll demo
Example of how to impliment slimScroll with this side bar. First you need to download the files from here
- slimScroll (scrollbar) [https://github.com/rochal/jQuery-slimScroll](https://github.com/rochal/jQuery-slimScroll)

### Step 1 - HTML Markup
First we need to add a div around the content that you want scrollable. In this instance I've added: `<div class="sb-scrollable">...</div>`

````html
<div class="sidebar">
   <!-- Toggle menu button for small devices -->
   <div class="toggle-topbar">
      <a href="#">menu</a>
   </div>

   <!-- Container div for scrollable content -->
   <div class="sb-scrollable">
      <!-- Navigation -->
      <nav>
         <ul class="sidebar-nav">
            <li><a href="#">Menu Item 1</a></li>
            <li><a href="#">Menu Item 2</a></li>
            <li class="dropdown">
               <a href="#">Menu Item 3</a>
               <ul class="dropdown-menu">
                  <li><a href="#">Drop menu item 1</a></li>
                  <li><a href="#">Drop menu item 2</a></li>
                  <li><a href="#">Drop menu item 3</a></li>
               </ul>
            </li>
         </ul>
      </nav>
   </div>
</div>
````

### Step 2 - CSS
Add some CSS for the div.
````css
.sb-scrollable {
    height: auto;
}
````

### Step 3 - JavaScript
No we add the JavaScript utilising the callbacks to determine when the scroll bar should be made / destroyed.
````javascript
$(document).ready(function(){

    $('.sidebar').sidebar({
        breakpointPassed: function(belowBreakpoint){
            if(belowBreakpoint){
                // Destroy the bar
                $('.sidebar .sb-scrollable').slimScroll({destroy: true}).css('height', 'auto');
            }else{
                // Make the bar
                slimscrollSidebar();
            }
        }
    });

    // Slimscroll the side bar if above breakpoint
    if(!$('.sidebar').data('plugin_sidebar').breakpoint()){
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
````
