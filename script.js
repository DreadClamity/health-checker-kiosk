/* 
  Health Self-Check Kiosk — script.js 
  Demonstrates the three required control structures:
  - if-else / else-if -> field validation
  - switch-case -> BMI category, message, and color
  - loop (forEach) -> rendering the submission history list
*/

// Paste your deployed Google Apps Script Web App URL here (Part E of the lab).
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzD4H-LEi3o6NZnfFsWZhwBsN3hrNKT2UH0e43tLXakazbF-1vvpcKqF2QlMrh_WXqc/exec';

const form = document.getElementById('bmiForm');
const formError = document.getElementById('formError');
const resultCard = document.getElementById('resultCard');
const resultTitle = document.getElementById('resultTitle');
const resultBmi = document.getElementById('resultBmi');
const resultMessage = document.getElementById('resultMessage');
const historyList = document.getElementById('historyList');

// Local array holding this session's submissions — used by the loop below.
const submissionHistory = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const sex = document.getElementById('sex').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    /* ---------------------------------------------------------------
       if-else / else-if: validate each field, one at a time.
    --------------------------------------------------------------- */
    let error = '';
    if (!name) {
        error = 'Please enter your full name.';
    } else if (isNaN(age) || age < 1 || age > 120) {
        error = 'Please enter a valid age between 1 and 120.';
    } else if (!sex) {
        error = 'Please select your sex.';
    } else if (isNaN(weight) || weight <= 0 || weight > 400) {
        error = 'Please enter a valid weight in kilograms.';
    } else if (isNaN(heightCm) || heightCm <= 0 || heightCm > 250) {
        error = 'Please enter a valid height in centimeters.';
    }

    if (error) {
        formError.textContent = error;
        formError.classList.remove('hidden');
        resultCard.classList.add('hidden');
        return;
    }

    formError.classList.add('hidden');

    // BMI = weight (kg) ÷ [height (m)]²
    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    /* ---------------------------------------------------------------
       switch-case: map the numeric BMI to a category, message, and result color.
    --------------------------------------------------------------- */
    let category, message, color;
    switch (true) {
        case bmi < 18.5:
            category = 'Underweight';
            color = '#5DADE2';
            message = 'Consider a balanced, calorie-sufficient diet. The clinic can help you build a plan.';
            break;
        case bmi < 25:
            category = 'Normal';
            color = '#58D68D';
            message = 'Great! Keep up your healthy habits with regular activity and balanced meals.';
            break;
        case bmi < 30:
            category = 'Overweight';
            color = '#F5B041';
            message = 'Consider more physical activity and mindful eating — small daily changes add up.';
            break;
        default:
            category = 'Obese';
            color = '#EC7063';
            message = 'We recommend consulting a healthcare provider for a personalized plan.';
    }

    showResult(name, bmi, category, message, color);

    const record = {
        name,
        age,
        sex,
        weight,
        heightCm,
        bmi,
        category,
        time: new Date().toLocaleString()
    };

    submissionHistory.unshift(record);
    renderHistory();
    recordSubmission(record);
    form.reset();
});

function showResult(name, bmi, category, message, color) {
    resultTitle.textContent = `${name}, your BMI is ${bmi} (${category})`;
    resultBmi.textContent = `Category: ${category}`;
    resultMessage.textContent = message;
    resultCard.style.backgroundColor = color;
    resultCard.classList.remove('hidden');
}

/* ---------------------------------------------------------------
   loop (forEach): rebuilds the "Recent Submissions" list
--------------------------------------------------------------- */
function renderHistory() {
    historyList.innerHTML = '';
    if (submissionHistory.length === 0) {
        historyList.innerHTML = 'No submissions yet.';
        return;
    }

    submissionHistory.forEach(function (entry) {
        const li = document.createElement('li');
        li.textContent = `${entry.name} — BMI ${entry.bmi} (${entry.category})`;
        historyList.appendChild(li);
    });
}

// Sends the record to the Google Apps Script Web App
function recordSubmission(record) {
    if (!WEB_APP_URL || WEB_APP_URL.includes('YOUR_WEB_APP_URL_HERE')) {
        console.warn('Set WEB_APP_URL in script.js to enable Google Sheet recording.');
        return;
    }

    // Using text/plain prevents the browser from triggering a CORS preflight OPTIONS request
    fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(record)
    })
        .then(() => {
            console.log('Successfully sent kiosk record to Google Sheets!');
        })
        .catch(err => {
            console.error('Could not record submission:', err);
        });
}