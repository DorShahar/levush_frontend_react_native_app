import React from 'react'
import Consts from "./Consts"
import Clarifai from 'clarifai';

//TODO:  [Error: Request failed with status code 400] . dont print base64
let clarifai = null;

(() => {
    clarifai = new Clarifai.App({apiKey: Consts.Clarifaiֹֹ_API_KEY});
    process.nextTick = setImmediate;
})();

export const predictByWorkFlow = async (base64OfImage) => {
    try{
        console.log('*  Predict : PredictByWorkFlow *');
        // const predictions = await clarifai.models.predict(Consts.Clarifaiֹֹ_WorkFlow, base64OfImage);
        // console.log(base64OfImage)
        const predictions = await clarifai.workflow.predict(Consts.Clarifaiֹֹ_WorkFlow,{ base64: base64OfImage});
        //console.log('PredictByWorkFlow' ,predictions);
        handlePredictions1(predictions);

    } catch (e) {
        console.error('!!! Error in predictByWorkFlow',e)
    }
};

export const predictByClarifaiApparelModel = async (base64OfImage) => {
    try{
        console.log('--> Predict : PredictByClarifaiapparelMode <--');
        const predictions = await clarifai.models.predict(Clarifai.APPAREL_MODEL,base64OfImage);
        handlePredictions(predictions);
    } catch (e) {
        console.error('!!! Error in predictByClarifaiApparelModel',e)
    }
}

const handlePredictions1 = pred => {
    console.log('+++++ ',pred.results[0].outputs);
};

const handlePredictions = predictions => {
    if(typeof predictions !== 'object') console.log('! no predictions !') ;
    const concepts = predictions.outputs
                     && predictions.outputs[0]
                     && predictions.outputs[0].data
                     && predictions.outputs[0].data.concepts;

    console.log(concepts);

    const predictedItems = concepts.filter(concept => concept.value > Consts.Clarifaiֹ_threshold);

    console.log(predictedItems);
};

