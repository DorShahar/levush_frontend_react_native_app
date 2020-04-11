import React from 'react'
import Consts from "./Consts"
import Clarifai from 'clarifai';


const clarifai = new Clarifai.App({apiKey: Consts.Clarifaiֹֹ_API_KEY});
process.nextTick = setImmediate;

const PredictByWorkFlow = async (image) => {
    console.log('--> Predict : PredictByWorkFlow : image' ,image);

    let predictions = await clarifai.models.predict({id:Consts.Clarifaiֹֹ_WorkFlow}, {base64: image.uri});
    console.log('PredictByWorkFlow' ,predictions);
};

const PredictByClarifaiApparelModel = async (image) => {
    console.log('--> Predict : PredictByClarifaiapparelModel : image' ,image.uri);

    let predictions = await clarifai.models.predict(Clarifai.APPAREL_MODEL,{base64: image.uri});
    console.log('PredictByClarifaiapparelModel',predictions);
}

export {PredictByWorkFlow , PredictByClarifaiApparelModel};