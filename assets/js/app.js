// global variables
const billInput = document.getElementById('bill')
const tipButtons = document.querySelectorAll('.tip-button')
const tipCustom = document.querySelector('.tip-custom')
const zeroNotAllowed = document.getElementById('zero-not-allowed')
const numOfPeopleInput = document.getElementById('num-of-people')
const tipPerPerson = document.querySelector('.tip-per-person')
const totalPerPerson = document.querySelector('.total-per-person')
const resetBtn =  document.querySelector('.reset-btn')

const tipButtonsArr = Array.from(tipButtons)

let tipAmount = 0 // 'tipAmount' has to be set to 0, instead of just declared and not defined, so that the app works when no tip is selected

// keeping 'billInput' input value to no more than two places past the decimal point
billInput.addEventListener('input', function() { // Note: Using the 'change' event instead of the 'input' event would mean 'billInput''s value would get clipped (in accordance with the below conditions) only AFTER the user clicked out of 'billInput'. So using the 'input' event is much better here. MDN: The 'input' event fires when the value of an <input>, <select>, or <textarea> element has been changed.

    // // my solution
    // if (billInput.value.includes('.') && billInput.value.length - 3 !== '.') {
    //     billInput.value = billInput.value.slice(0, billInput.value.indexOf('.') + 3)
    // }

    // Robert's solution
    if (billInput.value.indexOf('.') === billInput.value.length - 4 && billInput.value.length > 3) {
        billInput.value = billInput.value.slice(0, billInput.value.length - 1)
    }
})

// calculating tip amount from the 'tipButtons' inputs and updating textContent of '.each-person-owes' section upon clicking any 'tipButton' input
tipButtonsArr.forEach(tipButton => {
    tipButton.addEventListener('click', calcButtonTip)
})

function calcButtonTip(event) { // remember 'event' here is the 'click' above
    let tipPercStr
    let tipAsDecimalStr

    if (event.target.value.length === 2) {
        tipPercStr = event.target.value.slice(0, 1)
        tipAsDecimalStr = `.0${tipPercStr}`
        tipAsDecimalNum = +tipAsDecimalStr
    } else {
        tipPercStr = event.target.value.slice(0, 2)
        tipAsDecimalStr = `.${tipPercStr}`
        tipAsDecimalNum = +tipAsDecimalStr
    }

    calcTip(tipAsDecimalNum)

    renderWhatEachOwes()
}

// clearing content of 'tipCustom' input upon clicking inside it
tipCustom.addEventListener('click', function() {
    tipCustom.value = ''
})

// keeping 'tipCustom' input value to no more than three places, not allowing '%' to be entered into 'tipCustom' input, and not allowing '.' to be entered into 'tipCustom' input
tipCustom.addEventListener('input', function() {
    if (tipCustom.value.length > 3) { // this condition may not even be necessary, but just to be safe/thorough I'm keeping it
        tipCustom.value = tipCustom.value.slice(0, 3)
    }

    if (tipCustom.value.includes('%')) {
        tipCustom.value = tipCustom.value.slice(0, tipCustom.value.indexOf('%'))
    }

    if (tipCustom.value.includes('.')) {
        tipCustom.value = tipCustom.value.slice(0, tipCustom.value.indexOf('.'))
    }
})

// calculating tip amount from the 'tipCustom' input and updating textContent of '.each-person-owes' section upon clicking out of 'tipCustom' input
tipCustom.addEventListener('change', calcCustomTip)

function calcCustomTip(event) { // remember 'event' here is the 'change' above
    let customTipAsDecimalStr = `.${event.target.value}`
    let customTipAsDecimalNum = +customTipAsDecimalStr

    calcTip(customTipAsDecimalNum)

    renderWhatEachOwes()
}

// calculating tip amount
function calcTip(tipAsDecimal) {
    tipAmount = +billInput.value * tipAsDecimal
}

// creating notification if user enters '0' into 'numOfPeopleInput' input
numOfPeopleInput.addEventListener('input', function() {
    if (numOfPeopleInput.value === '0') {
        zeroNotAllowed.textContent = `Can't be zero`
    } else {
        zeroNotAllowed.textContent = ''
    }
})

// updating textContent of '.each-person-owes' section upon clicking out of 'numOfPeopleInput' input
numOfPeopleInput.addEventListener('change', function() {
    renderWhatEachOwes()
})

// updating textContent of '.each-person-owes' section
function renderWhatEachOwes() {
    tipPerPerson.textContent = (tipAmount / +numOfPeopleInput.value).toFixed(2) // 'toFixed()' returns a string so 'toString()' not necessary
    totalPerPerson.textContent = ((+billInput.value + tipAmount) / +numOfPeopleInput.value).toFixed(2) // 'toFixed()' returns a string so 'toString()' not necessary
}

// resetting values on click of 'resetBtn'
resetBtn.addEventListener('click', function() {
    tipPerPerson.textContent = '0.00'
    totalPerPerson.textContent = '0.00'
})