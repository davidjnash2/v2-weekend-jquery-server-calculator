const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})
  
let answers = [];

function doMaths(inputs) {
    if (inputs.operator === '+'){
      inputs.result = Number(inputs.num1) + Number(inputs.num2);
    } else if (inputs.operator === '-'){
      inputs.result = Number(inputs.num1) - Number(inputs.num2);          
    } else if (inputs.operator === '*'){
      inputs.result = Number(inputs.num1) * Number(inputs.num2); 
    } else if (inputs.operator === '/') {
      inputs.result = Number(inputs.num1) / Number(inputs.num2);
    }

answers.push(inputs);
}
app.get('/maths', function(req,res) { // start GET
    console.log('GET /maths request made', answers); // log to test
    res.send(answers); // send back answers array as result
  }) // end GET
  
  
  
  app.post('/maths', function(req,res) { // start POST
    let numOne = req.body.numOne; // declare variable for incoming parsed data
    let operator = req.body.operator; // declare variable for incoming parsed data
    let numTwo = req.body.numTwo; // declare variable for incoming parsed data
  
    console.log('POST /maths request made'); // log to test
    console.log('req.body is :', req.body); // log to test
  
    let inputs = { // declare joke object using above values for inputs
      numOne,
      operator,
      numTwo
      }
    answers.push(inputs); // push new jokes to array
    res.sendStatus(201); // send ok to client
  }) // end POST
  



