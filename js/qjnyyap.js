'use strict';

function draw_logic(){
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

function resize_logic(){
    buffer.fillStyle = '#fff';
    buffer.font = '23pt sans-serif';
}

var rotation_rate = .005;
var rotation_rate_display = '5';
var tau = Math.PI * 2;
var vertices = [];

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
    init_canvas();

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
};
