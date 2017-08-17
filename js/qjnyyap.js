'use strict';

function draw_logic(){
    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': core_entities[entity]['color'],
            },
          });
          canvas_buffer.fillRect(
            core_entities[entity]['x'],
            core_entities[entity]['y'],
            core_entities[entity]['width'],
            core_entities[entity]['height']
          );
      },
    });
}

function logic(){
    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          core_entities[entity]['rotation'] += rotation_rate * (25 - core_entities[entity]['layer']);
          if(core_entities[entity]['rotation'] >= math_tau){
              core_entities[entity]['rotation'] -= math_tau;
          }else if(core_entities[entity]['rotation'] < 0){
              core_entities[entity]['rotation'] += math_tau;
          }

          core_entities[entity]['x'] = canvas_x + core_entities[entity]['layer'] * 10 * Math.cos(core_entities[entity]['rotation']);
          core_entities[entity]['y'] = canvas_y + core_entities[entity]['layer'] * 10 * Math.sin(core_entities[entity]['rotation']);
      },
    });

    core_ui_update({
      'ids': {
        'rotation': rotation_rate_display,
      },
    });
}

function repo_init(){
    core_repo_init({
      'info': '<input id=reset type=button value=Reset>',
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
      'storage': {
        'rings': 23,
      },
      'storage-menu': '<table><tr><td><input id=rings><td>Rings</table>',
      'title': 'QjnyYap.htm',
      'ui': '<span id=ui-rotation></span> Rotation',
    });
    canvas_init();

    document.getElementById('reset').onclick = function(){
        canvas_setmode({
          'newgame': true,
        });
    };
}

var rotation_rate = 0;
var rotation_rate_display = '';
