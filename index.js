const express = require('express');
//first we initialise a node with node init --yes in cmd
//we insttal express with this command npm i express
//start execution in terminal "node index.js"
//insttal a node package -> nodemon(npm i  -g nodemon) to not go to terminal and say "nodemon index.js"
const app = express();
//const router = express.Router();
// Middleware
app.use(express.json());
const Joi = require('joi');
//pour les fonctions de validation

const jobs = require('./Jobs.json');


app.get('/',(req, res) =>{
    res.send('Hello World!!!!');
});

//define new rond by calling aap.get
app.get('/jobs', (req,res) => {
    res.status(200).json(jobs);
});


//Route Parameters:
/*app.get('/api/jobs/:nom/:ville', (req, res) => {
    res.send(req.params); after executi -> {"nom":"WebDev","ville":"Mostaganem"}
    res.send(req.query);//sortBy=name
});*/

//handelling GET request JOB:

app.get('/jobs/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const job = jobs.find(job => job.id === id);
    if (!job)  res.status(404).send('le Job avec ID donnee  est pas trouve.');
    res.status(200).json(job);
})

/*Post Job avec validation
app.post('/jobs', (req, res) => {
    const shema = {
        title: Joi.string().min(3).required()//le nom est obligatoire et ne doit pas etre inf à 3 charactére
    };
    const result = Joi.validate(req.body, shema);//utilisation de JOI pour les test de validations...
    
    //input validation (la vérification):
    //if(!req.body.nom || req.body.nom.length < 3) {
        //404 ERROUR
        //res.status(400).send('le nom est obligatoire et ne doit pas etre inf à 3 charactére.');
        if(result.error){
            res.status(400).send(result.error.details[0].message);//show error message in potman
            return;
        }
        
    
    const job = {
        id: jobs.length + 1,
        title: req.body.title,
        type: req.body.type,
        type :req.body.type,
        company:req.body.place,
        email :req.body.email,
        phone :req.body.phone,
        address :req.body.address,

    };
    jobs.push(jobs);
    res.send(job);
});*/

//POST
app.post('/jobs', (req,res) => {
    jobs.push(req.body);
    res.status(200).json(jobs);
});

//Put
app.put('/jobs/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let job = jobs.find(parking => parking.id === id)
    job.title =req.body.title,
    job.type =req.body.type,
    job.company =req.body.place,
    job.email =req.body.email,
    job.phone =req.body.phone,
    job.address =req.body.address,
    res.status(200).json(job)
});

//DELETE:
app.delete('/jobs/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let job = jobs.find(job => job.id === id)
    jobs.splice(jobs.indexOf(job),1)
    res.status(200).json(jobs);
});
// envirenement variable for hosting variable (PORT) env:
const port  = process.env.PORT || 3000; 
app.listen(port,() => console.log(`Listenning on port ${port}...`));//SET an envirement variable "SET PORT=5000"