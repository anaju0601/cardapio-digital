describe('Site Trabalho', () => {
  it('Deve carregar a página inicial', () => {
    cy.visit('/index.html')
    cy.contains('Pastelaria Sabor Brasil')
  })
})
