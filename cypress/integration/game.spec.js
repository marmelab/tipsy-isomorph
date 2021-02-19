describe("Game", () => {
    it("renders Home screen", () => {
        cy.visit("tipsy/home");
        cy.findByPlaceholderText("Player name").should("exist");
        cy.findByText("Go").should("exist");
    });

    it("Create a new Game", () => {
        cy.visit("tipsy/home");
        cy.tab();
        cy.focused().type("Bobby");
        cy.findByText("Go").click();
        cy.findByText("Play with friends").click();
        cy.findByLabelText("Join link")
            .invoke("text")
            .then((joinLink) => {
                cy.visit(joinLink);
                cy.findByPlaceholderText("Player name").type("Joe");
                cy.findByText("Go").click();
                cy.findByLabelText("Game status").should("exist");
                cy.findByLabelText("Board").should("exist");
            });
    });
});
