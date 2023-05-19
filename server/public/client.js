console.log('clientjs ready! ');

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived');
  $('#equals-button').on('click', postMaths);
  $('#calculator-form').on('click', getOperator);
  getMaths();
}

let operator;

function getOperator(event){
  event.preventDefault();
  operator=$(this).text;
  console.log('..and the operator is!', operator);
} // end getOperator function

function postMaths(event){
  event.preventDefault();
  console.log('in doMaths function');
  let numOne = $('#first-number').val();
  let numTwo = $('#second-number').val();
  console.log(numOne, operator, numTwo);
  $.ajax({
    method: 'POST',
    url: '/maths',
    data: {
      numOne,
      operator,
      numTwo
    },
  })
  .then(function(response) {
    console.log('Response from server.', response);
    getMaths();
  })
  .catch(function(error) {
    console.log('Error in POST', error)
    alert('no can do maths rn');
  });
} // end postMaths function

function clearInputs(event){
  console.log('in clearInputs function');
  event.preventdefault();
  $('#first-number').val('');
  $('#second-number').val('');
} // end clearInputs function

function getMaths(){
  console.log('in getMaths function');
  $.ajax({
    method: 'GET',
    url: '/maths',
  })
  .then(function(response) {
    console.log('maths from server are:', response);
    renderToDom(response);
  })
  .catch(function(error) {
    console.log('Error in GET', error)
    alert('no can do maths rn');
  });
} // end getMaths function

function renderToDom(answers){
  $('#answer-area').empty();
  $('#past-math').empty();

  console.log('math history is:', answers)
  for (let answer of answers){
      $('#past-math').append(`
      <li>${answer.numOne}${answer.operator}${answer.numTwo}=${answer.result}</li>
  `)}
} // end renderToDom function