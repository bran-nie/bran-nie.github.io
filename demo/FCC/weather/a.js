  window.onload = function(){
  	//图片库
  	var weatherImg = {
      "阵雨": "http://efdreams.com/data_images/dreams/rain/rain-07.jpg",
      "强阵雨": "http://efdreams.com/data_images/dreams/rain/rain-07.jpg",
      "雷阵雨": "http://efdreams.com/data_images/dreams/rain/rain-07.jpg",
      "多云": "http://cn.best-wallpaper.net/wallpaper/1280x800/1307/Summer-green-fields-cloudy-sky_1280x800.jpg",
      "晴": "http://www.osatsu-pacific.com/wp-content/uploads/2013/03/20130315_135954.jpg",
      "阴":  "http://www.bz55.com/uploads/allimg/140526/137-140526115401.jpg"
    };

    //本js所用的获取ip地址, 用的是新浪的API: http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js  
    //获取ip地址所在的城市, 且把请求到的json数据赋值给httpJuhedata,  
    var httpJuheData = "http://op.juhe.cn/onebox/weather/query?cityname=" + remote_ip_info.city + "&dtype=&key=5d412953f54ff67054afd1e1f165dbf5";

    //读取从服务器获取的json数据, 
  	$.getJSON(httpJuheData, function(json){

  		//if判断, 判断的是错误码,  几种类型的返回的错误码.
  		if (json["error_code"] == 0) {

  		//这些都是将需要的数据, 在一个json数据里读取并赋值给一个变量.
  		var jsoncity = json["result"]["data"]["realtime"]["city_name"];

  		var jsonday1 = json["result"]["data"]["realtime"]["date"];
  		var jsonday2 = json["result"]["data"]["realtime"]["moon"];
  		var jsonday3 = "星期" + json["result"]["data"]["weather"][0]["week"];

  		var jsoninfo1 = json["result"]["data"]["realtime"]["wind"]["direct"] + " " +json["result"]["data"]["realtime"]["wind"]["power"];
  		var jsoninfo2 = "湿度 : " + json["result"]["data"]["realtime"]["weather"]["humidity"] + "%";
  		var jsoninfo3 = json["result"]["data"]["realtime"]["weather"]["info"];
  		var jsoninfo4 = json["result"]["data"]["realtime"]["weather"]["temperature"] + "&#8451";
  		var jsoninfo5 = "空气质量: " + json["result"]["data"]["pm25"]["pm25"]["quality"];
  		var jsoninfo6 = "最新发布: " + json["result"]["data"]["realtime"]["time"];

  		var jsonlife1 = "穿衣: " + json["result"]["data"]["life"]["info"]["chuanyi"][1];
  		var jsonlife2 = "空调: " + json["result"]["data"]["life"]["info"]["kongtiao"][1];
  		var jsonlife3 = "运动: " + json["result"]["data"]["life"]["info"]["yundong"][1];
  		var jsonlife4 = "紫外线: " + json["result"]["data"]["life"]["info"]["ziwaixian"][1];

  		//用js 输出html的标记文本, 主要是应用在重复性的标签当中, 比如下面的ul li. 
  		//这个for循环输出了一个字符串, 且这个字符串是带有html标签的, 所以可以被解析,    for循环的作用是列出一周的天气情况.
  		var str = "";
  		for (var i = 0; i < json["result"]["data"]["weather"].length; i++) {
  			str += "<li class='w-future-ul-li'>";
  			str += "<ul class='w-future-ul-li-ul'>";
  			str += "<li class='w-future-ul-li-ul-li'>" + json["result"]["data"]["weather"][i]["date"] + "</li>";
  			str += "<li class='w-future-ul-li-ul-li'>" + json["result"]["data"]["weather"][i]["info"]["night"][2] + "-"+ json["result"]["data"]["weather"][i]["info"]["day"][2] + "</li>";
  			str += "<li class='w-future-ul-li-ul-li'>" + json["result"]["data"]["weather"][i]["info"]["night"][1] + "-"+ json["result"]["data"]["weather"][i]["info"]["day"][1] + "</li>";
  			str += "</ul> </li>";
  			document.getElementById("w-future-ul").innerHTML = str;
  		}

  		//下面这些document 是根据id 更新内容
  		document.getElementById('city').innerHTML = jsoncity;

  		document.getElementById('day1').innerHTML = jsonday1;
  		document.getElementById('day2').innerHTML = jsonday2;
  		document.getElementById('day3').innerHTML = jsonday3;

  		document.getElementById('w-info1').innerHTML = jsoninfo1;
  		document.getElementById('w-info2').innerHTML = jsoninfo2;
  		document.getElementById('w-info3').innerHTML = jsoninfo3;
  		document.getElementById('w-info4').innerHTML = jsoninfo4;
  		document.getElementById('w-info5').innerHTML = jsoninfo5;
  		document.getElementById('w-info6').innerHTML = jsoninfo6;

  		document.getElementById('life-yi').innerHTML = jsonlife1;
  		document.getElementById('life-kt').innerHTML = jsonlife2;
  		document.getElementById('life-yd').innerHTML = jsonlife3;
  		document.getElementById('life-zyx').innerHTML = jsonlife4;

  		//这个document是更换背景图片, 它根据当前在json数据中得到的天气, 来在图片库里面选择照片的.图片库也是一个json数据
  		document.body.style.backgroundImage="url('" + weatherImg[jsoninfo3] + "')";

  		//弹出框, 一个页面.
  		document.getElementById('about').onclick =  function openwin() { 
          window.open ("about.html", "newwindow", "height=300, width=700, top=100, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
        }

        //效果与动画 
  		//$("#line").
  		$("#city").animate({
  				width: '300px',
  				fontSize: '80px'
  			}, 3000);

  		$("#line1").click(function(){
  			$("#life-ul").toggle(1000);
  		});
  		$("#line2").click(function(){
  			$("#city").animate({
  				height: 'toggle'
  			}, 1000);
  		});
  		$("#line3").click(function(){
  			$("#city").addClass("animated hinge");		
  		});
  		$("#line4").click(function(){
  			$("#future").addClass("animated bounce");
  		});

  		}
  		else if (json["error_code"] == 207301) {
  			document.getElementById("today-weather").innerHTML = json["reason"];
  			document.body.style.backgroundImage="url('http://cn.best-wallpaper.net/wallpaper/m/1608/Cebu-Philippines-beach-tropical-palm-trees-resort_m.jpg')";
  		}
  		else if (json["error_code"] == 207302) {
  			document.getElementById("today-weather").innerHTML = json["reason"];	
  			document.body.style.backgroundImage="url('http://cn.best-wallpaper.net/wallpaper/m/1608/Cebu-Philippines-beach-tropical-palm-trees-resort_m.jpg')";
  		}
  		else if (json["error_code"] == 207303) {
  			document.getElementById("today-weather").innerHTML = json["reason"];
  			document.body.style.backgroundImage="url('http://cn.best-wallpaper.net/wallpaper/m/1608/Cebu-Philippines-beach-tropical-palm-trees-resort_m.jpg')";
  		}

  	});
  }

