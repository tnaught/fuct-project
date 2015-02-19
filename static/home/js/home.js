$.fn.getBgSize = function(callback) {
    var image_url = $(this).css('background-image');
    var image;

    // Remove url() or in case of Chrome url("")
    image_url = image_url.match(/^url\("?(.+?)"?\)$/);

    if (image_url[1]) {
        image_url = image_url[1];
        image = new Image();

        // just in case it is not already loaded
        $(image).load(function () {
            callback({
                width: image.width,
                height: image.height
            })
        });

        image.src = image_url;
    }
}

;$(function() {
var $nav = $('[data-action="nav"]');
var oldX = $nav.css('background-position-x'); 
$('li', $nav).hover(
    function() {
        var i = $(this).index($nav.children())
        var left = $(this).position().left;
        var width = $(this).width();
        $nav.getBgSize(function(data) {
            var bgWidth = data.width;
            var l = left + width/2 - bgWidth/2;
            $nav.css({
                'background-position-x': l
            })
        })
    }
    , function() {
        $nav.css({
            'background-position-x': oldX
        })
    }
);

$('.banner').slick({
    'dots':true
});
})
