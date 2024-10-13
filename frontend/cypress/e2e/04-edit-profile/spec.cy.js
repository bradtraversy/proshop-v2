/* eslint-disable no-undef */
const validPassword = '123456';
const initialEmail = 'john@email.com';
const defaultName = 'John Doe';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login'); 
  cy.wait(200);

  cy.get('#email', { timeout: 10000 }) 
    .should('be.visible') 
    .clear() 
    .type(email);

  cy.get('#password', { timeout: 10000 }) 
    .should('be.visible') 
    .clear() 
    .type(password); 

  cy.get('button').contains('Sign In', { timeout: 10000 }).click();
});

Cypress.Commands.add('navigateToProfile', () => {
  cy.get('a#username').click(); 
  cy.get('a.dropdown-item[href="/profile"]').click(); 
});


Cypress.Commands.add('updateProfile', (name, email) => {
  if (name !== undefined) {
    cy.get('input[id="name"]').clear().type(name); 
  }
  if (email !== undefined) {
    cy.get('input[id="email"]').clear().type(email); 
  }
  cy.get('button[type="submit"]').contains('Update').click(); 
});

Cypress.Commands.add('logout', () => {
  cy.get('a#username').click(); 
  cy.get('a.dropdown-item').contains('Logout').click(); 
});

// Hàm đợi
Cypress.Commands.add('waitBeforeLogout', (seconds) => {
  cy.wait(seconds * 1000); 
});

beforeEach(() => {
  cy.visit('http://localhost:3000');
});

describe('Edit Profile Functionality', () => {
  it('TC-EP-001: Update full name with valid input', () => {
    cy.login(initialEmail, validPassword);
    cy.navigateToProfile();
    cy.updateProfile('John New', undefined);
    cy.contains('Profile updated successfully').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout();
  });

  it('TC-EP-002: Update email address with valid input', () => {
    cy.login(initialEmail, validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, 'newjohn@email.com'); 
    cy.contains('Profile updated successfully').should('be.visible'); 
    cy.waitBeforeLogout(6); 
    cy.logout();
  });


  it('TC-EP-003: Update both full name and email address with valid inputs', () => {
    cy.login('newjohn@email.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile('John Smith', 'john.smith@example.com');
    cy.contains('Profile updated successfully').should('be.visible');
    cy.waitBeforeLogout(6);
    cy.logout();
  });


  it('TC-EP-004: Update profile without changing any information', () => {
    cy.login('john.smith@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, undefined);
    cy.contains('Profile updated successfully').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout();
  });

  it('TC-EP-005: Update email with a different valid format', () => {
    cy.login('john.smith@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, 'user@subdomain.example.com');
    cy.contains('Profile updated successfully').should('be.visible');
    cy.waitBeforeLogout(6);
    cy.logout(); 
  });

  it('TC-EP-006: Update profile with invalid email', () => {
    cy.login('user@subdomain.example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile('John Doe', 'userexample.com'); 
    //cy.contains("Please include an '@' in the email address.").should('be.visible'); // Kiểm tra thông báo lỗi


    cy.waitBeforeLogout(6);
    cy.logout();
});


  it('TC-EP-007: Update profile with incomplete email', () => {
  cy.login('user@subdomain.example.com', validPassword);
  cy.navigateToProfile();
  cy.updateProfile('John Doe', 'user@');
  //cy.contains("Please enter a part following '@'. 'user@' is incomplete.").should('be.visible'); // Kiểm tra thông báo lỗi
  cy.waitBeforeLogout(6); 
  cy.logout();
  });


  it('TC-EP-008: Update email with invalid characters', () => {
    cy.login('user@subdomain.example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, 'user!name@example.com');
    cy.contains('Invalid characters').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout();
  });

  it('TC-EP-009: Update profile with invalid email containing multiple "@"', () => {
  cy.login('user!name@example.com', validPassword);
  cy.navigateToProfile();
  cy.updateProfile('John Doe', 'user@name@example.com'); 
  //cy.contains("A part following '@' should not contain the symbol '@'.").should('be.visible'); // Kiểm tra thông báo lỗi
  cy.waitBeforeLogout(6); 
  cy.logout(); 
  });

  it('TC-EP-010: Update email with missing "." in domain', () => {
    cy.login('user!name@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, 'user@examplecom');
    cy.contains('Invalid email format').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout(); 
  });

  it('TC-EP-011: Update email with space character', () => {
    cy.login('user@examplecom', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, 'user name@example.com');
    //cy.contains("A part following '@' should not contain the symbol ' '.").should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout(); 
  });

  it('TC-EP-012: Update email with consecutive dots', () => {
    cy.login('user name@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, 'user..name@example.com');
    cy.contains('Invalid email format').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout();
  });

  it('TC-EP-013: Submit form with empty full name', () => {
    cy.login('user..name@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile('', undefined);
    cy.contains('Full name is required').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout(); 
  });

  it('TC-EP-014: Submit form with empty email', () => {
    cy.login('user..name@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile(undefined, '');
    cy.contains('Email is required').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout(); 
  });

  it('TC-EP-015: Attempt to update with both full name and email address empty', () => {
    cy.login('user..name@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile('', '');
    cy.contains('Email is required').should('be.visible');
    cy.waitBeforeLogout(6); 
    cy.logout(); 
  });

  it('TC-EP-016: Attempt to update profile with a email address already in use by another user', () => {
    cy.login('user..name@example.com', validPassword);
    cy.navigateToProfile();
    cy.updateProfile('John Doe', 'jane@email.com'); 
    cy.contains('E11000 duplicate key error collection').should('be.visible'); 
  });
});
