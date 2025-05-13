describe('Navegando na Página de Pastéis Doces', () => {
    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('Deve carregar a página de Pasteis Doces', () => {
        cy.get('a[href="pasteis-doces.html"]').click()
    })
})