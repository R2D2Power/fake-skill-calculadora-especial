/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Estás en calculadora especial, puedes preguntar por el resultado de alguna suma, resta, multiplicación o división.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type:'Alexa.Presentation.APL.RenderDocument',
                version:'1.4',
                document: require('./APLpages/launcher.json'),
                datasource:{
                    title:"Bienvenido a la calculadora especial"
                }
            })
            .getResponse();
    }
};

const sumarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'sumarIntent';
    },
    handle(handlerInput) {
        const NumSumA = handlerInput.requestEnvelope.request.intent.slots.numSumA.value;
        const NumSumB = handlerInput.requestEnvelope.request.intent.slots.numSumB.value;
        const resultadoSuma = parseInt(NumSumA,10) + parseInt(NumSumB,10);
        const speakOutput = `El resultado de la suma es ${String(resultadoSuma)}` ;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.4',
                document: require('./APLpages/APLsuma.json'),
                datasource: 
                {
                    "helloworldData": {
                        "properties": {
                            "helloText" : "Hello World!"
                        }
                    }
                }
            })
            .getResponse();
    }
};



const restarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'restarIntent';
    },
    handle(handlerInput){
        const NumResA = handlerInput.requestEnvelope.request.intent.slots.numResA.value;
        const NumResB = handlerInput.requestEnvelope.request.intent.slots.numResB.value;
        const resultadoResta = parseInt(NumResA,10) - parseInt(NumResB,10);
        const speakOutput = `El resultado de la resta es ${resultadoResta}`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.4',
                document: require('./APLpages/APLresta.json'),
                datasource:
                {
                    
                }
            })
            .getResponse();
    }
};

const multiplicarIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'multiplicarIntent'
    },
    handle(handlerInput){
        const NumMultA = handlerInput.requestEnvelope.request.intent.slots.numMultA.value;
        const NumMultB = handlerInput.requestEnvelope.request.intent.slots.numMultB.value;
        const resultadoMult = parseInt(NumMultA, 10) * parseInt(NumMultB,10);
        const speakOutput = `El resultado de l multiplicacion es ${resultadoMult}`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.4',
                document: require('./APLpages/APLmult.json'),
                datasource:
                {
                    
                }
                            
            })
            .getResponse();
        
        
    }
};

const dividirIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dividirIntent'
    },
    handle(handlerInput){
        const NumDivA = handlerInput.requestEnvelope.request.intent.slots.numDivA.value;
        const NumDivB = handlerInput.requestEnvelope.request.intent.slots.numDivB.value;
        const resultadoDiv = parseInt(NumDivA, 10) / parseInt(NumDivB,10);
        const speakOutput = `El resultado de la division es ${resultadoDiv}`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.4',
                document: require('./APLpages/APLdiv.json'),
                datasource:
                {
                    
                }
                            
            })
            .getResponse();
        
        
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        sumarIntentHandler,
        restarIntentHandler,
        multiplicarIntentHandler,
        dividirIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();