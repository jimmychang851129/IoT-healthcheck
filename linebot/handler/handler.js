/**
 * Receive all the events and distribute these events to a specific handler
 * can be thought as a center receiving events and distributing them to a specific handler
 */
const { LineHandler } = require('bottender')
const queryString = require('query-string')
var handleText = require('./handleText.js')
var handleSticker = require('./handleSticker.js')

const isSticker = context =>{
  const {event,session} = context
  console.log("user : ",session,", request: Sticker, info : ",event)
  return event.isSticker
}

const SendIntroList = async context =>{
  const {event,session} = context
  console.log("user : ",session,", request: follow, info : ",event)
  try{
    await context.pushFlex('if the context is not shown, please update your line to LINE 6.7.0 or later version', {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://www.csie.ntu.edu.tw/~b04902092/linebot/engineer.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "NTUEE IOT final project",
              "size": "xl",
              "weight": "bold"
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://www.csie.ntu.edu.tw/~b04902092/favicon.jpeg"
                    },
                    {
                      "type": "text",
                      "text": "Self-aware IoT devices",
                      "weight": "bold",
                      "margin": "sm",
                      "flex": 0
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://www.csie.ntu.edu.tw/~b04902092/favicon.jpeg"
                    },
                    {
                      "type": "text",
                      "text": "Author",
                      "weight": "bold",
                      "margin": "sm",
                      "flex": 0
                    }
                  ]
                }
              ]
            },
            {
              "type": "text",
              "text": "Jimmy",
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xxs"
            }
          ]
        },
        "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "spacer",
            "size": "xxl"
          },
          {
            "type": "button",
            "style": "primary",
            "color": "#00BBFF",
            "action": {
              "type": "uri",
              "label": "View Status",
              "uri": "https://ec2-34-238-131-243.compute-1.amazonaws.com:8000"
            }
          }
        ]
      }
    })
  }
  catch(error){
    console.log("handler.js-> SendIntroList error, error = ",error)
  }
}

// handler that receive all events and distribute it to handler that is in charge
module.exports = new LineHandler()
  .onText(context =>{
    const {event,session} = context
    console.log("user : ",session,", request: Text, info : ",event)
    handleText.resText(context)
  })
  .on(isSticker,context =>{
    handleSticker.resSticker(context)
  })
  .onFollow(SendIntroList)
  .onEvent(context => {
    console.log('Uncaught event:', context.event.rawEvent)
  })
  .build()