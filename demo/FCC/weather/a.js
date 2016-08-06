  window.onload = function(){
  	var weatherImg = {
      "阵雨": "http://efdreams.com/data_images/dreams/rain/rain-07.jpg",
      "强阵雨": "http://efdreams.com/data_images/dreams/rain/rain-07.jpg",
      "雷阵雨": "http://efdreams.com/data_images/dreams/rain/rain-07.jpg",
      "多云": "http://cn.best-wallpaper.net/wallpaper/1280x800/1307/Summer-green-fields-cloudy-sky_1280x800.jpg",
      "晴": "http://www.osatsu-pacific.com/wp-content/uploads/2013/03/20130315_135954.jpg",
      "阴":  "http://www.bz55.com/uploads/allimg/140526/137-140526115401.jpg"
    };
    var httpJuheData = "http://op.juhe.cn/onebox/weather/query?cityname=" + remote_ip_info.city + "&dtype=&key=5d412953f54ff67054afd1e1f165dbf5&callback=?";
  	$.getJSON(httpJuheData, function(json){
  		if (json["error_code"] == 0) {

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

  		document.body.style.backgroundImage="url('" + weatherImg[jsoninfo3] + "')";

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

