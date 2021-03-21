const { json } = require('body-parser');
const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_Clarifai
  });

const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('Api Error'));
}

const handleImage=(req,res,db)=>{
    const { id } = req.body;
    db('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get Entries'))
}
module.exports={
    handleImage,
    handleApiCall
}