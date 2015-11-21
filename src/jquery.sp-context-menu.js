/**
 * jQuery.spContextMenu - A simple contextual menu plugin for jQuery.
 *
 * This plugin requires: 
 *      1. jQuery ~2.0
 *
 * @author  Gonzalo Chumillas <gchumillas@email.com>
 * @license https://github.com/soloproyectos-js/jquery.sp-context-menu/blob/master/LICENSE MIT License
 * @link    https://github.com/soloproyectos-js/jquery.sp-context-menu
 */
(function () {
    /**
     * ContextMenu class.
     * 
     * This class represents a contextual menu.
     * 
     * @param {jQuery.<HTMLElement>} target Target (not required)
     */
    $.spContextMenu = function (target) {
        this._target = target === undefined? null: target;
        this._make();
    };
    
    /**
     * Horizontal position in pixels.
     * 
     * @var {number}
     */
    $.spContextMenu.prototype._x = 0;
    
    /**
     * Vertical position in pixels.
     * 
     * @var {number}
     */
    $.spContextMenu.prototype._y = 0;
    
    /**
     * Target element.
     * @var {jQuery.<HTMLElement>}
     */
    $.spContextMenu.prototype._target = null;
    
    /**
     * Contextual menu.
     * @var {jQuery.<HTMLUListElement>}
     */
    $.spContextMenu.prototype._menu = null;
    
    /**
     * List of items.
     * @var {array.<{label: string, onClick: Function}}>
     */
    $.spContextMenu.prototype._items = [];
    
    /**
     * Adds a menu entry.
     * 
     * @param {string}   label   Entry label
     * @param {Function} onClick Callback function
     * 
     * @return {void}
     */
    $.spContextMenu.prototype.addItem = function (label, onClick) {
        this._items.push({label: label, onClick: onClick});
    };
    
    /**
     * Shows the contextual menu.
     * 
     * @return {void}
     */
    $.spContextMenu.prototype.show = function () {
        var self = this;
        
        // appends the contextual menu to the body
        this._menu = $('<ul class="sp-context-menu" />').appendTo('body');
        $.each(this._items, function (index, item) {
            self._menu.append(
                $('<li />').append(
                    $('<a href="#" />')
                        .append(
                            $('<span />').text(item.label)
                        )
                        .on('click', function () {
                            var target = $(this);
                            $.proxy(item.onClick, self)();
                            self.hide();
                            target.blur();
                            return false;
                        })
                )
            );
        });
        
        this._update();
    };
    
    /**
     * Hides the contextual menu.
     * 
     * @return {void}
     */
    $.spContextMenu.prototype.hide = function () {
        if (this._menu !== null) {
            this._menu.remove();
            this._menu = null;
        }
    };
    
    /**
     * Gets horizontal position.
     * 
     * @return {number}
     */
    $.spContextMenu.prototype.getX = function () {
        return this._x;
    };
    
    /**
     * Sets horizontal position.
     * 
     * @param {number} value Horizontal position in pixels
     * 
     * @return {void}
     */
    $.spContextMenu.prototype.setX = function (value) {
        this._x = value;
        this._update();
    };
    
    /**
     * Gets vertical position.
     * 
     * @return {number}
     */
    $.spContextMenu.prototype.getY = function () {
        return this._y;
    };
    
    /**
     * Sets vertical position.
     * 
     * @param {number} value Vertical position in pixels
     * 
     * @return {void}
     */
    $.spContextMenu.prototype.setY = function (value) {
        this._y = value;
        this._update();
    };
    
    /**
     * Makes the component.
     * 
     * @return {void}
     */
    $.spContextMenu.prototype._make = function () {
        var self = this;
        
        // shows the contextual menu
        $(window).on('contextmenu', function (event) {
            if (self._target !== null && self._target.is(':hover')) {
                event.preventDefault();
                self.setX(event.pageX);
                self.setY(event.pageY);
                self.show();
            }
        });
        
        // hides the contextual menu
        $(window).on('blur mousedown', function () {
            if (self._menu === null || !self._menu.is(':hover')) {
                self.hide();
            }
        });
    };
    
    $.spContextMenu.prototype._update = function () {
        if (this._menu !== null) {
            this._menu.css({
                left: this._x + 'px',
                top: this._y + 'px'
            });
        }
    };
})(jQuery);
