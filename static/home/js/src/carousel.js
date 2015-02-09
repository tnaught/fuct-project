define(function(require, exports, module) {
    var $ = require('jquery');

    function Carousel(element, options) {
        this.element = $(element);
        this.content = this.element.children('.content');
        this.nav = this.element.children('.nav');
        this.options = $.extend({}, {
            intervalTime: 600,
            isCircle: true,
            autoPlay: true
        }, options);
        this.total = 5;
        this.index = 0;
    }

    module.exports = Carousel;

    Carousel.prototype.init = function() {
        this._play();
    }

    Carousel.prototype.move = function(num) {
        var cIndex = this.index + num;

    }

    Carousel.prototype._play = function() {
        var _self = Carousel;
        setInterval(function() {
            _self.move(1);
        }, intervalTime);
    }
});