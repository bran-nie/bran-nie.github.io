  window.onload =function () {
    var aqiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
    ];
    var num = ["一","二","三","四","五","六","七","八","九","十"];

/*    

    var str = "";
    var aqiData1 = aqiData.filter(function(val){
      return val[1] >60;            //val[1] 是指的 aqiData[][1]的值;
                    //filter方法, filter 方法用来迭代一个数组，并且按给出的条件过滤出符合的元素。
                    //filter 方法传入一个回调函数，这个回调函数会携带一个参数，参数为当前迭代的项（我们叫它 val ）。
                    //回调函数返回 true 的项会保留在数组中，返回 false 的项会被过滤出数组。
    });
    aqiData1.sort(function(a, b){
      return b[1] - a[1];
                    //使用 sort 方法，你可以很容易的按字母顺序或数字顺序对数组中的元素进行排序。
                    //与我们之前用的数组方法仅仅返回一个新数组不同， sort 方法将改变原数组，返回被排序后的数组。
                    //sort 可以把比较函数作为参数传入。比较函数有返回值，当 a 小于 b，返回一个负数；当 a 大于 b ，返回一个正数；相等时返回0。
                    //如果没有传入比较函数，它将把值全部转成字符串，并按照字母顺序进行排序
    });
    for (var i = 0; i < aqiData1.length; i++) {
      str += "<li>第" + num[i] + "名： " + aqiData1[i][0] + ", " + aqiData1[i][1] + "</li>";
    }
    document.getElementById("aqi-list").innerHTML = str;
*/
 /* 
    //简写方式
    var str = "";

    aqiData.filter(function(val){return val[1] > 60 })
           .sort(function(a, b){ return b[1] - a[1];})
           .forEach(function(c, d){
             str += "<li>第" + num[d] + "名： " + c[0] + ", " + c[1] + "</li>";  //forEach array没有这个方法, 是for in 的变形
           });
    document.getElementById("aqi-list").innerHTML = str;
*/
        var arr1 = [];
        for ( var i = 0; i < aqiData.length; i++) {
          if(aqiData[i][1]>60){
            arr1.push(aqiData[i]);
          }
        }
        arr1.sort(function(a,b){
            return b[1] - a[1];
        });
        var str = "";
        for (var j = 0; j < arr1.length; j++) {
          str += "<li>第" + num[j] + "名： " + arr1[j][0] + ", " + arr1[j][1] + "</li>";
        }
        
        document.getElementById("aqi-list").innerHTML = str;


  }