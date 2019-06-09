You can run the bot using these 2 ways:

1. Locally 
    - You must have Docker installed.
    - Template for creating your .env file is the .env.default file here.
    - Change both input and output src parameters in 'docker run' line in runLocal.sh to the folder where this file is. Set Billing and ApiKey parameters according to your Azure Cognitive services resource Endpoint and Key 1 (or 2).
    - Run the runLocal.sh script. 

2. On Cloud
    - Go to https://www.luis.ai/applications , click on 'Import new app', then 'Choose app file (JSON format) ...' and choose movieTicketBookingLuisApp.json from this directory.
    - Set LUIS_APP_ID environment variable value according to new endpoint address (e.g.https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/<LUIS_APP_ID>?...) which can be found at https://www.luis.ai/applications after clicking at the imported app (MovieTicketBooking), 'Manage' and 'Keys and Endpoints'. 
    - Maybe also LUIS_API_HOST_NAME is different. Change it in the similar manner.
    - Click Train and wait for green light at the button.
    - Click Publish and wait for green message.
    - Deploy and run node.js app on some cloud. You can find list of environment variables in the .env.default file here.





HINTS:
    - Programmatic import of LUIS app from json can be found at https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-tutorial-node-import-utterances-csv .