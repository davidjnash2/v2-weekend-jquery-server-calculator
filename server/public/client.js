console.log('clientjs ready! '); // log to test

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived'); // log to test
  $('.equals-button').on('click', postMaths); // event listener for equals button click
  $('.operator-button').on('click', getOperator); // event listener for operator button click
  $('.clear-button').on('click', clearInputs); // event listener for clear button
  getMaths(); // call getMaths function on load to populate DOM with any stored server info
}

let operator; // declare unassigned operator variable 

function getOperator(event){ // start get operator function
  event.preventDefault(); // prevent default browser response
  operator = $(this).closest().button().id(); // select value of this clicked button
  console.log('..and the operator is!', operator); // log to test
} // end getOperator function

function postMaths(event){ // start POST function
  event.preventDefault(); // prevent default browser response
  console.log('in doMaths function'); // log to test
  let numOne = $('#first-number').val(); // capture value from first number input
  let numTwo = $('#second-number').val(); // capture value from second number input
  console.log('equation inputs are:', numOne, operator, numTwo); // log to test
  $.ajax({ // ajax call
    method: 'POST', // POST method
    url: '/maths', // to url maths
    data: {
      numOne,
      operator,
      numTwo
    }, // data object to be sent
  }) // end ajax call
  .then((response) => { // await response from server
    console.log('Response from server.', response); // log response to test
    getMaths(); // call getMaths function to get updated equation list and render to DOM
  })
  .catch((error) => { // error catch
    console.log('Error in POST', error) // log error
    alert('no can do maths rn'); // error alert
  }); // end error catch
} // end postMaths function


function getMaths(){ // start getMaths function
  console.log('in getMaths function'); // log to test
  $.ajax({ // ajax call
    method: 'GET', // GET path from server
    url: '/maths' // at this url
  }) // end ajax call
  .then((response) => { // call back response
    console.log('maths from server are:', response);  // log to test
    renderToDom(response); // update DOM
  })
  .catch((error) => { // error catch
    console.log('Error in GET', error)  // log error
    alert('no can do maths rn'); // error alert
  }); // end error catch
} // end getMaths function

function renderToDom(answers){ // start render function
  $('#answer-area').empty(); // empty answer field
  $('#past-math').empty(); // empty equation history field
  console.log('math history is:', answers)  // log to test
  // loop through answers, and append answer field with this result, and update equation history with full list
  for (let answer of answers){
    $('#answer-area').append(`${answer.length.result-1}`);
    $('#past-math').append(`
      <li>${answer.numOne}${answer.operator}${answer.numTwo}=${answer.result}</li>
  `)};
} // end renderToDom function

function clearInputs(event){
  console.log('in clearInputs function'); // log to test
  event.preventdefault(); // prevent default browser response
  $('#first-number').val(''); // empty first number input
  $('#second-number').val(''); // empty second number input
} // end clearInputs function
