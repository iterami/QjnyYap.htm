'use strict';

function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    for(var vertex in vertices){
        buffer.fillStyle = vertices[vertex]['color'];
        buffer.fillRect(
          vertices[vertex]['x'],
          vertices[vertex]['y'],
          vertices[vertex]['width'],
          vertices[vertex]['height']
        );
    }

    // Draw rotation_rate_display.
    buffer.fillStyle = '#fff';
    buffer.fillText(
      rotation_rate_display,
      0,
      25
    );

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
        vertices[vertex]['rotation'] += rotation_rate * (25 - vertices[vertex]['layer']);
        if(vertices[vertex]['rotation'] >= tau){
            vertices[vertex]['rotation'] -= tau;
        }else if(vertices[vertex]['rotation'] < 0){
            vertices[vertex]['rotation'] += tau;
        }

        vertices[vertex]['x'] = x + vertices[vertex]['layer'] * 10 * Math.cos(vertices[vertex]['rotation']) - 5;
        vertices[vertex]['y'] = y + vertices[vertex]['layer'] * 10 * Math.sin(vertices[vertex]['rotation']) - 5;
    }
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
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

    buffer.fillStyle = '#fff';
    buffer.font = '23pt sans-serif';
}

var buffer = document.getElementById('buffer').getContext('2d', {
  'alpha': false,
});
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
var height = 0;
var rotation_rate = .005;
var rotation_rate_display = '5';
var tau = Math.PI * 2;
var vertices = [];
var width = 0;
var x = 0;
var y = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // +: increase rotation_rate.
    if(key === 187){
        rotation_rate += .001;

    // -: decrease rotation_rate.
    }else if(key === 189){
        rotation_rate -= .001;

    // ESC: rotation_rate = 0;
    }else if(key === 27){
        rotation_rate = 0;
    }

    rotation_rate_display = (rotation_rate * 1000).toFixed(0);
};

window.onload = function(e){
    resize();

    var loop_counter = 23;
    do{
        var inner_counter = loop_counter;
        do{
            vertices.push({
              'color': random_hex(),
              'height': 10,
              'layer': loop_counter + 1,
              'rotation': inner_counter,
              'width': 10,
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
