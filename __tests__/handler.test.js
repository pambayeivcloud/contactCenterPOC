const handler = require('../handler.js')

describe("Find the next bot action", () => {
    //test stuff 
    test("user seeks help with login", async () => {
        //TODO -- Need to write a test for the login intent
        const event = {
          "messageVersion": "1.0",
          "invocationSource": "DialogCodeHook",
          "userId": "lunrg91bt3rkp1bvp456d9gt6o0io9ao",
          "sessionAttributes": {},
          "requestAttributes": null,
          "bot": {
              "name": "IvoryCloudBot",
              "alias": "$LATEST",
              "version": "$LATEST"
          },
          "outputDialogMode": "Text",
          "currentIntent": {
              "name": "LoginIntent",
              "slots": {
                  "password": null,
                  "loginOptions": null,
                  "helpOptions": "login",
                  "username": null
              },
              "slotDetails": {
                  "password": null,
                  "loginOptions": null,
                  "helpOptions": {
                      "resolutions": [
                          {
                              "value": "Login"
                          }
                      ],
                      "originalValue": "login"
                  },
                  "username": null
              },
              "confirmationStatus": "None",
              "nluIntentConfidenceScore": 1
          },
          "alternativeIntents": [
              {
                  "name": "GreetingIntent",
                  "slots": {},
                  "slotDetails": {},
                  "confirmationStatus": "None",
                  "nluIntentConfidenceScore": 0.13
              },
              {
                  "name": "AMAZON.FallbackIntent",
                  "slots": {},
                  "slotDetails": {},
                  "confirmationStatus": "None",
                  "nluIntentConfidenceScore": null
              },
              {
                  "name": "PartnerInquiryIntent",
                  "slots": {
                      "partnerEmail": null,
                      "partnerQuery": null,
                      "partnerContact": null,
                      "partnerFirstName": null,
                      "partnerLastName": null
                  },
                  "slotDetails": {
                      "partnerEmail": null,
                      "partnerQuery": null,
                      "partnerContact": null,
                      "partnerFirstName": null,
                      "partnerLastName": null
                  },
                  "confirmationStatus": "None",
                  "nluIntentConfidenceScore": 0.05
              }
          ],
          "inputTranscript": "I need help with login",
          "recentIntentSummaryView": [
              {
                  "intentName": "GreetingIntent",
                  "checkpointLabel": null,
                  "slots": {},
                  "confirmationStatus": "None",
                  "dialogActionType": "Close",
                  "fulfillmentState": "Fulfilled",
                  "slotToElicit": null
              }
          ],
          "sentimentResponse": null,
          "kendraResponse": null
      };
      const output = {
        "dialogAction": {
            "type": "Delegate",
            "slots": {
                "password": null,
                "loginOptions": null,
                "helpOptions": "login",
                "username": null
            }
        }
      }
      expect(await handler.login(event)).toEqual(output)
    
    });

})