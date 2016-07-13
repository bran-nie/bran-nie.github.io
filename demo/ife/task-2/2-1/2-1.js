window.onload= function(){
		
	var btn = document.getElementById('button');
	var input = document.getElementById("think-input");
	var dis = document.getElementById("think-display");

	btn.onclick=function(){
		dis.innerText = input.value;  //将输入框的值给dis  也就是span标签的文字   inner重写了span
	}

	input.onkeyup = function(evt){
		if (evt.keyCode == 13) {		//检测键盘, 如果按下的是enter(13) 就执行确认填写那个按钮的功能了
			btn.onclick();		
		}
	}
	/*
	function updateDisplay(){
		dis.innerText = parseFloat(input.value);
	}
	btn.onclick = updateDisplay;
	input.onkeyup = function(evt){			//别人的代码.
		if (evt.keyCode == 13) {
			updateDisplay();
		}
	}
	*/


}