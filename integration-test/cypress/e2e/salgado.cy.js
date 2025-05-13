describe('Navegando na Página de Pastéis Salgados', () => {
    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('Deve carregar a página de Pastéis Salgados', () => {
        cy.get('a[href="pasteis-salgados.html"]').click()
    })
})