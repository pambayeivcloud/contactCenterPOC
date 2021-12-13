'use strict';
const dispatch = require('./util/dispatch');
const emailHandler = require('./util/emailHandler');

/**
 * Lambda for handling login intent
 * @param {*} event 
 * @returns 
 */
module.exports.login = async (event) => {
  // console.log(JSON.stringify(event));
  let {name, slots} = event.currentIntent;
   // Conversation flow when user picks a help option
  // Call dispatch getNextActionType to figure out the next action for the bot.
  console.log(JSON.stringify(dispatch.getNextActionTypeLogin(name, slots)));
  return dispatch.getNextActionTypeLogin(name, slots);
};

/**
 * Lambda for handling partner query request
 * @param {*} event 
 */
module.exports.partnerQuery = async (event) => {
  const {partnerFirstName, partnerLastName, partnerEmail, partnerContact, partnerQuery} = event.currentIntent.slots;
  const messageBody = `Name: ${partnerFirstName} ${partnerLastName} \n Email: ${partnerEmail} \n Tel: ${partnerContact} \n Query: ${partnerQuery}`;
  const partnerEmailRecipient = process.env.PARTNER_EMAIL_ID;

  try {
    await emailHandler.sendEmail(messageBody, partnerEmailRecipient);
    return dispatch.fulfillPartnerRequest(`${partnerFirstName} ${partnerLastName}`);
  }catch(err){
    console.log(err);
  }
};