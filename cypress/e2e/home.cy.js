/// <reference types="cypress" />

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/")
  })

  context("Login page", () => {
    it("User is able to succesfully log in", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.get('[data-test="title"]').should('be.visible').and('have.text', 'Products')
    })

    it("Locked out User is not able to log in", () => {
      cy.login('locked_out_user', 'secret_sauce')
      cy.get('h3[data-test="error"]').should('be.visible').and('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
      cy.get('[data-test="title"]').should('not.exist')
    })
  })

  context("Products page", () => {
    it("User is able to successfully log out", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.get('#react-burger-menu-btn').click()
      cy.get('[data-test="logout-sidebar-link"]').click()
      cy.get('[data-test="login-button"]').should('be.visible')
      cy.get('[data-test="title"]').should('not.exist')
    })

    it("User is able to add an item to the cart", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="add-to-cart-"]')
        .click()
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
        .parents('[data-test="inventory-item-description"]')
        .within(() => {
          cy.get('button[data-test^="add-to-cart-"]').should('not.exist')
          cy.get('button[data-test^="remove-"]').should('be.visible').and('contain.text', 'Remove')
        })
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '1')
    })

    it("User is able to add a few items to the cart", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="add-to-cart-"]')
        .click()
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '1')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bolt T-Shirt')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="add-to-cart-"]')
        .click()
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '2')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="add-to-cart-"]')
        .click()
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '3')
    })

    it("User is able to remove an item from the cart", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="add-to-cart-"]')
        .click()
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="add-to-cart-"]')
        .click()
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '2')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
        .parents('[data-test="inventory-item-description"]')
        .find('button[data-test^="remove-"]')
        .click()
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
        .parents('[data-test="inventory-item-description"]')
        .within(() => {
          cy.get('button[data-test^="remove-"]').should('not.exist')
          cy.get('button[data-test^="add-to-cart-"]').should('be.visible').and('contain.text', 'Add to cart')
        })
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '1')
    })

    it("User is able to view the item", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
        .parents('.inventory_item')
        .find('a[data-test*="img-link"]')
        .click()
      cy.get('button[data-test="back-to-products"]')
        .should('exist')
        .click()
      cy.get('[data-test="title"]').should('be.visible').and('have.text', 'Products')
    })
  })

  context("Item page", () => {
    it("User is able to add an item to the cart from the item page", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
        .parents('.inventory_item')
        .find('a[data-test*="img-link"]')
        .click()
      cy.get('button[data-test^="add-to-cart"]').click()
      cy.get('button[data-test^="add-to-cart"]').should('not.exist')
      cy.get('button[data-test^="remove"]').should('be.visible').and('contain.text', 'Remove')
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '1')
    })

    it("User is able to remove an item from the cart from the item page", () => {
      cy.login('standard_user', 'secret_sauce')
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
        .parents('.inventory_item')
        .find('a[data-test*="img-link"]')
        .click()
      cy.get('button[data-test^="add-to-cart"]').click()
      cy.get('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('have.text', '1')
      cy.get('button[data-test^="remove"]').click()
      cy.get('button[data-test^="remove"]').should('not.exist')
      cy.get('button[data-test^="add-to-cart"]').should('be.visible').and('contain.text', 'Add to cart')
      cy.get('a[data-test="shopping-cart-link"] span[data-test="shopping-cart-badge"]')
        .should('not.exist')
    })
  })

  context("Footer section", () => {
    beforeEach(() => {
      cy.visit("https://www.saucedemo.com/")
      cy.login('standard_user', 'secret_sauce')
      cy.get('footer[data-test="footer"]').scrollIntoView()
    })

    it('Twitter link points to a working external page', () => {
      cy.get('[data-test="social-twitter"]')
        .invoke('attr', 'href')
        .should('eq', 'https://twitter.com/saucelabs')
        .then((href) => {
          cy.request(href).its('status').should('eq', 200)
        })
    })

    it('Facebook link points to a working external page', () => {
      cy.get('[data-test="social-facebook"]')
        .invoke('attr', 'href')
        .should('eq', 'https://www.facebook.com/saucelabs')
        .then((href) => {
          cy.request({ url: href, failOnStatusCode: false }).its('status').should('be.oneOf', [200, 400])
        })
    })

    it('LinkedIn link points to a working external page', () => {
      cy.get('[data-test="social-linkedin"]')
        .invoke('attr', 'href')
        .should('eq', 'https://www.linkedin.com/company/sauce-labs/')
        .then((href) => {
          cy.request(href).its('status').should('eq', 200)
        })
    })
  })
})
