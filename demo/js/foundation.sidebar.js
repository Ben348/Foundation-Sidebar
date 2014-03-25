/**
 * Foundation Sidebar
 * Version: 1.0.0
 * URL: 
 * Description: Sidebar component for the Foundation framework
 * Author: Ben Thomson http://ben-thomson.co.uk/
 * Notes: jQuery Plugin template based on https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 */

;(function ($, window, document, undefined) {

    // Plugin defaults
    var pluginName = 'sidebar',
        defaults = {
            speed: 'normal',
            dropdownToggled: function(opened, element, belowBreakpoint){},
            menuToggled: function(opened){},
            breakpointPassed: function(belowBreakpoint){}
        };

    // Plugin constructor
    function Plugin(element, options){

        // Make the element a jQuery object
        this.element = $(element);

        // Merge custom settings with defaults
        this.settings = $.extend({}, defaults, options);

        // Set the current breakpoint value
        this._breakpoint = this.breakpoint();

        // Initialize plugin
        this.init();
    }

    // Plugin functions here
    Plugin.prototype = {

        /**
         * Initialization logic
         *
         * @method init
         */
        init : function() 
        {
            var self = this;

            // Register the sidebar media query (defined in _sidebar.scss settings)
            Foundation.utils.register_media('sidebar', 'custom-mq-sidebar');

            // Link the dropdown menu items with toggle open/close functions
            self.element.find('.dropdown > a').click(function(event){
                event.preventDefault();
                self.toggleDropdownItems(this);
            });

            // Link the small menu toggle button to function
            self.element.find('.toggle-topbar > a').click(function(event){
                event.preventDefault();
                self.toggleMenu(this);
            });

            // Bind the window resize event to function
            $(window).resize(function() {
                self.resize();
            });
        },

        /**
         * Toggle the visibility of dropdown items
         *
         * @method toggleDropdownItems
         * @param {object} el Element that called the function
         */
        toggleDropdownItems : function(element) 
        {
            var self = this;

            // Get the dropdown parent - li element
            var parent = $(element).parent();

            // Check if the dropdown menu is already open
            if(parent.hasClass('active')) 
            {
                // Remove the active class
                parent.removeClass('active');

                // Hide the menu
                parent.find('.dropdown-menu').stop().slideUp(self.settings.speed, function(){
                    // Call the drodownToggle callback - opened: false, li element, breakpoint
                    self.settings.dropdownToggled(false, parent, self.breakpoint());
                });
            }
            else
            {
                // Close any other open menus
                var open = parent.parent().find('.active');
                
                // Remove the active class
                open.removeClass('active');

                // Hide the menu
                open.find('.dropdown-menu').slideUp(self.settings.speed, function(){
                    // Call the drodownToggle callback - opened: false, li element, breakpoint
                    self.settings.dropdownToggled(false, open, self.breakpoint());
                });

                // Add the active class
                parent.addClass('active');

                // Show the menu
                parent.find('.dropdown-menu').stop().slideDown(self.settings.speed, function(){
                    // Call the drodownToggle callback - opened: true, li element, breakpoint
                    self.settings.dropdownToggled(true, parent, self.breakpoint());
                });
            }
        },

        /**
         * Toggle menu items visibility on small display
         *
         * @method toggleMenu
         * @param {object} el Element that called the function
         */
        toggleMenu : function(element) 
        {
            var self = this;

            if(self.element.hasClass('open')){
                self.element.find('.sidebar-nav').stop().slideUp(self.settings.speed, function(){
                    // Remove the open class
                    self.element.removeClass('open');

                    // Call the drodownToggle callback - opened: true, li element
                    self.settings.menuToggled(false);
                });
            }
            else {
                self.element.find('.sidebar-nav').stop().slideDown(self.settings.speed, function(){
                    // Add the open class
                    self.element.addClass('open');

                    // Call the drodownToggle callback - opened: false, li element
                    self.settings.menuToggled(true);
                });
            }
        },

        /**
         * Check if sidebar breakpoint was passed
         *
         * @method breakpoint
         */
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries['sidebar']).matches;
        },

        /**
         * Detect when the breakpoint is passed on window resize
         *
         * @method resize
         */
        resize: function() {
            var self = this;

            // Check if the initial breakpoint value matches the current breakpoint value
            if(self.breakpoint() !== self._breakpoint){
                // Set the new breakpoint value.
                self._breakpoint = self.breakpoint();

                // Call the breakpointPassed function
                self.settings.breakpointPassed(self.breakpoint());

                // Check if the menu is open
                if(self.element.hasClass('open')){
                    // Close the menu if it is open
                    self.element.removeClass('open').find('.sidebar-nav').hide();
                }
            }
        }
    };

    // Prevent multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }
})(jQuery, window, document);