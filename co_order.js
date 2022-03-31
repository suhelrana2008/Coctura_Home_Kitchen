"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Md Suhel Rana
   Date:   03/25/2022
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

window.addEventListener("load", function() {
   // variable to provide a quick reference to the form object
   let orderForm = document.forms.orderForm;
   // Go from the form to the element for the orderDate and change its value
   orderForm.elements.orderDate.value = new Date().toDateString();
   // Adjust the focus when the page loads to the model field
   orderForm.elements.model.focus();

   // Call the function to calculate the cost of the order
   calcOrder();

   // Create event handlers for the web form controls when the document loads
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;

   // Create an array of all radio buttons which have a name of "protection"
   let planOptions = document.querySelectorAll('input[name="protection"]');
   // or we can use let planOptions = document.getElementByName("protection");

   // Loop through that array and add event handlers to every radio button
   for (let i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }
});



// Definition of the calcOrder() function
function calcOrder() {
   // Re-establishment to the orderForm variable
   let orderForm = document.forms.orderForm

   // Calculate the initial cost of the order
   let mIndex = orderForm.elements.model.selectedIndex;
   let mCost = orderForm.elements.model.options[mIndex].value;
   let qIndex = orderForm.elements.qty.selectedIndex;
   let quantity = orderForm.elements.qty.options[qIndex].value;

   // Initial cost = model cost X quantity
   let initialCost = mCost * quantity;
   // Now write that initial cost to the web form
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   // Use CSS style selsctors to retrieve the cost of the protection plan
   let pCost = document.querySelector('input[name="protection"]:checked').value * quantity;

   // Now write that protection cost to the web form
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // Calculate the order subtotal
   orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

   // Calculate the sales tax
   let salesTax = 0.05 * (initialCost + pCost);
   // Now write the Sales Tax amount to the web form
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Calculate the cost of the total order
   let totalCost = initialCost + pCost + salesTax;
   // Now write the total cost to the web form
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   // Store the order details in hidden fields
   orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;

   orderForm.elements.protectionName.value = document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

// Definition iof the formatNumber() function
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined,
      {minimumFractionDigits: decimals, 
       maximumFractionDigits: decimals});
}

// Definition of the formartUSCurrency() function
function formatUSCurrency(val) {
   return val.toLocaleString("en-US",
      {style: "currency", currency: "USD"});
}













