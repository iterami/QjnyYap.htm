'use strict';

function load_data(){
    var loop_counter = 23;
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

    rotate(.005);
}

function rotate(amount){
    rotation_rate += amount;
    rotation_rate_display = (rotation_rate * 1000).toFixed(0);
}