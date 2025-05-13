describe('Navegando na Página de bebidas', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/pagina-inicial/index.html')
    })

    it('Deve carregar a página de bebidas', () => {
        cy.get('a[href="bebidas.html"]').click()
    })
})