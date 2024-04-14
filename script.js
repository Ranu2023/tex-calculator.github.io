document.getElementById('taxCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
  });
  
  function validateForm() {
    const age = document.getElementById('age').value;
    const grossIncome = document.getElementById('grossIncome').value;
    const extraIncome = document.getElementById('extraIncome').value;
    const deductions = document.getElementById('deductions').value;
  
    const errors = [];
  
    if (!age) {
      errors.push({ field: 'age', message: 'This input field is mandatory' });
    }
  
    if (grossIncome === '') {
      errors.push({ field: 'grossIncome', message: 'This input field is mandatory' });
    } else if (isNaN(grossIncome) || grossIncome <= 0) {
      errors.push({ field: 'grossIncome', message: 'Please enter a positive number' });
    }
  
    if (extraIncome !== '' && (isNaN(extraIncome) || extraIncome < 0)) {
      errors.push({ field: 'extraIncome', message: 'Please enter a non-negative number' });
    }
  
    if (deductions !== '' && (isNaN(deductions) || deductions < 0)) {
      errors.push({ field: 'deductions', message: 'Please enter a non-negative number' });
    }
  
    if (errors.length > 0) {
      displayErrors(errors);
    } else {
      calculateTax(age, grossIncome, extraIncome, deductions);
      disableForm();
    }
  }
  
  function displayErrors(errors) {
    errors.forEach(error => {
      const errorElement = document.getElementById(error.field + 'Error');
      errorElement.textContent = '!';
      errorElement.title = error.message;
      errorElement.classList.add('active');
    });
  }
  
  function calculateTax(age, grossIncome, extraIncome, deductions) {
    const overallIncome = parseInt(grossIncome) + parseInt(extraIncome) - parseInt(deductions);
    let taxRate = 0; 
    let taxAmount = 0;
  
    if (overallIncome <= 800000) {
      taxAmount = 0;
    } else {
      let taxableIncome = overallIncome - 800000;
  
      if (age === '<40') {
        taxRate = 0.3;
      } else if (age === '>=40&<60') {
        taxRate = 0.4;
      } else {
        taxRate = 0.1;
      }
  
      taxAmount = taxableIncome * taxRate;
    }
  
    const netIncome = overallIncome - taxAmount; 
  
    const modalContent = `Age: ${age}<br>
                          Gross Annual Income: ${grossIncome}<br>
                          Extra Income: ${extraIncome}<br>
                          Deductions: ${deductions}<br>
                          Overall Income: ${overallIncome}<br>
                          Tax Rate: ${taxRate * 100}%<br>
                          Tax Amount: ${taxAmount.toFixed(2)} Lakhs<br>
                          Net Income (After Tax): ${netIncome.toFixed(2)} Lakhs`;
  
    showModal(modalContent);
  }
  
  

  function showModal(content) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = content;
    modal.style.display = 'block';
  
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', function() {
      resetForm();
      modal.style.display = 'none';
    });
    modalContent.appendChild(resetButton);
  }
  
  
  function disableForm() {
    const form = document.getElementById('taxCalculatorForm');
    form.classList.add('disabled');
  }
  
  function resetForm() {
    const form = document.getElementById('taxCalculatorForm');
    form.reset();
    form.classList.remove('disabled');
  
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(errorElement => {
      errorElement.textContent = '';
      errorElement.classList.remove('active');
    });
  }
  