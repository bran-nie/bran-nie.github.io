window.onload=function(){

	var wincishu=0;
	var allcishu=0;

	var jiandao = document.getElementById('jiandao');
	jiandao.onclick=function() {
		document.getElementById("my-result").src = 
		"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg";
		xuanze(suiji());
		setSpan(panduan());
		allcishu+=1;
		ciShu();
		

	}

	var shitou = document.getElementById('shitou');
	shitou.onclick = function() {
		document.getElementById("my-result").src = 
		"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg";
		xuanze(suiji());
		setSpan(panduan());		
		allcishu+=1;
		ciShu();
	}

	var bu = document.getElementById('bu');
	bu.onclick = function() {
		document.getElementById("my-result").src = 
		"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg";
		xuanze(suiji());
		setSpan(panduan());
		allcishu+=1;
		ciShu();
	}

	function suiji(){
		var a = Math.random();
		return a;
	}

	var computerResult = document.getElementById("computer-result");
	function xuanze(number){
		if (number<0.333334) {
			document.getElementById("computer-result").src = 
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg";
		}
			else if (0.333334<number&&number<0.666667) {
				document.getElementById("computer-result").src = 
				"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg";
			}
				else if (number>0.666667) {
					document.getElementById("computer-result").src = 
					"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg";
				}
	}

	function setSpan(id){
		var re = document.getElementById("result");
		if (id==1) {
			re.innerHTML="<font color='#00ff00' size=4>好厉害哦，你赢了！WIN</font>";
		}
		else if (id == 2){
			re.innerHTML="<font color='000000' size=4>差一点就赢了，平局哦~</font>";
		}
		else if (id ==3 ) {
			re.innerHTML="<font color='ff0000' size=4>抱歉，这局你输了呦~~~</font>";
		}
	}


	function panduan(){
		var my = document.getElementById("my-result");
		var cmp = document.getElementById("computer-result");
		if (my.src==
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg") {
			if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg") {
				return 2;
			}
			else if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg") {
				return 3;
			}
			else if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg") {
				wincishu+=1;
				return 1;
			}
		}
		else if (my.src==
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg") {
			if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg") {
				wincishu+=1;
				return 1;
			}
			else if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg") {
				return 2;
			}
			else if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg") {
				return 3;
			}
		}
		else if (my.src==
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg") {
			if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg") {
				return 3;
			}
			else if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg") {
				wincishu+=1;
				return 1;
			}
			else if (cmp.src=="https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg") {
				return 2;
			}
		}
	}
	function ciShu(){
		var ci = document.getElementById("cishu");
		var CI = document.getElementById("CISHU");
		cishu.innerHTML = wincishu;
		CI.innerHTML = allcishu;
	}
	var r = document.getElementById("repeate");
	r.onclick = function(){
		wincishu=0;
		allcishu=0;
		ciShu();
	}
}











