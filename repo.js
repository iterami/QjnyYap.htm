'use strict';

function draw_entity(entity){
    canvas_setproperties({
      'fillStyle': entity.color,
    });
    canvas.fillRect(
      entity.x,
      entity.y,
      entity.width,
      entity.height
    );
}

function move_entity(entity){
    entity.rotation += rotation_rate * (core_storage_data.rings - entity.layer + 1);
    if(entity.rotation >= 6.283185307179586){
        entity.rotation -= 6.283185307179586;
    }else if(entity.rotation < 0){
        entity.rotation += 6.283185307179586;
    }

    const layer = entity.layer * core_storage_data.spread;
    entity.x = canvas_properties.width_half + layer * Math.cos(entity.rotation);
    entity.y = canvas_properties.height_half + layer * Math.sin(entity.rotation);
}

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': draw_entity,
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
      'info': '<button class=medium id=restart type=button>Restart</button>',
      'pointerbinds': {},
      'storage': {
        'rings': 23,
        'spread': 10,
      },
      'storage_controls': true,
      'storage_menu': '<table><tr><td><input class=mini id=rings min=1 step=1 type=number><td>Rings'
        + '<tr><td><input class=mini id=spread step=any type=number><td>Spread</table>',
      'title': 'QjnyYap.htm',
      'ui': '<span id=rotation></span>',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}

function repo_load(){
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

    rotation_rate = .003;
}

function repo_logic(){
    let increase = 0;
    const speed = .0001;
    if(core_keys[core_storage_data.move_up].state
      || core_keys[core_storage_data.move_right].state){
        increase = speed;

    }else if(core_keys[core_storage_data.move_down].state
      || core_keys[core_storage_data.move_left].state){
        increase = -speed;

    }else if(core_pointer.down_0){
        increase = core_pointer.x > canvas_properties.width_half
          ? speed
          : -speed;
    }
    rotation_rate += increase;

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': move_entity,
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
