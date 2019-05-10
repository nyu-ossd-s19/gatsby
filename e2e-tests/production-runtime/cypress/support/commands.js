Cypress.Commands.add(`lifecycleCallCount`, action =>
  cy
    .window()
    .then(
      win =>
        win.___PageComponentLifecycleCallsLog.filter(
          entry => entry.action === action
        ).length
    )
)

const storedScrollPositions = {}

Cypress.Commands.add(`getScrollPosition`, () =>
  cy.window().then(win => win.scrollY)
)

Cypress.Commands.add(`storeScrollPosition`, { prevSubject: true }, (prev, id) =>
  cy.getScrollPosition().then(scrollPosition => {
    storedScrollPositions[id] = scrollPosition
    return prev
  })
)

Cypress.Commands.add(`shouldMatchScrollPosition`, id =>
  cy.getScrollPosition().should(scrollPosition => {
    expect(scrollPosition).to.be.closeTo(storedScrollPositions[id], 100)
  })
)

Cypress.Commands.add(`shouldNotMatchScrollPosition`, id =>
  cy.getScrollPosition().should(scrollPosition => {
    expect(scrollPosition).not.to.be.closeTo(storedScrollPositions[id], 100)
  })
)
