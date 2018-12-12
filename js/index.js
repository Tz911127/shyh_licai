// $(function () {
var ip = 'http://192.168.1.174:9090';
var height = window.screen.height;
var tr_hight = height - 120 - 50;
var token = window.location.search.split('=')[1];
var res;
var onGoing = false,
    current = 1;
$.ajax({
    url: ip + '/client/financialMaster/getFinancialMasterList',
    methods: 'GET',
    data: {
        token: token
    },
    async: false,
    success: function (res) {
        if (res.code == 1) {
            var data = res.content;
            getData(data);
        }
    }
});


function getData(data) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i += 4) {
        result.push(data.slice(i, i + 4));
    }
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



// })