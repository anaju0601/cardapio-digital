describe('Navegando na Página de Pastéis Doces', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/pagina-inicial/index.html')
    })

    it('Deve carregar a página de Pasteis Doces', () => {
        cy.get('a[href="pasteis-doces.html"]').click()
    })
})