var length = $('#cubeTransition>div').length,
	current = 1,
	next = 1,
	outClass, inClass, onGoing = false;

$('#cubeTransition>div:eq(' + (current - 1) + ')').show()

function openIndex(i) {
	if (!onGoing && next != i) {
		onGoing = true;
		next = i
		outClass = 'pt-page-moveToLeft'
		inClass = 'pt-page-moveFromRight';
		show()
	}
}

function trans(direction) {
	if (!onGoing) {
		onGoing = true;
		if (direction == 'up') {
			next = current > 1 ? current - 1 : length;
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
		} else {
			next = current < length ? current + 1 : 1;
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
		}
		show();
	}
}

function show() {
	$('#cubeTransition>div:eq(' + (current - 1) + ')').addClass(outClass);
	$('#cubeTransition>div:eq(' + (next - 1) + ')').addClass(inClass);
	$('#cubeTransition>div:eq(' + (next - 1) + ')').show();
	animationOut(current - 1)
	setTimeout(function () {
		$('#cubeTransition>div:eq(' + (current - 1) + ')').hide();
	}, 500)

	setTimeout(function () {
		$('#cubeTransition>div:eq(' + (current - 1) + ')').removeClass(outClass);
		$('#cubeTransition>div:eq(' + (next - 1) + ')').removeClass(inClass);
		animationIn(next - 1)
		current = next;
		onGoing = false;
	}, 800)
}

function changeData(data) {
	var result = [];
	for (var i = 0, len = data.length; i < len; i += 4) {
		result.push(data.slice(i, i + 4));
	}
	$('#cubeTransition>div').remove()
	for (var i = 0; i < result.length; i++) {
		var dp = '';
		if (i > 0) {
			dp = "style=\"display:none;\"";
		}
		var item_div = '<div class="page' + (i + 1) + '" ' + dp + '>';
		for (var j = 0; j < result[i].length; j++) {
			var abilityStr = '';
			var abilityArr = result[i][j].abilityCircle.split(',');
			for (var k = 0; k < abilityArr.length; k++) {
				abilityStr = '<li>' + abilityArr[k] + '</li>';
			}
			item_div = item_div +
				'<div class="item" style="height:' + tr_hight / 2 + 'px;">' +
				'        <img src="' + result[i][j].icon + '" alt="">' +
				'        <span class="detail">' +
				'            <h3>' + result[i][j].name + '</h3>' +
				'            <span class="num">证劵执业资格号：' + result[i][j].certificateNO + '</span>' +
				'                <ul class="clearfix">' +
				abilityStr +
				'                </ul>' +
				'            <span class="p">' +
				'                <p style="color:rgba(0, 0, 0, 1)">' + result[i][j].description + '</p>' +
				'            </span>' +
				'        </span>' +
				'    </div>';
		}
		item_div = item_div + '</div>';
		$('#cubeTransition').append(item_div);
	};
}




$(document).ready(
	function () {
		var timer = setInterval(function () {
			trans('up')

		}, 5000)
		if ($('#cubeTransition>div>div').length > 4) {
			timer

		} else {
			clearInterval(timer)
		};

		setInterval(function () {
			$.ajax({
				url: ip + '/client/financialMaster/getFinancialMasterList?t='+ new Date().getTime(),
				// url: ip + '/client/financialMaster/getFinancialMasterList',
				methods: 'GET',
				data: {
					token: token
				},
				async: false,
				success: function (res) {
					if (res.code == 1 && res.content != []) {
						changeData(res.content);
						if ($('#cubeTransition>div>div').length < 5) {
							clearInterval(timer)
						} else {
							setInterval(function () {
								trans('up')

							}, 5000)
						}
					}
				}
			});
		}, 30*60*1000)

	});