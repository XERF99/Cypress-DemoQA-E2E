import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que abro la página de formulario', () => {
    cy.visit('https://demoqa.com/automation-practice-form');
});

When('lleno el formulario con la siguiente información:', (dataTable) => {
    const data = dataTable.rowsHash();

    // Llenar los campos del formulario
    cy.get('#firstName').type(data.Nombre);
    cy.get('#lastName').type(data.Apellido);
    cy.get('#userEmail').type(data['Correo electrónico']);

    if (data.Género === 'Masculino') {
        cy.get('#gender-radio-1').check({ force: true });
    } else if (data.Género === 'Femenino') {
        cy.get('#gender-radio-2').check({ force: true });
    } else {
        cy.get('#gender-radio-3').check({ force: true });
    }

    cy.get('#userNumber').type(data['Número móvil']);

    // Seleccionar la fecha de nacimiento
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(data['Fecha de nacimiento'].split(' ')[1]);
    cy.get('.react-datepicker__year-select').select(data['Fecha de nacimiento'].split(' ')[2]);
    cy.get('.react-datepicker__day--010:not(.react-datepicker__day--outside-month)').click();

    // Ingresar asignaturas
    cy.get('.subjects-auto-complete__value-container').type(data.Asignaturas);
    cy.get('div[id^="react-select-"]').click();
    cy.get('.subjects-auto-complete__value-container').should('contain.text', data.Asignaturas);

    // Seleccionar hobbies
    cy.get("div[class='custom-control custom-checkbox custom-control-inline']:has(label:contains('Sports')) input").check({ force: true });

    // Ingresar dirección
    cy.get('#currentAddress').type(data['Dirección']);

    // Seleccionar estado y ciudad
    cy.get('#state').click().find("div:contains('" + data['Estado y Ciudad'].split(' ')[0] + "')[id*='react-select']").should('be.visible').click({ force: true });
    cy.get('#city').click().find("div:contains('" + data['Estado y Ciudad'].split(' ')[1] + "')[id*='react-select']").should('be.visible').click({ force: true });


});

And('envío el formulario', () => {
    // Enviar formulario
    cy.get('#submit').click();
})

Then('debería ver un mensaje de confirmación', () => {
    // Verificar que el mensaje de confirmación esté presente
    cy.get('#example-modal-sizes-title-lg').should('contain.text', 'Thanks for submitting the form');

    // Verificar que la ventana modal de confirmación esté visible
    cy.get('.modal-content').should('be.visible');
});

Then('debería ver los detalles del formulario en la ventana modal', (dataTable) => {
    const data = dataTable.rowsHash();

    cy.get('td:contains(Student Name) + td').should('have.text', data['Student Name']);
    cy.get('td:contains(Student Email) + td').should('have.text', data['Student Email']);
    cy.get('td:contains(Gender) + td').should('have.text', data['Gender']);
    cy.get('td:contains(Mobile) + td').should('have.text', data['Mobile']);
    // Verificar la fecha de nacimiento con una expresión regular para permitir diferentes formatos
    const expectedDateOfBirth = data['Date of Birth'];
    cy.get('td:contains(Date of Birth) + td').invoke('text').then(actualDateOfBirth => {
        expect(actualDateOfBirth).to.match(new RegExp(expectedDateOfBirth.replace(',', '\\s*,\\s*')));
    });
    cy.get('td:contains(Subjects) + td').should('have.text', data['Subjects']);
    cy.get('td:contains(Hobbies) + td').should('have.text', data['Hobbies']);
    cy.get('td:contains(Address) + td').should('have.text', data['Address']);
    cy.get('td:contains(State and City) + td').should('have.text', data['State and City']);
});

Then('cerramos la ventana de los datos', () => {
    cy.get('.modal-content').should('be.visible');
    cy.get('#closeLargeModal').click({force: true});
    cy.get('.modal-content').should('not.exist');
})
