'use strict';

function load_data(){
    let loop_counter = Math.floor(Math.max(
      core_storage_data.rings - 1,
      0
    ));
    do{
        let inner_counter = loop_counter;
        do{
            entity_create({
              'properties': {
                'color': '#' + core_random_hex(),
                'height': 10,
                'layer': loop_counter + 1,
                'rotation': inner_counter,
                'width': 10,
              },
            });
        }while(inner_counter--);
    }while(loop_counter--);

    rotation_rate = .005;
}

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'fillStyle': entity.color,
          });
          canvas.fillRect(
            entity.x,
            entity.y,
            entity.width,
            entity.height
          );
      },
    });
}

function repo_init(){
    core_repo_init({
      'events': {
        'restart': {
          'onclick': canvas_setmode,
        },
      },
      'globals': {
        'rotation_rate': 0,
      },
      'info': '<button id=restart type=button>Restart</button>',
      'pointerbinds': {},
      'storage': {
        'rings': 23,
      },
      'storage_controls': true,
      'storage_menu': '<table><tr><td><input class=mini id=rings min=1 step=1 type=number><td>Rings</table>',
      'title': 'QjnyYap.htm',
      'ui': '<span id=rotation></span>',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}

function repo_logic(){
    let increase = 0;
    const speed = .0001;
    if(core_keys[core_storage_data['move-↑']].state
      || core_keys[core_storage_data['move-→']].state){
        increase = speed;

    }else if(core_keys[core_storage_data['move-↓']].state
      || core_keys[core_storage_data['move-←']].state){
        increase = -speed;

    }else if(core_pointer['down-0']){
        increase = core_pointer.x > canvas_properties.width_half
          ? speed
          : -speed;
    }
    rotation_rate += increase;

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          entity.rotation += rotation_rate * (Math.floor(core_storage_data.rings) - entity.layer + 1);
          if(entity.rotation >= 6.283185307179586){
              entity.rotation -= 6.283185307179586;
          }else if(entity.rotation < 0){
              entity.rotation += 6.283185307179586;
          }

          entity.x = canvas_properties.width_half + entity.layer * 10 * Math.cos(entity.rotation);
          entity.y = canvas_properties.height_half + entity.layer * 10 * Math.sin(entity.rotation);
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
