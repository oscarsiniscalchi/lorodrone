// connect to the socket server
document.addEventListener('DOMContentLoaded',function(){

	var socket = io.connect('0.0.0.0:3000/stream'); 
	var canvas = document.getElementById('stream');
	var ctx = canvas.getContext('2d');

	socket.on('getstream', function (data) {
		var imgData = ctx.createImageData(canvas.width, canvas.height);
		for (var i=0;i<imgData.data.length;i+=1)
		  {
		    imgData.data[i+0]=data.data[i+0];
		  }
		ctx.putImageData(imgData, 0,0);
	});
})