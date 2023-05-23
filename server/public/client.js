console.log('clientjs ready! '); // log to test

$(document).ready(onReady); // load script on page load

function onReady(){ // start onReady function
  console.log('sir, your jQuery has arrived'); // log to test
  $('.equals-button').on('click', postMaths); // event listener for equals button click
  $('.operator-button').on('click', getOperator); // event listener for operator button click
  $('.clear-button').on('click', clearInputs); // event listener for clear button
  getMaths(); // call getMaths function on load to populate DOM with any stored server info
}

let operator; // declare unassigned operator variable 

function getOperator(event){ // start getOperator event handler 
  event.preventDefault(); // prevent default browser response for click of operator button
  operator = $(this).closest('button').attr('id'); // use this id attribute to get id of clicked operator button
  console.log('..and the operator is!', operator); // log to test
} // end getOperator function

function postMaths(event){ // start POST function
  event.preventDefault(); // prevent default browser response
  console.log('in doMaths function'); // log to test
  let numOne = $('#first-number').val(); // capture value from first number input
  let numTwo = $('#second-number').val(); // capture value from second number input
  console.log('equation inputs are:', numOne, operator, numTwo); // log to test equation
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
  $('#answer-field').empty();
  $('#past-math').empty(); // empty equation history field
  console.log('math history is:', answers)  // log to test
  
  // loop through answers, and append answer field with this result, and update equation history with full list
  for (let i = 0; i < answers.length; i++) {
    $('#answer-field').append(`${answers[i].result}`);
    $('#past-math').append(`
      <li>${answers[i].numOne} ${answers[i].operator} ${answers[i].numTwo} = ${answers[i].result}</li>
  `);};
} // end renderToDom function

function clearInputs(event){ // clearInputs event handler function
  console.log('in clearInputs function'); // log to test
  event.preventdefault(); // prevent default browser response
  $('#first-number').val(''); // empty first number input
  $('#second-number').val(''); // empty second number input
} // end clearInputs function
