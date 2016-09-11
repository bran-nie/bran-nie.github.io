  window.onload = function() {
  	var c = document.getElementById('myCanvas');
  	var ctx = c.getContext('2d');
  	var img = document.getElementById('myImg');
  	c.width = img.width; 
    c.height = img.height;
              
    ctx.drawImage(img,0,0,c.width,c.height);   
    //ctx.clearRect(0,0,c.width,c.height);

    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    for (var i = 0; i < imgData.data.length; i+=4) {

    	var r = imgData.data[i];
      var g = imgData.data[i+1];
      var b = imgData.data[i+2];

      var gray = (r*30 + g*59 + b*11 + 50)/100;

      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = gray;
      
      imgData.data[i+3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);


  	

  }