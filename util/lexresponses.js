/**
 * File that handles a generic template for all lex responses. 
 * This can be reused across all intents 
 */

//returns a delegate dialog action
module.exports.delegate = function (type, slots) {
    return {
        dialogAction: {
          type,
          slots
        }
      }
}

module.exports.close = function (type, fulfillmentState, message){
    return {
        dialogAction: {
          type,
          fulfillmentState,
          message
        }
      }
}

module.exports.elicitSlot = function(type, intentName, slotToElicit, slots){
    return {
        dialogAction: {
          type,
          intentName,
          slotToElicit,
          slots
        }
      };
}

