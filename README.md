Built with Ionic 2. 

To install:
 - `npm install -g ionic@beta cordova`
 - Clone the repo
 - `npm install`
 - `ionic platform add android` (or ios)
 - `ionic run android` (or ios)

###Android Push Payload Example###

```
{
  "message": "This is a test message. Yay",
  "title": "Hello!",
  "style": "inbox",
  "badge": 0,
  "count": 0,
  "ledColor": [
    0,
    255,
    255,
    255
  ],
  "iconColor": null,
  "icon": null,
  "image": null,
  "summaryText": "There are %n% notifications",
  "content-available": "1",
  "customData": {
    "Id": 1509332204,
    "Type": 1,
    "Title": "Test Title 614",
    "Message": "Hello there!!",
    "DateReceived": "22 April 2016 07:39:57"
  }
}
```

###iOS Push Payload###
```
 {
  "aps": {
    "badge": 0,
    "alert": {
      "title": "Hello!",
      "body": "This is a test message. Yay"
    },
    "sound": "default",
    "customData": {
      "Id": 695608752,
      "Type": 1,
      "Title": "Test Title 615",
      "Message": "Hello there!!",
      "DateReceived": "22 April 2016 07:45:02"
    },
    "content-available": "1"
  }
```
