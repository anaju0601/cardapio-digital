describe('Navegando na Página de bebidas', () => {
    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('Deve carregar a página de bebidas', () => {
        cy.get('a[href="bebidas.html"]').click()
    })
})