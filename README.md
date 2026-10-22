# Cypress Automation Test Suite

This repository contains an automated end-to-end (E2E) testing framework implemented using Cypress and JavaScript.

## Tech Stack & Tools
* **Automation Framework:** Cypress (E2E Web Automation Engine)
* **Language:** JavaScript
* **Execution Environment:** Node.js
* **Configuration:** Core operational setups in `cypress.config.js`

## Repository Structure
* `cypress/` — Core automation test suite directories (integration tests, custom commands).
* `cypress.config.js` — Central configuration file
* `package.json` — Tracks external Node.js dependencies and shortcut execution scripts.

## Local Setup & Execution

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### 2. Installation
Clone this repository locally and install the required npm dependencies:
```bash
# Clone the repository
git clone https://github.com

# Navigate into the project directory
cd cypress-tests

# Install Node packages
npm install
```

### 3. Running the Tests
You can trigger the automation suites using standard Cypress test runners via terminal execution:

```bash
# Open the interactive Cypress Test Runner (UI GUI Mode)
npx cypress open

# Run all test suites headlessly in the background
npx cypress run
```
