function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    buffer.save()

    buffer.translate(
      x,
      y
    );

    buffer.fillStyle = '#fff';
    for(var vertex in vertices){
        buffer.fillRect(
          vertices[vertex]['x'],
          vertices[vertex]['y'],
          10,
          10
        );
    }

    buffer.restore();

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    window.requestAnimationFrame(draw);
}

function logic(){
    for(var vertex in vertices){
        vertices[vertex]['rotation'] += .005 * (25 - vertices[vertex]['layer']);

        vertices[vertex]['x'] = vertices[vertex]['layer'] * 10 * Math.cos(vertices[vertex]['rotation']) - 5;
        vertices[vertex]['y'] = vertices[vertex]['layer'] * 10 * Math.sin(vertices[vertex]['rotation']) - 5;
    }
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;
}

var buffer = document.getElementById('buffer').getContext('2d');
var canvas = document.getElementById('canvas').getContext('2d');
var height = 0;
var vertices = [];
var width = 0;
var x = 0;
var y = 0;

window.onload = function(e){
    resize();

    var loop_counter = 23;
    do{
        var inner_counter = loop_counter;
        do{
            vertices.push({
              'layer': loop_counter + 1,
              'rotation': inner_counter,
              'x': 0,
              'y': 0,
            });
        }while(inner_counter--);
    }while(loop_counter--);

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      30
    );
};

window.onresize = resize;
