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

/*分类*/
var overTime, outTime;
$('.category .child li').on('mouseover', function(e) {
    outTime && clearTimeout(outTime);
    overTime = setTimeout(function() {
        $('.category .category-more').show();
    }, 200)
})
.on('mouseout', '.child li', function(e) {
    overTime && clearTimeout(overTime);
    outTime && clearTimeout(outTime);
    outTime = setTimeout(function() {
        $('.category .category-more').hide();
    }, 200)
});
$('.category').on('click', '.dropdown-arrow', function() {
    if($(this).hasClass('down')) {
        $(this).removeClass('down').addClass('up');
    }
    else {
        $(this).removeClass('up').addClass('down');

    }
    $(this).closest('.category').toggleClass('collapse');
})

/*推荐*/
$('.recommend-content').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});
})
