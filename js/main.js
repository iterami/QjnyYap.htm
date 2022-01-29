'use strict';

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': entity_entities[entity]['color'],
            },
          });
          canvas_buffer.fillRect(
            entity_entities[entity]['x'],
            entity_entities[entity]['y'],
            entity_entities[entity]['width'],
            entity_entities[entity]['height']
          );
      },
    });
}

function repo_logic(){
    if(core_keys[core_storage_data['move-↑']]['state']){
        rotation_rate += .0001;
    }
    if(core_keys[core_storage_data['move-↓']]['state']){
        rotation_rate -= .0001;
    }

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          entity_entities[entity]['rotation'] += rotation_rate * (core_storage_data['rings'] - entity_entities[entity]['layer'] + 1);
          if(entity_entities[entity]['rotation'] >= math_tau){
              entity_entities[entity]['rotation'] -= math_tau;
          }else if(entity_entities[entity]['rotation'] < 0){
              entity_entities[entity]['rotation'] += math_tau;
          }

          entity_entities[entity]['x'] = canvas_properties['width-half'] + entity_entities[entity]['layer'] * 10 * Math.cos(entity_entities[entity]['rotation']);
          entity_entities[entity]['y'] = canvas_properties['height-half'] + entity_entities[entity]['layer'] * 10 * Math.sin(entity_entities[entity]['rotation']);
      },
    });

    core_ui_update({
      'ids': {
        'rotation': core_round({
          'decimals': 4,
          'number': rotation_rate,
         }),
      },
    });
}

function repo_init(){
    core_repo_init({
      'events': {
        'restart': {
          'onclick': core_repo_reset,
        },
      },
      'globals': {
        'rotation_rate': 0,
      },
      'info': '<input id=restart type=button value=Restart>',
      'reset': canvas_setmode,
      'storage': {
        'rings': 23,
      },
      'storage-menu': '<table><tr><td><input id=rings min=1 type=number><td>Rings</table>',
      'title': 'QjnyYap.htm',
      'ui': '<span id=rotation></span> Rotation',
    });
    canvas_init();
}
