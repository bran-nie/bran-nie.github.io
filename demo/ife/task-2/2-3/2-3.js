  window.onload = function(){
  	  var number = ["一","二","三","四","五","六","七","八","九","十"];
  	  var data = [];
  	  //提取信息到data数组
  	  function getData(){
  	  	var li = document.getElementById('source').getElementsByTagName('li');
  	  	for (var i = 0; i < li.length; i++) {
  	  		var city = li[i].innerHTML.split("空气质量：")[0];
  	  		var num = li[i].getElementsByTagName('b')[0].innerHTML;
  	  		data.push([city, num]);
  	  	}
  	  	return data;
  	  	/*
  	  	//review one;
  	  	var ul = document.getElementById('source');
  	  	for (var i = 0; i < ul.childElementCount; i++) {
  	  		li = ul.children[i];
  	  		var city = li.innerHTML.split("空气质量：")[0];
  	  		var num = Number(li.innerHTML[0].innerHTML);   //这里的li.innerHTML[0]后面之所以有一个[0], 是因为li也是一个数组类型, 即便只有一个值
  	  		data.push([city, num]);
  	  	}
  	  	return data;
  	  	*/
  	  	
  	  }
  	  // 这个提取信息是我新学到的知识点, 是js和DOM 部分,   
  	  // 其中, var li = document.getElementById('source').getElementsByTagName('li');   var的li是一个数组, 
  	  //即便ul里面只有一个li, 还有, getElementById  和  getElementsByTagName 是有区别的



  	  //给数组排序
  	  function sortData(data){
  	  	data.sort(function(a, b){
  	  		return a[1] - b[1];
  	  	});
  	  	return data;
  	  }

  	  //将排序后的数组输出到指定的html中
  	  function render(data){
  	  	var resort = document.getElementById('resort');
  	  	var str = "";
  	  	for (var i = 0; i < data.length; i++) {
  	  		str += "<li>第" + number[i] + "名: " + data[i][0] + "空气质量：" + "<b>" + data[i][1] + "</b></li>";
  	  	}
  	  	resort.innerHTML = str;
  	  }
  	  function btnHandle() {
 		var aqiData = sortData(getData());
  		render(aqiData);
  		document.getElementById("sort-btn").disabled = true;
}

  	  //设置点击排序
  	  function click(){
  	  	document.getElementById('sort-btn').onclick = btnHandle;
  	  }

  	  click();
  }