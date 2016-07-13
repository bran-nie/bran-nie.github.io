var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

var list = "";
for (var i = 0; i < aqiData.length; i++) {
    for (var j = 0; j < aqiData[i].length; j++) {
     
    }
}
/*(function () {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  

})();
*/

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