
const dispatch = require('../../util/dispatch.js')

describe("Find the next bot action", () => {
    //test stuff 
    test("user decides to get help with login test", () => {
        const name = "LoginIntent";
        const slots = {
            password: null,
            loginOptions: null,
            helpOptions: 'login',
            username: null
          };
        const outputExpected = {
            dialogAction: {
              type: 'Delegate',
              slots: {
                password: null,
                loginOptions: null,
                helpOptions: 'login',
                username: null
              }
            }
          };
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    });

    // list of username questions 
    test("user decides to get help with login and username", () => {
        const name = "LoginIntent";
        const slots = {
            password: null,
            loginOptions: 'username',
            helpOptions: 'login',
            username: null
          };

        const outputExpected = {
            dialogAction: {
              type: 'ElicitSlot',
              intentName: 'LoginIntent',
              slotToElicit: 'username',
              slots: {
                password: null,
                loginOptions: 'username',
                helpOptions: 'login',
                username: null
              }
            }
          };
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    })

    test("user decides to get help with login, username, and remembers authentication answers", () => {
        const name = "LoginIntent";
        const slots = {
            password: null,
            loginOptions: 'username',
            helpOptions: 'login',
            username: 'yes'
          };
        //   "dialogAction":{"type":"Close","fulfillmentState":"Fulfilled",
        //   "message":{"contentType":"PlainText",
        //   "content":"Please click on https://mysite.com/recoverusername and follow instructions to recover username."}}
        const outputExpected = {
            dialogAction: {
              type: 'Close',
              fulfillmentState: 'Fulfilled',
              message: {
                  contentType: 'PlainText',
                  content: 'Please click on https://mysite.com/recoverusername and follow instructions to recover username.'
              }
            }
          };
        //   console.log("Output: " + JSON.stringify(dispatch.getNextActionTypeLogin(name, slots)));
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    })

    test("user decides to get help with login, username, and forgot authentication answers", () => {
        const name = "LoginIntent";
        const slots = {
            password: null,
            loginOptions: 'username',
            helpOptions: 'login',
            username: 'no'
          };
        //   "dialogAction":{"type":"Close","fulfillmentState":"Fulfilled",
        //   "message":{"contentType":"PlainText",
        //   "content":"Please click on https://mysite.com/recoverusername and follow instructions to recover username."}}
        const outputExpected = {
            dialogAction: {
              type: 'Close',
              fulfillmentState: 'Fulfilled',
              message: {
                  contentType: 'PlainText',
                  content: 'Please contact the helpdesk to recover your username.'
              }
            }
          };
        //   console.log("Output: " + JSON.stringify(dispatch.getNextActionTypeLogin(name, slots)));
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    })

    // list of password test cases 
    test("user decides to get help with login and password", () => {
        const name = "LoginIntent";
        const slots = {
            password: null,
            loginOptions: 'password',
            helpOptions: 'login',
            username: null
          };

        const outputExpected = {
            dialogAction: {
              type: 'ElicitSlot',
              intentName: 'LoginIntent',
              slotToElicit: 'password',
              slots: {
                password: null,
                loginOptions: 'password',
                helpOptions: 'login',
                username: null
              }
            }
          };
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    })

    test("user decides to get help with login, password, and remembers authentication answers", () => {
        const name = "LoginIntent";
        const slots = {
            password: 'yes',
            loginOptions: 'password',
            helpOptions: 'login',
            username: null
          };

        const outputExpected = {
            dialogAction: {
              type: 'Close',
              fulfillmentState: 'Fulfilled',
              message: {
                  contentType: 'PlainText',
                  content: 'Please click on https://mysite.com/recoverpwd and follow instructions to recover password.'
              }
            }
          };
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    })

    test("user decides to get help with login, username, and forgot authentication answers", () => {
        const name = "LoginIntent";
        const slots = {
            password: 'no',
            loginOptions: 'password',
            helpOptions: 'login',
            username: null
          };

        const outputExpected = {
            dialogAction: {
              type: 'Close',
              fulfillmentState: 'Fulfilled',
              message: {
                  contentType: 'PlainText',
                  content: 'Please contact the helpdesk to recover your password.'
              }
            }
          };
        //   console.log("Output: " + JSON.stringify(dispatch.getNextActionTypeLogin(name, slots)));
          expect(dispatch.getNextActionTypeLogin(name, slots)).toEqual(outputExpected);
    })

    //Partner Intent Test Scenario for Confirmation 
    test("user opts for a partner inquiry", () => {
        const userName = 'Steve Moskowitz'

        const outputExpected = {
            dialogAction: {
              type: 'Close',
              fulfillmentState: 'Fulfilled',
              message: {
                contentType: "PlainText",
                content: `Thanks ${userName} for contacting Ivory Cloud. Your request has been noted and someone should contact you soon. Have a great day!`
              }
            }
          };
        //   console.log("Output: " + JSON.stringify(dispatch.getNextActionTypeLogin(name, slots)));
          expect(dispatch.fulfillPartnerRequest(userName)).toEqual(outputExpected);
    })
})