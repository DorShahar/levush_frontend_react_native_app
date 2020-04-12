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
        console.log('--> Predict : PredictByWorkFlow');

        let predictions = await clarifai.models.predict({id:Consts.Clarifaiֹֹ_WorkFlow}, {base64: base64OfImage});
        console.log('PredictByWorkFlow' ,predictions);
        return predictions;

    } catch (e) {
        console.error('!!! Error in predictByWorkFlow',e)
    }

};

export const predictByClarifaiApparelModel = async (base64OfImage) => {
    try{
        console.log('--> Predict : PredictByClarifaiapparelMode <--');
        const predictions = await clarifai.models.predict(Clarifai.APPAREL_MODEL,base64OfImage);
        // console.log(' ### PredictByClarifaiapparelModel ### ',predictions);
        handlePredictions(predictions);
    } catch (e) {
        console.error('!!! Error in predictByClarifaiApparelModel',e)
    }
}

const handlePredictions = predictions => {
    if(typeof predictions !== 'object') console.log('! no predictions !') ;
    const consepts = predictions.outputs
                     && predictions.outputs[0]
                     && predictions.outputs[0].data
                     && predictions.outputs[0].data.concepts;

    console.log(consepts);

    // consepts.forEach(consept => {
    //         if(consept.value > Consts.Clarifaiֹ_threshold){
    //             console.log(' ------------------------------')
    //             console.log(' | concept is : ', consept.name);
    //             console.log(' ------------------------------')
    //         }
    // });
};

