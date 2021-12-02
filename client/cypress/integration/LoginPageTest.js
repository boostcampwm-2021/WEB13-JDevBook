describe('render login page', () => {
  before(() => {
    cy.visit('/');
  })
  
  // Greeter Test
  it('Greeter renders Correctly', () => {
    cy.get('[data-cy=Greeter]').should('exist');
  });

  it('Is Greeter Text Existed', () => {
    const greeterText = '우리들의 공간';
    cy.findByText(greeterText).should('exist');
  });

  // LoginBox Test
  it('LoginBox renders Correctly', () => {
    cy.get('[data-cy=LoginBox]').should('exist');
  });

  it('Is LoginBox Text Existed', () => {
    const loginBoxText = '개발자라면 Github 아이디는 가지고 계시죠?';
    cy.findByText(loginBoxText).should('exist');
  });

  // Footer Test
  it('Footer renders Correctly', () => {
    cy.get('[data-cy=Footer]').should('exist');
  });

  it('Is Footer Text Existed', () => {
    const footerText =
      'Made by 부스트캠프 WEB 6기 - 제이6543 ( 박기태, 신태수, 이동현, 현상엽 )';
    cy.findByText(footerText).should('exist');
  });

  // Github Login Button Test
  it('Is Github Login Button Existed', () => {
    cy.get('button').should('exist');
    cy.findByText('Log in with GitHub').click();
    cy.get('#login_field').type('kitae0629@naver.com');
    cy.get('#password').type('apdlvmf123@');
    cy.get('.btn').click();
  });
});
