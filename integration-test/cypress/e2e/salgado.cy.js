describe('Navegando na Página de Pastéis Salgados', () => {
    beforeEach(() => {
        cy.visit('/pasteis-salgados.html')
    })

    it('Deve carregar a página de Pastéis Salgados', () => {
        cy.get('a[href="pasteis-salgados.html"]').click()
    })
})