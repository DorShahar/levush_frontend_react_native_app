import React from 'react'
import Consts from "./Consts"

const AWS = require('aws-sdk');
const S3 = new AWS.S3({ signatureVersion: 'v4' });
const Rekognition = new AWS.Rekognition();

const getLabelNames = async (imageBase64,key) => {
    const params = {
        Image : {
            Bytes: imageBase64
        },
        MaxLabels: Consts.RekognitionMaxLabels,
        MinConfidence: Consts.RekognitionMinConfidence,
    };

    const detectResults = await Rekognition.detectLabels(params).promise();
    const labelNames = detectResults.Labels.map((label) => label.Name);
    return labelNames;
};