'use strict';

function draw_logic(){
    for(var entity in core_entities){
        canvas_buffer.fillStyle = core_entities[entity]['color'];
        canvas_buffer.fillRect(
          core_entities[entity]['x'],
          core_entities[entity]['y'],
          core_entities[entity]['width'],
          core_entities[entity]['height']
        );
    }
}

function logic(){
    for(var entity in core_entities){
        core_entities[entity]['rotation'] += rotation_rate * (25 - core_entities[entity]['layer']);
        if(core_entities[entity]['rotation'] >= math_tau){
            core_entities[entity]['rotation'] -= math_tau;
        }else if(core_entities[entity]['rotation'] < 0){
            core_entities[entity]['rotation'] += math_tau;
        }

        core_entities[entity]['x'] = canvas_x_five + core_entities[entity]['layer'] * 10 * Math.cos(core_entities[entity]['rotation']);
        core_entities[entity]['y'] = canvas_y_five + core_entities[entity]['layer'] * 10 * Math.sin(core_entities[entity]['rotation']);
    }

    core_ui_update({
      'ids': {
        'rotation': rotation_rate_display,
      },
    });
}

function repo_init(){
    core_repo_init({
      'keybinds': {
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
      'title': 'QjnyYap.htm',
      'ui': '<input id=ui-rotation>Rotation',
    });
    canvas_init();
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
