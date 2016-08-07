  window.onload = function(){
  	var a = document.getElementById('a');
  	a.onclick = function openwin() 
{ 
OpenWindow=window.open("", "newwin", "height=250, width=250,toolbar=no,scrollbars=scroll,menubar=no"); 
//写成一行 
OpenWindow.document.write("<TITLE>例子</TITLE>") ;
OpenWindow.document.write("<BODY   onload='closeit()'>") ;
OpenWindow.document.write("<SCRIPT>function closeit() { setTimeout('self.close()',3000)}<"+"/SCRIPT>");
OpenWindow.document.write("<h1>Hello!你好</h1>"); 
OpenWindow.document.write("New window opened!") ;
OpenWindow.document.write("<a href='http://zhinian.info/demo/learn/6-11/cai.html'>执念</a>");
OpenWindow.document.write("</BODY>") ;
OpenWindow.document.write("</HTML>") ;
OpenWindow.document.close(); 
} 
  }