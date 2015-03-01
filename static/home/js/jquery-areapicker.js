(function ($, undefined) {

var dataSource = {
	"北京市": {
		"北京市": {
			"海淀区": "",
			"昌平区": ""
		}
	},
	"湖北省": {
		"武汉市": {
			"洪山区": "",
			"桥口区": ""
		},
		"孝感市": {
			"汉川": ""
		}
	},
	"浙江省": {
		"嘉兴市": {
			"桐乡": "",
			"平湖": ""
		},
		"杭州市": {
			"下城区": ""
		}
	}
};

var defaultValue = ['<span class="text-gray">省份</span>', '<span class="text-gray">城市</span>', '<span class="text-gray">区县</span>'];

function checkValue (value) {
	if ( !(value[0] in dataSource) ) {
		value[0] = undefined;
		value[1] = undefined;
		value[2] = undefined;
	} else if ( !(value[1] in dataSource[value[0]]) ) {
		value[1] = undefined;
		value[2] = undefined;
	}  else if ( !(value[2] in dataSource[value[0]][value[1]]) ) {
		value[2] = undefined;
	}
}

function init () {
	var $this = $(this);
	var value = $this.attr('value').split('-');
	var $picker = $('<ul class="areapicker-picker"></li>');
	var input = $('<input type="hidden"/>');
	checkValue(value);
	input.val(value.join('-'));
	var $p = $('<div class="areapicker-p">'+(value[0] || defaultValue[0])+'</div>');
	var $c = $('<div class="areapicker-c">'+(value[1] || defaultValue[1])+'</div>');
	var $v = $('<div class="areapicker-v">'+(value[2] || defaultValue[2])+'</div>');
	$this.append($p).append($c).append($v).append(input);

	$picker.on('click', 'span', function () {
		var $li = $(this);
		switch(this.className) {
			case 'p':
				value = [$li.text(), undefined, undefined];
				input.val(value.join('-'));
				$p.html(value[0]);
				$c.html(defaultValue[1]);
				$v.html(defaultValue[2]);
				$c.trigger('click');
				break;
			case 'c':
				value[1] = $li.text();
				value[2] = undefined;
				input.val(value.join('-'));
				$c.html(value[1]);
				$v.html(defaultValue[2]);
				$v.trigger('click');
				break;
			case 'v':
				value[2] = $li.text();
				input.val(value.join('-'));
				$v.html(value[2]);
				$picker.detach();
				$this.removeClass('p c v');
				break;
		}
	})

	$p.on('click', function () {
		$this.addClass('p').removeClass('c v');
		$this.append($picker);
		var html = '';
		for (key in dataSource) {
			html += '<li><span class="p">'+key+'</span></li>';
		}
		$picker.html(html);
	});

	$c.on('click',  function () {
		if (value[0] === undefined) {
			$p.trigger('click');
			return;
		}
		$this.addClass('c').removeClass('p v');
		$this.append($picker);
		var html = '';
		for (key in dataSource[value[0]]) {
			html += '<li><span class="c">'+key+'</span></li>';
		}
		$picker.html(html);
	});

	$v.on('click', function () {
		if (value[1] === undefined) {
			$c.trigger('click');
			return;
		}
		if (value[0] === undefined) {
			$p.trigger('click');
			return;
		}
		$this.addClass('v').removeClass('p c');
		$this.append($picker);
		var html = '';
		for (key in dataSource[value[0]][value[1]]) {
			html += '<li><span class="v">'+key+'</span></li>';
		}
		$picker.html(html);
	});

	$(document).on('click', function (e) {
		if (($.contains(document.body, e.target) || e.target === document.body)&& !$.contains($this[0], e.target)) {
			$this.removeClass('p c v');
			$picker.detach();
		}
	});

}

$(function () {
	$('.areapicker').each(init);
});

}(jQuery));