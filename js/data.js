'use strict';

function load_data(){
    var loop_counter = Math.max(
      core_storage_data['rings'] - 1,
      0
    );
    do{
        var inner_counter = loop_counter;
        do{
            core_entity_create({
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

    rotation_rate += .005;
}
