Cypress.Commands.add('createCurrentDate', () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    cy.log('Fecha actual:', formattedDate);
    return formattedDate;
});

