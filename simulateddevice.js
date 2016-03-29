'use strict';

var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device-amqp').Message;

var connectionString = 'HostName=SamsIOT.azure-devices.net;DeviceId=Sammy;SharedAccessKey=ry8kTnP9yl236MGvn6vAAsZz0z0tzLrBcVCCvwvqPLI=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function(){
        var windSpeed = 10 + (Math.random() * 4);
        var data = JSON.stringify({ deviceId: 'myDevice', windSpeed: windSpeed});
console.log("Prior to forming new Message " + data);
        var message = Message(data);
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 2000);
  }
};

client.open(connectCallback);

