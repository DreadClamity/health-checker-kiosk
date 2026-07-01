# Health Self-Check Kiosk

A responsive BMI self-check kiosk built for **Laboratory 5** (DLSU-D, College of Information and Computer Studies, IT Department).

## The Problem
Students and employees often have no quick, private way to check their BMI without visiting the clinic. This kiosk lets a walk-in user enter their name, age, sex, weight, and height, then instantly:
- computes their BMI,
- classifies it into a health category,
- shows a color-coded result with a tailored recommendation, and
- logs the submission to a Google Sheet so the school nurse/HR office can follow up.

## Tech & Control Structures
- **HTML/CSS** — semantic layout, CSS Grid + Flexbox, one responsive breakpoint.
- **if-else / else-if** — validates each form field before processing (`script.js`).
- **switch-case** — maps the computed BMI to a category, message, and color.
- **loop (forEach)** — rebuilds the "Recent Submissions" list from a local array.
- **Google Apps Script** — a `doPost` function appends each submission as a new Sheet row.

## Run It Locally
1. Open `index.html` in a browser, or use VS Code's Live Server.
2. To enable Google Sheet logging, deploy the Apps Script Web App and paste the deployment URL into the `WEB_APP_URL` constant at the top of `script.js`.

## Live Demo
[Add your GitHub Pages link here once deployed]

## Author
Kyle — BIT31, De La Salle University – Dasmariñas
