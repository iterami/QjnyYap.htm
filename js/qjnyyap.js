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

        core_entities[entity]['x'] = canvas_x + core_entities[entity]['layer'] * 10 * Math.cos(core_entities[entity]['rotation']);
        core_entities[entity]['y'] = canvas_y + core_entities[entity]['layer'] * 10 * Math.sin(core_entities[entity]['rotation']);
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
      'ui': '<span id=ui-rotation></span> Rotation',
    });
    canvas_init();
}

var rotation_rate = 0;
var rotation_rate_display = '';
