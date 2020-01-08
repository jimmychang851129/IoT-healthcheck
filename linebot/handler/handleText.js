/**
  * Text handler, all messages that are text are handled here
  */

const { LineHandler } = require('bottender')

function RandomNum() {
  min = Math.ceil(1);
  max = Math.floor(5);
  var output = Math.floor(Math.random() * (max - min)) + min
  return output.toString()+'.jpeg'
}

exports.resText = async context =>{
    // send the template message when the text is 自我介紹
    const data = context.event.message.text;
    if("自我介紹".includes(data)){
      try{
        await context.pushTemplate('if the list is not shown, please update your line to LINE 6.7.0 or later version', {
          type: 'buttons',
          thumbnailImageUrl: 'https://www.csie.ntu.edu.tw/~b04902092/linebot/'+RandomNum(),
          imageSize: 'cover',
          title: '個人簡介',
          text: '可以問我以下問題><',
          actions: [
            {
              type: 'postback',
              label: '自我介紹',
              data: 'flowtype=intro&req=selfintro',
            },
            {
              type: 'postback',
              label: '擅長領域',
              data: 'flowtype=intro&req=strength',
            },
            {
              type: 'postback',
              label: '做過專案',
              data: 'flowtype=intro&req=project',
            },
            {
              type: 'postback',
              label: '為何申請Line',
              data: 'flowtype=intro&req=motivation',
            },
          ],
        });
      } 
      catch(error){
        console.log("handleText.js-> resText error, error = ",error)
      }
    }
    // send the ppt if the text contains LineBot的誕生
    else if("LineBot的誕生".includes(data)){
      try{
        await context.replyText("此專案的說明 : https://www.csie.ntu.edu.tw/~b04902092/linebot/LineBotBorn.pdf")
      }
      catch(error){
        console.log("handleText.js-> resText error(LineBot born), error = ",error)
      }
    }
    // not yet handle Orz
    else{
      try{
        await context.replyText("工程師耍廢中，還沒建造其他功能，抱歉QQ")
      }
      catch(error){
        console.log("handleText.js-> resText error(NLP), error = ",error)
      }
    }
}