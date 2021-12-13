/**
 * 
 * TODO - Update the build Dialog Action function to indicate that if else logic that is in the handler function of the lambda
 * TODO - Add fulfillment function separately in here 
 * TODO - Include lex responses file and build dialogactions or fulfillment or confirmations using the lex responses templates.
 */

const lexresponses = require('./lexresponses');
/**
 * Function will build the dialog action response to be sent back to lex
 * TODO - Does not account for any validations as such at this point of time. Need to valid all inputs if they are provided as part of each if block.
 * @param {string - ElicitSlot, Delegate, Close, ElicitIntent, or ConfirmIntent} type 
 * @param {object} slots 
 * @param {string - Fulfilled or Failed are valid values } fulfillmentState 
 * @param {object} message 
 * @param {string} intentName 
 * @param {string} slotToElicit 
 * @returns 
 */
const buildDialogAction = function (type, slots, fulfillmentState, message, intentName, slotToElicit){
    console.log('buildDialogAction');
    if(type === 'Delegate'){
        // to delegate the next slot invocation action to lex
          return lexresponses.delegate(type,slots)
        } else if(type === 'Close'){
        // to indicate the intent is fulfilled to lex
          return lexresponses.close(type,fulfillmentState,message)
        } else if(type === 'ElicitSlot'){
          // to explicitly invoke a slot from within the intent - used as an alternative to branching
          return lexresponses.elicitSlot(type,intentName,slotToElicit,slots)
        } else {
          //this is an error condition return the error intent in this situation -- TODO later point in time.
          return lexresponses.delegate(type,slots)
        }
}

/**
 * Determines the next action for the bot 
 * @param {*} loginOptions 
 * @param {*} helpOptions 
 * @param {*} both 
 * @param {*} username 
 * @returns 
 */
module.exports.getNextActionTypeLogin = function (name, slots){
    console.log('getNextActionType');
    let {password,loginOptions,helpOptions,both,username } = slots;
    console.log(`name ${name}  ${helpOptions} ${loginOptions} ${username} ${password} ${both}`);
  
    if(helpOptions && helpOptions.toLowerCase() === 'login' && !loginOptions){
        // Let the user proceed with the slot order as defined in the bot
        console.log(`Delegate: ${buildDialogAction("Delegate",slots)}`);
        return buildDialogAction("Delegate",slots);
    }
    if(helpOptions && helpOptions.toLowerCase() === 'login' && loginOptions && loginOptions.toLowerCase() === 'username')
      {
        if(username && username.toLowerCase() === 'yes'){
          //User has all information required to recover username
          let message= {
            contentType: "PlainText",
            content: "Please click on https://mysite.com/recoverusername and follow instructions to recover username."
          }
          console.log(`Close username: ${buildDialogAction("Close",slots, "Fulfilled", message)}`);
    
          return buildDialogAction("Close",slots, "Fulfilled", message);
    
        }else if(username && username.toLowerCase() === 'no'){
          //User does not have the information required to recover password
          let message= {
            contentType: "PlainText",
            content: "Please contact the helpdesk to recover your username."
          }
          console.log(`Close username: ${buildDialogAction("Close",slots, "Fulfilled", message)}`);      
          return buildDialogAction("Close",slots, "Fulfilled", message)
     
        }else if(!username){
          //Username slot is not yet answered by the user
          console.log(`Elicit Slot username ${buildDialogAction("ElicitSlot", slots,"","" ,name, "username")}`)      
          return buildDialogAction("ElicitSlot", slots,"","" ,name, "username")
    
        }
      }else if(helpOptions && helpOptions.toLowerCase() === 'login' && loginOptions && loginOptions.toLowerCase() === 'password')
      {
        if(password && password.toLowerCase() === 'yes'){
          //User has all information required to recover password
          let message= {
            contentType: "PlainText",
            content: "Please click on https://mysite.com/recoverpwd and follow instructions to recover password."
          }
          console.log(`Close username: ${buildDialogAction("Close",slots, "Fulfilled", message)}`);      
          return buildDialogAction("Close",slots, "Fulfilled", message)      
    
        }else if(password && password.toLowerCase() === 'no'){
          //User does not have the information required to recover password
          //User has all information required to recover password
          let message= {
            contentType: "PlainText",
            content: "Please contact the helpdesk to recover your password."
          }
          console.log(`Close username: ${buildDialogAction("Close",slots, "Fulfilled", message)}`);      
          return buildDialogAction("Close",slots, "Fulfilled", message)       
    
        }else if(!password){
          //Username slot is not yet answered by the user
          console.log(`Elicit Slot username ${buildDialogAction("ElicitSlot", slots,"","" ,name, "password")}`)      
          return buildDialogAction("ElicitSlot", slots,"","" ,name, "password")      
    
        }
      }else {
        console.log(event);
      }
}

/**
 * Fulfill the partner request call 
 * @param {*} intent 
 * @returns 
 */
module.exports.fulfillPartnerRequest = function (name){
    let message= {
        contentType: "PlainText",
        content: `Thanks ${name} for contacting Ivory Cloud. Your request has been noted and someone should contact you soon. Have a great day!`
      }
      return lexresponses.close("Close","Fulfilled", message);
}