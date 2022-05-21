let findBtn = document.getElementById("ble-find");
let page = document.getElementsByClassName('page')[0];
let element = document.getElementsByClassName("element");

findBtn.addEventListener('click', e => {
    navigator.bluetooth.requestDevice({'filters': [{'services' : ['673b3bf6-ce60-4ee7-bbc1-065fbfb1fd65']}]})
        .then(device => {
            // Human-readable name of the device.
            console.log(device.name);

            // Attempts to connect to remote GATT Server.
            return device.gatt.connect();
        })
        .then(service => {
            return service.getCharacteristic('8a9a1143-ee50-45ac-b607-3c8354fc7fcf');
        })
        .then(characteristic => {
            // Reading Battery Level…
            return characteristic.readValue();
        })
});

let mouseMovePrevVal = 0;
page.addEventListener('mousemove', e => {
    let value = 0;
    if (e.offsetY > mouseMovePrevVal) {
        value = 1;
    } else {
        value = -1;
    }
    bluIncrementAction(value, thing);
    mouseMovePrevVal = e.offsetY;
});

/**
 *
 * @param {string} direction
 * @param {object} thingObject
 */
let bluIncrementAction = (direction, thingObject) => {
    if (direction == 1) {
        thingObject.value = thingObject.value + thingObject.step;
    } else if (direction == -1 && thingObject.value > 0) {
        thingObject.value = thingObject.value - thingObject.step;
    }
    thingObject.callback(thingObject);
};


let thing = {
    value: 0,
    step: 10,
    selector: "element",
    callback: (thingObject) => {
        document.getElementsByClassName(thingObject.selector)[0].style.height = thingObject.value + "px";
    },
};
