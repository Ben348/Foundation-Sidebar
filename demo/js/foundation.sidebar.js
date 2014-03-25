/**
 * Foundation Sidebar
 * Version: 1.0.1
 * URL: https://github.com/Ben348/Foundation-Sidebar/
 * Description: Sidebar component for the Foundation framework
 * Author: Ben Thomson http://ben-thomson.co.uk/
 * Notes: jQuery Plugin template based on https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 */

;(function ($, window, document, undefined) {

    // Plugin defaults
    var pluginName = 'sidebar',
        dataPlugin = 'plugin_' + pluginName,
        defaults = {
            speed: 'normal',
            dropdownToggled: function(opened, element, belowBreakpoint){},
            menuToggled: function(opened){},
            breakpointPassed: function(belowBreakpoint){}
        };

    /**
     * Plugin constructor
     *
     * @method Plugin
     * @param {object} element Element the plugin was called on
     */
    var Plugin = function(element) {
        // Plugin initialization
        this.options = $.extend({}, defaults);

        // Make the element a jQuery object
        this.element = $(element);

        // Set the current breakpoint value
        this._breakpoint = this.breakpoint();
    };

    /**
     * Toggle the visibility of dropdown items
     *
     * @method toggleDropdownItems
     * @param {object} context Plugin context (used for accessing options and methods)
     * @param {object} el Element that called the function
     */
    var toggleDropdownItems = function(context, element) {
        var self = context;

        // Get the dropdown parent (li element)
        var parent = $(element).parent();

        // Check if the dropdown menu is already open
        if(parent.hasClass('active'))
        {
            // Remove the active class
            parent.removeClass('active');

            // Hide the menu
            parent.find('.dropdown-menu').stop().slideUp(self.options.speed, function()
            {
                // Call the dropdownToggle callback - opened: false, li element
                self.options.dropdownToggled(false, parent);
            });
        }
        else
        {
            // Close any other open menus
            var open = parent.parent().find('.active');

            // Remove the active class
            open.removeClass('active');

            // Hide the menu
            open.find('.dropdown-menu').slideUp(self.options.speed, function()
            {
                // Call the drodownToggle callback - opened: false, li element
                self.options.dropdownToggled(false, open);
            });

            // Add the active class
            parent.addClass('active');

            // Show the menu
            parent.find('.dropdown-menu').stop().slideDown(self.options.speed, function()
            {
                // Call the drodownToggle callback - opened: true, li element
                self.options.dropdownToggled(true, parent);
            });
        }
    };

    /**
     * Toggle menu items visibility on small display
     *
     * @method toggleMenu
     * @param {object} context Plugin context (used for accessing options and methods)
     * @param {object} el Element that called the function
     */
    var toggleMenu = function(context, element) {
        var self = context;

        // Check if the menu is open 
        if(self.element.hasClass('open'))
        {
            // Close the menu
            self.element.find('.sidebar-nav').stop().slideUp(self.options.speed, function()
            {
                // Remove the open class.
                self.element.removeClass('open');

                // Call the drodownToggle callback - opened: true
                self.options.menuToggled(false);
            });
        }
        else 
        {
            // Open the menu
            self.element.find('.sidebar-nav').stop().slideDown(self.options.speed, function()
            {
                // Add the open class
                self.element.addClass('open');

                // Call the drodownToggle callback - opened: true
                self.options.menuToggled(true);
            });
        }
    };

    /**
     * Detect when the breakpoint is passed on window resize
     *
     * @method resize
     * @param {object} context Plugin context (used for accessing options and methods)
     */
    var resize = function(context) {
        var self = context;

        // Check if the initial breakpoint value matches the current breakpoint value
        if(self.breakpoint() !== self._breakpoint)
        {
            // Set the new breakpoint value
            self._breakpoint = self.breakpoint();

            // Call the breakpointPassed callback
            self.options.breakpointPassed(self.breakpoint());

            // Check if the menu is open
            if(self.element.hasClass('open')){
                // Close the menu if it is open
                self.element.removeClass('open').find('.sidebar-nav').hide();
            }
        }
    };

    Plugin.prototype = 
    {
        /**
         * Initialization logic
         *
         * @method init
         * @param {object} options Custom plugin settings
         */
        init: function(options) {
            var self = this;

            // Merge custom settings with defaults
            $.extend(this.options, options);

            // Register the sidebar media query (defined in _sidebar.scss settings)
            Foundation.utils.register_media('sidebar', 'custom-mq-sidebar');

            // Link the dropdown menu items with toggle open/close functions
            self.element.find('.dropdown > a').click(function(event)
            {
                // Prevent default action
                event.preventDefault();

                // Call the toggleDropdownItems function passing this context and the element
                toggleDropdownItems(self, this);
            });

            // Link the small menu toggle button to function
            self.element.find('.toggle-topbar > a').click(function(event)
            {
                // Prevent default action
                event.preventDefault();

                // Call the toggleDropdownItems function passing this context and the element
                toggleMenu(self, this);
            });

            // Bind the window resize event to function
            $(window).resize(function()
            {
                // Call our resize function
                resize(self);
            });
        },

        /**
         * Destroys the plugin
         *
         * @method destroy
         */
        destroy: function() {
            // Destroy the Plugin data instance
            this.element.data(dataPlugin, null);
        },

        /**
         * Check if sidebar breakpoint was passed
         *
         * @method breakpoint
         * @return {boolean} Breakpoint status
         */
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries['sidebar']).matches;
        }
    };

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * allowing any public function to be called via the jQuery plugin,
     * e.g. $(element).pluginName('functionName', arg1, arg2, ...)
     */
    $.fn[ pluginName ] = function (arg) {

        var args, instance;

        // only allow the plugin to be instantiated once
        if (!(this.data(dataPlugin) instanceof Plugin)) {

            // if no instance, create one
            this.data(dataPlugin, new Plugin(this));
        }

        instance = this.data(dataPlugin);

        instance.element = this;

        // Is the first parameter an object (arg), or was omitted,
        // call Plugin.init( arg )
        if (typeof arg === 'undefined' || typeof arg === 'object') {

            if (typeof instance['init'] === 'function') {
                instance.init(arg);
            }
        }
        // checks that the requested public method exists
        else if (typeof arg === 'string' && typeof instance[arg] === 'function') {

            // copy arguments & remove function name
            args = Array.prototype.slice.call(arguments, 1);

            // call the method
            return instance[arg].apply(instance, args);
        }
        else {
            $.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);
        }
    };

}(jQuery, window, document));