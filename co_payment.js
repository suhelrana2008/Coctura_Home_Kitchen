"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: Md Suhel Rana
   Date:   03/28/2022
   
   Filename: co_payment.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateMonth()
      Validates that the user has selected the expiration month of the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

// Run an anonymous function when the script loads
window.addEventListener("load", function() {
   // Retrive and store field/value pairs from the URL
   let formData = location.search.slice(1);
   // Update fromData replacing the "+" with a space
   formData = formData.replace(/\+/g, " ");
   // Update formData again replacing any URI components with regular characters
   formData = decodeURIComponent(formData);
   // Split the formData string anywhere that there is an "=" or "&"
   let formFields = formData.split(/[&=]/g);


   // Write the field values from the array to the order form
   document.forms.order.elements.orderDate.value = formFields[1];
   document.forms.order.elements.modelName.value = formFields[5];
   document.forms.order.elements.qty.value = formFields[7];
   document.forms.order.elements.initialCost.value = formFields[9];
   document.forms.order.elements.protectionName.value = formFields[13];
   document.forms.order.elements.protectionCost.value = formFields[15];
   document.forms.order.elements.subtotal.value = formFields[17];
   document.forms.order.elements.salesTax.value = formFields[19];
   document.forms.order.elements.totalCost.value = formFields[21];   
});

// Another anonymous function that runs when the document loads
   window.addEventListener("load", function() {
   document.getElementById("subButton").onclick =runSubmit;
   document.getElementById("cardName").oninput = validateName;
   document.getElementById("cardNumber").oninput = validateNumber;   
   document.getElementById("expMonth").onchange = validateMonth;
   document.getElementById("expYear").onchange = validateYear;
   document.getElementById("cvc").oninput = validateCVC;       
});  

// Definition of the runSubmit() function
function runSubmit() {
   // This function runs all separate validation based function
   validateName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}

// Definition of the validateName() function
function validateName() {
   let cardName = document.getElementById("cardName");
   if (cardName.validity.valueMissing) {
      cardName.setCustomValidity("Enter your name as it appears on the card");
   } else {
      cardName.setCustomValidity("");
   }
}

// Definition of the validateCredit() function
function validateCredit() {
   let creditCard = document.forms.payment.elements.credit[0];
   if (creditCard.validity.valueMissing) {
      creditCard.setCustomValidity("Select your credit card");
   } else {
      creditCard.setCustomValidity("");
   }
}

// Definition of the validateNumber() function
function validateNumber() {
   let cardNumber = document.getElementById("cardNumber");
   if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity("Please enter your card number!");
   } else if (cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity("Please enter a valid card number!");
   } else {
      cardNumber.setCustomValidity("");
   }
}

// Defintion of the validateMonth() function
function validateMonth () {
   let cardMonth = document.getElementById("expMonth");
   if (cardMonth.selectedIndex === 0) {
      cardMonth.setCustomValidity("Please select the expiration month");      
   } else {
      cardMonth.setCustomValidity("");
   }
}

// Definition of the validateYear() function
function validateYear () {
   let cardYear = document.getElementById("expYear");
   if (cardYear.selectedIndex === 0) {
      cardYear.setCustomValidity("Please select the expiration year");      
   } else {
      cardYear.setCustomValidity("");
   }
}

// Definition of the validateCVC() function line 142
function validateCVC() {
   let cardCVC = document.getElementById("cvc");
   let creditCard = document.querySelector("input[name='credit']:checked");

   if (cardCVC.validity.valueMissing) {
      cardCVC.setCustomValidity("Please enter your CVC number!");
   } else if ((creditCard.value === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Please enter a 4-digit CVC number");
   } else if ((creditCard.value !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Please enter a 3-digit CVC number");
   } else {
      cardCVC.setCustomValidity("");
   }
}









