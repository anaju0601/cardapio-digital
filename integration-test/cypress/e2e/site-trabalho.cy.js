describe('Site Trabalho', () => {
  it('Deve carregar a página inicial', () => {
    cy.visit('http://127.0.0.1:5500/pagina-inicial/index.html')
    cy.contains('Pastelaria Sabor Brasil')
  })
})

