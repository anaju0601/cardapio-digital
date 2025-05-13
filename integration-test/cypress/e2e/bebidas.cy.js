describe('Navegando na Página de bebidas', () => {
    beforeEach(() => {
        cy.visit('/bebidas.html')
    })

    it('Deve carregar a página de bebidas', () => {
        cy.get('a[href="bebidas.html"]').click()
    })
})