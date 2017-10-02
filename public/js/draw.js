  ////consolee.log('in here', local_data)



(function() {



  var App;
  App = {};
  /*
  	Init 
  */

     $(window).resize(function () {

	location.reload();
		
     });


  App.init = function() {
	
    $('canvas').remove()
	  
    App.canvas = document.createElement('canvas');
    // App.canvas.height = 400;
    // App.canvas.width = 800;

    //consolee.log('in 2 here', local_data[0].canvas.canvas)
/*var myCanvas = document.getElementById('my_canvas_id');
var ctx = myCanvas.getContext('2d');
var img = new Image;
img.onload = function(){
  ctx.drawImage(img,0,0); // Or at whatever offset you like
};
img.src = strDataURI;*/

    //App.canvas.height = 400;
    //App.canvas.width = $('body').width();

    App.canvas.height = 400;
    App.canvas.width = Math.min($('body').width(), 800);

    document.getElementsByTagName('article')[0].appendChild(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    
    //consolee.log(App)
var img = new Image;
img.onload = function(){
  App.ctx.drawImage(img,0,0); // Or at whatever offset you like
};
img.src = local_data[0].canvas.canvas;


    setInterval(function(){
	    App.ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16)
    }, 1000)
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
     //App.socket = io.connect('http://localhost:4000');
     //App.socket = io.connect('https://thawing-fortress-97561.herokuapp.com:4000');
     App.socket = io();
     
     //consolee.log(App)
     
    //App.socket = io.connect('https://community-draw.herokuapp.com:4000');
    App.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type);
    });
    App.draw = function(x, y, type) {
      if (type === "dragstart") {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag") {
        App.ctx.lineTo(x, y);
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
  };
  /*
  	Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX; 
    e.offsetY = e.layerY;
    x = e.offsetX;
    y = e.offsetY;



    // var offset = $("").offset(); 
    var posY = offset.top - $(window).scrollTop(); 
    var posX = offset.left - $(window).scrollLeft();



    App.draw(x, y, type);
	
    //consolee.log(offset, x, y)
    window.can = this;

    var url = document.URL;
    var part = url.substring(url.lastIndexOf('/') + 1);
    //consolee.log(part)


    var canvas = $("canvas")[0].toDataURL(); 
    //consolee.log('canvas');
    ////consolee.log(canvas);

    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type,
      canvas:canvas,
      canvasId:part 
    });
  });
  $(function() {
    return App.init();
  });
}).call(this);

