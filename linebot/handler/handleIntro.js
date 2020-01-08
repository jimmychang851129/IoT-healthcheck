/**
  *  introduction handler
  *  all the message, request, events related to introduction are handled by these handler
  */

const { LineHandler } = require('bottender')
const fs = require('fs')
const textDIR = "./handler/response/"

const isSelfIntro = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'selfintro'){ 
    return true
  }
  return false
}

// send introduction message to client
const handleSelfIntro = async context => { 
  data = fs.readFileSync(textDIR+'selfintro.txt')
  try{
    await context.replyText(data.toString())
  }
  catch(error){
    console.log("handleIntro.js-> handleSelfIntro error, error = ",error)
  }
}

const isStrength = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'strength'){ 
    return true
  }
  return false
}

// send strength message to user
const handleStrength = async context => {
  data = fs.readFileSync(textDIR+'strength.txt')
  try{
    await context.replyText(data.toString())
  }
  catch(error){
    console.log("handleIntro.js-> handleStrength error, error = ",error)
  }
}

const isProject = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'project'){
      return true
  }
  return false
}

// send project message to user
const handleProject = async context => {
  data = fs.readFileSync(textDIR+'project.txt')
  try{  
    await context.replyText(data.toString())
  }
  catch(error){
    console.log("handleIntro.js-> handleProject error, error = ",error)
  }
}

const isMotivation = context =>{
  const {event} = context
  if(event.postback.query.req && event.postback.query.req == 'motivation'){ 
    return true
  }
  return false
}

// send motivation message to user
const handleMotivation = async context =>{
  var data = fs.readFileSync(textDIR+'motivation.txt')
  try{
    await context.replyText(data.toString())
  }
  catch(error){
    console.log("handleIntro.js-> handleMotivation error, error = ",error)
  }
}

// create a handler to handle introduction event
module.exports = new LineHandler()
  .on(isSelfIntro,handleSelfIntro)
  .on(isStrength, handleStrength)
  .on(isProject, handleProject)
  .on(isMotivation, handleMotivation)
  .onEvent(context => console.log('Uncaught event:', context.event.rawEvent))
  .build()