const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
// all boilerplate above

  
let answers = []; // empty array to hold results and equations


app.get('/maths', function(req,res) { // start GET function
    console.log('GET /maths', answers); // log to test
    res.send(answers); // send back answers array as result
}) // end GET
  
  
  
app.post('/maths', function(req,res) { // start POST
    console.log('POST /maths at work'); // log to test
    console.log('req.body=', req.body); // log to test

    let numOne = Number(req.body.numOne); // declare variable for incoming parsed data
    let operator = req.body.operator; // declare variable for incoming parsed data
    let numTwo = Number(req.body.numTwo); // declare variable for incoming parsed data
    let result; // declare empty variable to handle result of equation

    // conditional statment to handle equation based on return of operator value
    if (operator === '+'){
        result = numOne + numTwo;
      } else if (operator === '-'){
        result = numOne - numTwo;          
      } else if (operator === '*'){
        result = numOne * numTwo; 
      } else if (operator === '/'){
        result = numOne / numTwo;
    }


    let problem = { // declare problem object using above values for inputs and resulting answer
      numOne,
      operator,
      numTwo,
      result
      }

    console.log('the result proglem data is:', problem);  
    answers.push(problem); // push each new problem to answers array
    res.sendStatus(201); // serve all good to client

}) // end POST maths function
  





app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})