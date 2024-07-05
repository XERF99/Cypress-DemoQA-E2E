Feature: Llenar y enviar formulario en demoqa.com

    Scenario: Llenar formulario y verificar mensaje de confirmación
    Given que abro la página de formulario
    When lleno el formulario con la siguiente información:
        | Nombre            | Juan                   |
        | Apellido          | Pérez                  |
        | Correo electrónico| juan.perez@example.com |
        | Género            | Masculino              |
        | Número móvil      | 1234567890             |
        | Fecha de nacimiento | 10 April 1990        |
        | Asignaturas       | Maths                  |
        | Hobbies           | Sports                 |
        | Dirección         | Calle Falsa 123        |
        | Estado y Ciudad   | NCR Delhi              |
    And envío el formulario
    Then debería ver un mensaje de confirmación
    And debería ver los detalles del formulario en la ventana modal
        | Student Name      | Juan Pérez             |
        | Student Email     | juan.perez@example.com |
        | Gender            | Male                   |
        | Mobile            | 1234567890             |
        | Date of Birth     | 10 April,1990          |
        | Subjects          | Maths                  |
        | Hobbies           | Sports                 |
        | Address           | Calle Falsa 123        |
        | State and City    | NCR Delhi              |
    Then cerramos la ventana de los datos
