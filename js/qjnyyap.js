'use strict';

function draw_logic(){
    for(var vertex in vertices){
        canvas_buffer.fillStyle = vertices[vertex]['color'];
        canvas_buffer.fillRect(
          vertices[vertex]['x'],
          vertices[vertex]['y'],
          vertices[vertex]['width'],
          vertices[vertex]['height']
        );
    }

    // Draw rotation_rate_display.
    canvas_buffer.fillStyle = '#fff';
    canvas_buffer.fillText(
      rotation_rate_display,
      0,
      25
    );
}

function logic(){
    for(var vertex in vertices){
        vertices[vertex]['rotation'] += rotation_rate * (25 - vertices[vertex]['layer']);
        if(vertices[vertex]['rotation'] >= math_tau){
            vertices[vertex]['rotation'] -= math_tau;
        }else if(vertices[vertex]['rotation'] < 0){
            vertices[vertex]['rotation'] += math_tau;
        }

        vertices[vertex]['x'] = canvas_x_five + vertices[vertex]['layer'] * 10 * Math.cos(vertices[vertex]['rotation']);
        vertices[vertex]['y'] = canvas_y_five + vertices[vertex]['layer'] * 10 * Math.sin(vertices[vertex]['rotation']);
    }
}

function resize_logic(){
    canvas_x_five = canvas_x - 5;
    canvas_y_five = canvas_y - 5;
}

function rotate(amount){
    rotation_rate += amount;
    rotation_rate_display = (rotation_rate * 1000).toFixed(0);
}

var canvas_x_five = 0;
var canvas_y_five = 0;
var rotation_rate = 0;
var rotation_rate_display = '';
var vertices = [];

window.onload = function(e){
    canvas_init();
    input_init({
      'keybinds': {
        27: {
          'todo': function(){
              rotate(-rotation_rate);
          },
        },
        65: {
          'todo': function(){
              rotate(-.001);
          },
        },
        68: {
          'todo': function(){
              rotate(.001);
          },
        },
      },
    });

    var loop_counter = 23;
    do{
        var inner_counter = loop_counter;
        do{
            vertices.push({
              'color': '#' + core_random_hex(),
              'height': 10,
              'layer': loop_counter + 1,
              'rotation': inner_counter,
              'width': 10,
              'x': 0,
              'y': 0,
            });
        }while(inner_counter--);
    }while(loop_counter--);

    rotate(.005);
};
