describe('Navegando na Página de Pastéis Salgados', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/pagina-inicial/index.html')
    })

    it('Deve carregar a página de Pastéis Salgados', () => {
        cy.get('a[href="pasteis-salgados.html"]').click()
    })
})