define(function(require, exports, module) {
    var $ = require('jquery');

    function Carousel(element, options) {
        this.$element = $(element);
        this.$banner = this.$element.find('.banner');
        this.options = $.extend({}, {
            intervalTime: 600,
            isCircle: true,
            autoPlay: true
        }, options);
        this.$children = this.$banner.children();
        this.total = this.$children.length;
        this.currentIndex = 0;
    }

    module.exports = Carousel;

    Carousel.prototype.init = function() {
        this.$banner.css({
            'width': '100%',
        })
        this.$children.css({
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'display': 'none',
            'width': '100%'
        })
        this.$children.eq(this.currentIndex).css('display', 'block');
        this.$children.eq(this.currentIndex+1).css('display', 'block');
        this.$children.eq(this.currentIndex-1).css('display', 'block');
        this.$children.eq(this.currentIndex-1).css('left', '-100%');
        this.$children.eq(this.currentIndex+1).css('left', '100%');
    }
    
    Carousel.prototype.next = function() {
        this.go(1);
    }
    Carousel.prototype.prev = function() {
        this.go(-1);
    }
    Carousel.prototype.go = function(num) {
        var cIndex = this.currentIndex = this.currentIndex + num;
        var $current = this.$children.eq(cIndex%this.total);
        var $next = this.$children.eq((cIndex+1)%this.total);
        var $prev = this.$children.eq((cIndex-1)%this.total);
        this.$children.css({'left':'0', 'display':'none'});
        $current.css({'display': 'block', 'left': '0'});
        $next.css({'display': 'block', 'left': '100%'});
        $prev.css({'display': 'block', 'left': '-100%'});
    }
    Carousel.prototype.append = function() {
        this.$banner.css({
            'width': this.total + '00%',
            'left': 0
        });
        var _self = this;
        var t1 = new Date().valueOf();
        var intervalTime = setInterval(function() {
            var t2 = new Date().valueOf();
            if((t2 - t1) > 16000) {
                clearInterval(intervalTime);
            }
            _self.$banner.children().eq(0).appendTo(_self.$banner);
        }, 2000)    
    }
    Carousel.prototype.changeLeft = function() {
        this.$banner.css({
            'width': this.total + '00%',
            'left': 0
        });
        var _self = this;
        var t1 = new Date().valueOf();
        var intervalTime = setInterval(function() {
            var t2 = new Date().valueOf();
            if((t2 - t1) > 16000) {
                clearInterval(intervalTime);
            }
            _self.currentIndex++;
            if(_self.currentIndex == _self.total) {
                _self.currentIndex = 0;
            }
            _self.$banner.css('left', '-' + _self.currentIndex + '00%');
        }, 2000)
    }
    Carousel.prototype.move = function(num) {
        var currentIndex = this.currentIndex + num;

    }

    Carousel.prototype._play = function() {
        var _self = Carousel;
        setInterval(function() {
            _self.move(1);
        }, intervalTime);
    }
});