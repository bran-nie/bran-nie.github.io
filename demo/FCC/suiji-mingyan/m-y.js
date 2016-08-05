  window.onload = function(){

    var colorArr = ["#969", "#09c", "#f66", "#666", "#036", "#c33", "#636", "#903", "#096", "#030", "#399"];
    var quoteArr = [
    	["I don't know why we are here, but I'm pretty sure that it is not in order to enjoy ourselves.","Ludwig Wittgenstein"],
    	["Love means never having to say you're sorry.", "Love Story"],
    	["God is a comedian playing to an audience too afraid to laugh.", "Voltaire"],
    	["时间, 总会不经意的来, 不经意的走, 而你看到了吗?", "执念"],
    	["All are lunatics, but he who can analyze his delusion is called a philosopher.", "Ambrose Bierce"],
    	["The optimist proclaims that we live in the best of all possible worlds, and the pessimist fears this is true.", "James Branch Cabell"],
    	["Show me the money!", "Jerry Maguire"],
    	["It's kind of fun to do the impossible.", "Walt Disney"],
    	["There are no facts, only interpretations.", "Friedrich Nietzsche"]
    ];
    var btn = document.getElementById("new-btn");
      
      var randomColor = colorArr[Math.floor(Math.random() * colorArr.length )];      
      document.body.style.backgroundColor = randomColor;
      document.body.style.color = randomColor;
      document.getElementById("new-btn").style.color = randomColor;

      var randomQuote = Math.floor(Math.random() * quoteArr.length );
      document.getElementById("new-a").innerHTML = quoteArr[randomQuote][0];
      document.getElementById("new-b").innerHTML = quoteArr[randomQuote][1];

    btn.onclick = function(){
    	setColor();
    	setP();
    }
    var setColor = function(){
   	  var randomColor = colorArr[Math.floor(Math.random() * colorArr.length )];
      
      document.body.style.backgroundColor = randomColor;
      document.body.style.color = randomColor;
      document.getElementById("new-btn").style.color = randomColor;
    }

    var setP = function(){
    	var randomQuote = Math.floor(Math.random() * quoteArr.length );

    	document.getElementById("new-a").innerHTML = quoteArr[randomQuote][0];
    	document.getElementById("new-b").innerHTML = quoteArr[randomQuote][1];
    }

    var setA = function(){

    }






  }  