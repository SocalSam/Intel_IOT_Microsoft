'use strict';
var iothub = require('azure-iothub');
// The following line uses the HostName you get from your Azure account 
// Generate an Azure IoT Hub, you get one free, use that one, and you only get one free Azure IoT Hub
// The connection string is found under the "iothubowner" Blade that is located using the following sequence:
// \/Blade\/	  \/Button\/	  \/Blade\/	\/General\/		\/Blade\/           \/Policy\/     \/Blade\/      \/TextBlock\/     
// Azure IOT Hub/All Settings --> Settings/Share Access policies --> Share Access Policies/iothubowner --> iothubowner/"Connection string--primary key" 
// In Azure: Copy the connection string onto the clipboard
/* var connectionString = 'Paste the connection string here'; */
// Working Example (example of poor security)
var connectionString = 'HostName=SamsIOT.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=ry8kTnP9yl236MGvn6vAAsZz0z0tzLrBcVCCvwvqPLI=';
var registry = iothub.Registry.fromConnectionString(connectionString);
var device = new iothub.Device(null);
// Now create your device name
/* device.deviceId = 'Enter your device name here'; */
// Working Example: 
device.deviceId = 'Sammy';
/********************************************************/
registry.create(device, function(err, deviceInfo, res) {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
});

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device id: ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.SymmetricKey.primaryKey);
  }
}