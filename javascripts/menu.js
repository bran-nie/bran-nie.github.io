var menu = [
	['就两个网页',
	['demo/learn/6-11/cai.html','猜拳'],
	['demo/learn/6-14/baidu.html', 'copy百度'],
    ['demo/ife/task-1/1-2/1-2.html', '网页布局'],
    ['demo/ife/task-1/1-3/1-3.html', '三栏分局']
	]
];
var list = "";
for (var i = 0; i < menu.length; i++) {
    for (var j = 0; j < menu[i].length; j++) {
        if (j == 0) {
            list += '<div class="myMenu"><dt class="fMenu">' + menu[i][0] + '</dt><div class="sMenu">';
        } else {
            list += '<dd><a href="' + menu[i][j][0] + '" target="_blank">' + j + ")  " + menu[i][j][1] + '</a></dd>';
        }
    }
    list += '</div></div>';
}
list = '<div class="menu"><dl>' + list + '</dl></div>';
window.onload = function () {
    document.body.innerHTML = list;
}