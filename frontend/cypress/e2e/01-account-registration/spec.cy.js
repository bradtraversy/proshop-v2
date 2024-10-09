function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

function generateUniqueId() {
  return Date.now();
}

Cypress.Commands.add(
  'registration',
  (name, email, password, confirmPassword) => {
    cy.get('input#name').type(name);
    cy.get('input#email').type(email);
    cy.get('input#password').type(password);
    cy.get('input#confirmPassword').type(confirmPassword);
    cy.get('button[type="submit"]').contains('Register').click();
  }
);

beforeEach(() => {
  cy.visit('http://localhost:3000/register');
});

describe('verify account registration page', () => {
  it('should register successfully', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'Manh1712!', 'Manh1712!');
  });

  it('should show error message when email does not contain @ symbol', () => {
    cy.registration('Manh123', 'userexample.com', 'Manh1712!', 'Manh1712!');
    cy.get('input#email')
      .invoke('prop', 'validationMessage')
      .should(
        'equal',
        "Please include an '@' in the email address. 'userexample.com' is missing an '@'."
      );
  });

  it('should show error message when email does not contain a domain after @ symbol', () => {
    cy.registration('Manh123', 'user@', 'Manh1712!', 'Manh1712!');
    cy.get('input#email')
      .invoke('prop', 'validationMessage')
      .should(
        'equal',
        "Please enter a part following '@'. 'user@' is incomplete."
      );
  });

  it('should show error message when email does not contain at least a dot "."', () => {
    const email = `user${generateUniqueId()}@examplecom`;
    cy.registration('Manh123', email, 'Manh1712!', 'Manh1712!');
    cy.get('input#email')
      .invoke('prop', 'validationMessage')
      .should(
        'equal',
        "A part following '.' should not be empty. 'user@examplecom' is incomplete."
      );
  });

  it('should show error message when email contains spaces', () => {
    const email = `user${generateUniqueId()}     @example.com`;
    cy.get('input#name').type('Manh123');
    cy.get('input#email').focus();
    cy.realType(email);
    cy.get('input#password').type('Manh1712!');
    cy.get('input#confirmPassword').type('Manh1712!');
    cy.get('button[type="submit"]').contains('Register').click();
    cy.get('input#email')
      .invoke('prop', 'validationMessage')
      .should(
        'equal',
        "A part followed by '@' should not contain the symbol ' '."
      );
  });

  it('should show error message when email contains special characters', () => {
    const email = `user${generateUniqueId()}!#$%^@example.com`;
    cy.registration('Manh123', email, 'Manh1712!', 'Manh1712!');
    cy.get('input#email')
      .invoke('prop', 'validationMessage')
      .should('include', "A part following '@' should not contain the symbol");
  });

  it('should show error message when email is empty', () => {
    cy.get('input#name').type('Manh123');
    cy.get('input#password').type('Manh1712!');
    cy.get('input#confirmPassword').type('Manh1712!');
    cy.get('button[type="submit"]').contains('Register').click();
    cy.get('.Toastify').should(
      'have.text',
      'User validation failed: email: Path `email` is required.'
    );
  });

  it('should show error message when account already exists', () => {
    cy.registration('Manh123', 'john@email.com', 'Manh1712!', 'Manh1712!');
    cy.get('.Toastify').should('have.text', 'User already exists');
  });

  it('should show error message when password is less than 8 characters', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'Manh12!', 'Manh12!');
    cy.get('.Toastify').should(
      'have.text',
      'Password must be at least 8 characters'
    );
  });

  it('should show error message when password does not contain at least 1 number', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'ManhManh!', 'ManhManh!');
    cy.get('.Toastify').should(
      'have.text',
      'Password must contain at least 1 number'
    );
  });

  it('should show error message when password does not contain at least 1 special character', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'Manh171203', 'Manh171203');
    cy.get('.Toastify').should(
      'have.text',
      'Password must contain at least 1 special character'
    );
  });

  it('should show error message when password does not contain at least 1 lowercase character', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'MANH1712!', 'MANH1712!');
    cy.get('.Toastify').should(
      'have.text',
      'Password must contain at least 1 lowercase character'
    );
  });

  it('should show error message when password does not contain at least 1 uppercase character', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'manh1712!', 'manh1712!');
    cy.get('.Toastify').should(
      'have.text',
      'Password must contain at least 1 uppercase character'
    );
  });

  it('should show error message when password is empty', () => {
    const email = generateUniqueEmail();
    cy.get('input#name').type('Manh123');
    cy.get('input#email').type(email);
    cy.get('button[type="submit"]').contains('Register').click();
    cy.get('.Toastify').should(
      'have.text',
      'User validation failed: password: Path `password` is required.'
    );
  });

  it('should show error message when password contains sequential characters', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'Manh12345!', 'Manh12345!');
    cy.get('.Toastify').should(
      'have.text',
      'Password must not contain sequential characters'
    );
  });

  it('should show error message when password contains repeated characters', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'Manhhhhh!', 'Manhhhhh!');
    cy.get('.Toastify').should(
      'have.text',
      'Password must not contain repeated characters'
    );
  });

  it('should show error message when password is the same as email', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, email, email);
    cy.get('.Toastify').should(
      'have.text',
      'Password must not be the same as email'
    );
  });

  it('should show error message when name is empty', () => {
    const email = generateUniqueEmail();
    cy.get('input#email').type(email);
    cy.get('input#password').type('Manh1712!');
    cy.get('input#confirmPassword').type('Manh1712!');
    cy.get('button[type="submit"]').contains('Register').click();
    cy.get('.Toastify').should(
      'have.text',
      'User validation failed: name: Path `name` is required.'
    );
  });

  it('should show error message when password confirmation is incorrect', () => {
    const email = generateUniqueEmail();
    cy.registration('Manh123', email, 'Manh1712!', 'Manh1912!');
    cy.get('.Toastify').should('have.text', 'Passwords do not match');
  });

  it('should navigate to Register page from Sign In page', () => {
    cy.get('a').contains('Login').click();
    cy.get('a').contains('Register').click();
    cy.url().should('include', '/register');
  });
});
