// Datos de los endpoints
const endpoints = {
    //CURSOS    CURSOS  CURSOS  CURSOS  CURSOS  CURSOS
    "Cursos": [
        {
            "title": "Obtener todos los cursos",
            "description": "Obtiene una lista de todos los cursos.",
            "path": "/courses",
            "method": "GET",
            "parameters": "N/A",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                        {
                            "_id": "66a850bc7509a7cb08cc9425",
                            "name": "Introducción a PHP",
                            "description": "Aprende las lecciones básicas de PHP",
                            "division": {
                                "_id": "66a8419cd4db258b4c324a53",
                                "name": "IDGS"
                            },
                            "duration": "1 Mes",
                            "isActive": true,
                            "professor": {
                                "_id": "66a84b2661c4946d0f25228c",
                                "name": "Juan",
                                "email": "juan@gmail.com"
                            },
                            "students": [],
                            "createdAt": "2024-07-30T02:32:28.186Z",
                            "updatedAt": "2024-08-09T01:53:29.348Z"
                        },
                    ]
            }`,
            "error": `500 Internal Server Error - Error al obtener los cursos`
        },
        {
            "title": "Obtener todos los cursos en los que un estudiante está inscrito",
            "description": "Este endpoint permite a un estudiante obtener una lista de todos los cursos en los que está inscrito. La identificación del estudiante se obtiene del token de autenticación proporcionado en el encabezado de la solicitud.",
            "path": "/courses/my-courses",
            "method": "GET",
            "parameters": "Header",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                        {
                            "_id": "66a992cc5717f55edd65972e",
                            "name": "Introducción a HTML",
                            "description": "Aprende las lecciones básicas de HTML",
                            "division": {
                                "_id": "66a8419cd4db258b4c324a53",
                                "name": "IDGS"
                            },
                            "duration": "2 Meses",
                            "isActive": true,
                            "professor": {
                                "_id": "66a84b2661c4946d0f25228c",
                                "name": "Juan",
                                "email": "juan@gmail.com"
                            },
                            "students": [
                                {
                                    "_id": "66a843768851dcf52e1e4184",
                                    "name": "Panchiro",
                                    "email": "tony@gmail.com"
                                }
                            ],
                            "createdAt": "2024-07-31T01:26:36.503Z",
                            "updatedAt": "2024-07-31T01:45:11.200Z"
                        }
                    ]
            }`,
            "error": `500 Internal Server Error - Error al obtener los cursos`
        },
        {
            "title": "Crear un curso",
            "description": "Este endpoint permite crear un nuevo curso en la base de datos. Solo los usuarios con el rol de profesor pueden hacer uso de este endpoint. " +
                "El ID del usuario se obtiene del token de autenticación proporcionado en el encabezado de la solicitud. Se verifica que la división y el profesor existan, " +
                "que el profesor tenga el rol adecuado, y que el profesor pertenezca a la misma división del curso.",
            "path": "/courses",
            "method": "POST",
            "parameters": "Header, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Introducción a Kotlin",
                "description": "Aprende las lecciones básicas de Kotlin",
                "divisionName": "IDGS",
                "duration": "1 Mes",
                "isActive": true,
                "professorEmail": "juan@gmail.com"
            }`,
            "response": `{
            "status": 201,
            "message": "Created",
            "data": {
                        "name": "Introducción a Kotlin",
                        "description": "Aprende las lecciones básicas de Kotlin",
                        "division": "66a8419cd4db258b4c324a53",
                        "duration": "1 Mes",
                        "isActive": true,
                        "professor": "66a84b2661c4946d0f25228c",
                        "students": [],
                        "_id": "66b94295b0ef4ac4689c52b5",
                        "createdAt": "2024-08-11T23:00:37.124Z",
                        "updatedAt": "2024-08-11T23:00:37.124Z"
                    }
            }`,
            "error": `
                400 Bad Request - Division no encontrada
                400 Bad Request - Profesor no encontrado
                400 Bad Request - El usuario no tiene rol de profesor
                400 Bad Request - El profesor no pertenece a la misma division que el curso
                500 Internal Server Error - Error al crear el curso`
        },
        {
            "title": "Obtener un curso por su ID",
            "description": "Este endpoint permite obtener la información detallada de un curso específico a través de su ID. " +
                "La información incluye los detalles del curso, la división a la que pertenece, y la información del profesor encargado.",
            "path": "/courses/:courseId",
            "method": "GET",
            "parameters": "Parámetro de ruta",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66a850bc7509a7cb08cc9425",
                        "name": "Introducción a PHP",
                        "description": "Aprende las lecciones básicas de PHP",
                        "division": {
                            "_id": "66a8419cd4db258b4c324a53",
                            "name": "IDGS"
                        },
                        "duration": "1 Mes",
                        "isActive": true,
                        "professor": {
                            "_id": "66a84b2661c4946d0f25228c",
                            "name": "Juan",
                            "email": "juan@gmail.com"
                        },
                        "students": [],
                        "createdAt": "2024-07-30T02:32:28.186Z",
                        "updatedAt": "2024-08-09T01:53:29.348Z"
                    }
            }`,
            "error": `
                404 Not Found - Curso no encontrado
                500 Internal Server Error - Error al obtener el curso`
        },
        {
            "title": "Obtener cursos por nombre de división",
            "description": "Este endpoint permite a los usuarios obtener una lista de todos los cursos que pertenecen a una división específica. " +
                "El nombre de la división se proporciona en el cuerpo de la solicitud. Solo los usuarios con el rol de estudiante pueden acceder a este endpoint. " +
                "La verificación del rol se realiza utilizando el token de autenticación.",
            "path": "/courses/by-division",
            "method": "POST",
            "parameters": "Header, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "divisionName": "IDGS"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                        {
                            "_id": "66a850bc7509a7cb08cc9425",
                            "name": "Introducción a PHP",
                            "description": "Aprende las lecciones básicas de PHP",
                            "division": {
                                "_id": "66a8419cd4db258b4c324a53",
                                "name": "IDGS"
                            },
                            "duration": "1 Mes",
                            "isActive": true,
                            "professor": {
                                "_id": "66a84b2661c4946d0f25228c",
                                "name": "Juan",
                                "email": "juan@gmail.com"
                            },
                            "students": [],
                            "createdAt": "2024-07-30T02:32:28.186Z",
                            "updatedAt": "2024-08-09T01:53:29.348Z"
                        },
                    ]
            }`,
            "error": `
                404 Not Found - División no encontrada
                404 Not Found - No se encontraron cursos para la división especificada
                500 Internal Server Error - Error al obtener los cursos`
        },
        {
            "title": "Actualizar un curso por su ID",
            "description": "Este endpoint permite a los administradores y profesores actualizar la información de un curso específico por su ID. " +
                "Se requiere el nombre de la división y el correo electrónico del profesor para la actualización. La verificación del rol de profesor y " +
                "la pertenencia a la división se realiza utilizando el token de autenticación.",
            "path": "/courses/:courseId",
            "method": "PUT",
            "parameters": "Header, Parámetro de ruta, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Introducción a PHP",
                "description": "Aprende las lecciones básicas de PHP",
                "divisionName": "IDGS",
                "duration": "5 Meses",
                "isActive": true,
                "professorEmail": "juan@gmail.com"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66b94295b0ef4ac4689c52b5",
                        "name": "IPureba",
                        "description": "Aprende las lecciones básicas de PHP",
                        "division": "66a8419cd4db258b4c324a53",
                        "duration": "5 Meses",
                        "isActive": true,
                        "professor": "66a84b2661c4946d0f25228c",
                        "students": [],
                        "createdAt": "2024-08-11T23:00:37.124Z",
                        "updatedAt": "2024-08-11T23:22:43.274Z"
                    }
            }`,
            "error": `
                400 Bad Request - Division no encontrada
                400 Bad Request - Profesor no encontrado
                400 Bad Request - El profesor no pertenece a la misma division que el curso
                404 Not Found - Curso no encontrado
                500 Internal Server Error - Error al actualizar el curso`
        },
        {
            "title": "Eliminar un curso por su ID",
            "description": "Este endpoint permite a los administradores y profesores eliminar un curso específico por su ID. " +
                "Solo los usuarios con roles de administrador o profesor pueden utilizar este endpoint. " +
                "La autenticación se realiza mediante un token proporcionado en el encabezado de la solicitud.",
            "path": "/courses/:courseId",
            "method": "DELETE",
            "parameters": "Header, Parámetro de ruta",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "message": "Curso eliminado"
                    }
            }`,
            "error": `[
                "404 Not Found - Curso no encontrado",
                "500 Internal Server Error - Error al eliminar el curso"
            ]`
        },
        {
            "title": "Solicitar inscripción a un curso",
            "description": "Este endpoint permite a los estudiantes solicitar la inscripción en un curso específico. " +
                "Solo los usuarios con rol de estudiante pueden utilizar este endpoint. La autenticación se realiza mediante un token proporcionado en el encabezado de la solicitud.",
            "path": "/courses/:courseId/enroll",
            "method": "POST",
            "parameters": "Header, Parámetro de ruta",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 201,
            "message": "Created",
            "data": {
                        "course": "66b949c1b0ef4ac4689c52de",
                        "student": "66a843768851dcf52e1e4184",
                        "status": "pending",
                        "_id": "66b949fab0ef4ac4689c52ee",
                        "createdAt": "2024-08-11T23:32:10.175Z",
                        "__v": 0
                    }
            }`,
            "error": `
                404 Not Found - Curso no encontrado
                400 Bad Request - El usuario no tiene rol de estudiante
                500 Internal Server Error - Error al solicitar inscripción`
        },
        {
            "title": "Obtener todas las solicitudes pendientes para los cursos",
            "description": "Este endpoint permite a los profesores obtener todas las solicitudes de inscripción pendientes para los cursos que imparten. " +
                "Solo los usuarios con rol de profesor pueden utilizar este endpoint. La autenticación se realiza mediante un token proporcionado en el encabezado de la solicitud.",
            "path": "/courses/pending-requests",
            "method": "GET",
            "parameters": "Header",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                            {
                                "_id": "66b5771fd2c64a99a21b3650",
                                "course": {
                                    "_id": "66aab0fc954c9c9ed1dc7ef8",
                                    "name": "Introducción a Kotlin"
                                },
                                "student": {
                                    "_id": "66a843768851dcf52e1e4184",
                                    "name": "Panchiro",
                                    "email": "tony@gmail.com"
                                },
                                "status": "pending",
                                "createdAt": "2024-08-09T01:55:43.446Z",
                                "__v": 0
                            },
                    ]
            }`,
            "error": `
                404 Not Found - No se encontraron cursos para el profesor
                500 Internal Server Error - Error al obtener solicitudes pendientes`
        },
        {
            "title": "Aprobar o rechazar una solicitud",
            "description": "Este endpoint permite a los profesores manejar las solicitudes de inscripción de estudiantes a sus cursos. " +
                "Los profesores pueden aprobar o rechazar las solicitudes. La autenticación y la autorización se realizan mediante un token proporcionado en el encabezado de la solicitud.",
            "path": "/request/:requestId",
            "method": "PUT",
            "parameters": "Header, Parámetro de ruta, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "status": "approved"  // Puede ser "approved" o "rejected"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "request": {
                            "_id": "66b949fab0ef4ac4689c52ee",
                            "course": {
                                "_id": "66b949c1b0ef4ac4689c52de",
                                "name": "Prueba",
                                "description": "Aprende las lecciones básicas de Kotlin",
                                "division": "66a8419cd4db258b4c324a53",
                                "duration": "1 Mes",
                                "isActive": true,
                                "professor": "66a84b2661c4946d0f25228c",
                                "students": [],
                                "createdAt": "2024-08-11T23:31:13.033Z",
                                "updatedAt": "2024-08-11T23:31:13.033Z"
                            },
                            "student": "66a843768851dcf52e1e4184",
                            "status": "approved",
                            "createdAt": "2024-08-11T23:32:10.175Z",
                            "__v": 0
                        },
                        "course": {
                            "_id": "66b949c1b0ef4ac4689c52de",
                            "name": "Prueba",
                            "description": "Aprende las lecciones básicas de Kotlin",
                            "division": "66a8419cd4db258b4c324a53",
                            "duration": "1 Mes",
                            "isActive": true,
                            "professor": "66a84b2661c4946d0f25228c",
                            "students": [
                                "66a843768851dcf52e1e4184"
                            ],
                            "createdAt": "2024-08-11T23:31:13.033Z",
                            "updatedAt": "2024-08-11T23:41:29.986Z"
                        }
                    }
            }`,
            "error": `
                404 Not Found - Solicitud no encontrada
                404 Not Found - Curso no encontrado
                403 Forbidden - Acceso no autorizado
                400 Bad Request - Estado inválido
                500 Internal Server Error - Error al manejar la solicitud`
        },
        {
            "title": "Eliminar un estudiante de un curso",
            "description": "Este endpoint permite a un profesor eliminar a un estudiante de un curso específico. " +
                "Solo el profesor asignado al curso puede realizar esta operación. La autenticación y autorización se gestionan a " +
                "través de un token proporcionado en el encabezado de la solicitud.",
            "path": "/courses/remove-student/:courseId",
            "method": "PUT",
            "parameters": "Header, Parámetros de ruta, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "studentEmail": "tony@gmail.com"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66b949c1b0ef4ac4689c52de",
                        "name": "Prueba",
                        "description": "Aprende las lecciones básicas de Kotlin",
                        "division": "66a8419cd4db258b4c324a53",
                        "duration": "1 Mes",
                        "isActive": true,
                        "professor": "66a84b2661c4946d0f25228c",
                        "students": [],
                        "createdAt": "2024-08-11T23:31:13.033Z",
                        "updatedAt": "2024-08-12T00:24:11.403Z"
                    }
            }`,
            "error": `
                404 Not Found - Curso no encontrado
                403 Forbidden - Acceso no autorizado
                404 Not Found - Estudiante no encontrado
                400 Bad Request - El estudiante no está inscrito en el curso
                500 Internal Server Error - Error al eliminar el estudiante del curso`
        },
        {
            "title": "Obtener todas las solicitudes pendientes de un estudiante",
            "description": "Este endpoint permite a los estudiantes obtener una lista de cursos para los cuales han realizado solicitudes de inscripción que aún están pendientes. " +
                "Solo los estudiantes autenticados pueden acceder a esta información.",
            "path": "/courses/student/requests",
            "method": "GET",
            "parameters": "Header",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                            {
                                "_id": "66aab0fc954c9c9ed1dc7ef8",
                                "name": "Introducción a Kotlin",
                                "description": "Aprende las lecciones básicas de Kotlin",
                                "division": "66a8419cd4db258b4c324a53",
                                "duration": "1 Mes",
                                "isActive": true,
                                "professor": "66a84b2661c4946d0f25228c",
                                "students": [
                                    "66abf017bb359ffc4b480550"
                                ],
                                "createdAt": "2024-07-31T21:47:40.472Z",
                                "updatedAt": "2024-08-01T20:56:14.942Z",
                                "pendingRequest": true
                            },
                    ]
            }`,
            "error": `
                404 Not Found - No se encontraron solicitudes pendientes para el estudiante.
                500 Internal Server Error - Error al obtener los cursos con solicitudes pendientes del estudiante`
        }
    ],
    //DIVISIONES    DIVISIONES  DIVISIONES  DIVISIONES  DIVISIONES
    "Divisiones": [
        {
            "title": "Obtener todas las divisiones",
            "description": "Este endpoint permite obtener una lista de todas las divisiones disponibles en el sistema, excluyendo la división con el nombre 'default'. " +
            "Esto es útil para obtener información sobre las divisiones existentes sin incluir la división predeterminada que no se usa en el sistema.",
            "path": "/divisions",
            "method": "GET",
            "parameters": "N/A",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                            {
                                "_id": "66a8419cd4db258b4c324a53",
                                "name": "IDGS",
                                "description": "Desarrollo de software",
                                "__v": 0
                            },
                    ]
            }`,
            "error": `500 Internal Server Error - Error al obtener las divisiones`
        },
        {
            "title": "Crear una división",
            "description": "Este endpoint permite a un administrador crear una nueva división en el sistema. " +
            "La división se almacena en la base de datos con un nombre y una descripción proporcionados en la solicitud. " +
            "Solo los usuarios con rol de administrador pueden acceder a este endpoint.",
            "path": "/divisions",
            "method": "POST",
            "parameters": "Header, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "IDGS",
                "description": "Division de desarrollo de software"
            }`,
            "response": `{
            "status": 201,
            "message": "Created",
            "data": {
                        "name": "IDGS",
                        "description": "Division de desarrollo de software",
                        "_id": "66b9659b989d0ba0bf70d20a",
                        "__v": 0
                    }
            }`,
            "error": `500 Internal Server Error - Error al crear la división`
        },
        {
            "title": "Obtener una división por su ID",
            "description": "Este endpoint permite obtener los detalles de una división específica utilizando su ID. " +
            "Si la división existe, se devuelve la información solicitada; de lo contrario, se devuelve un mensaje de error. " +
            "Es útil para obtener información detallada sobre una división en particular.",
            "path": "/divisions/:DivisionId",
            "method": "GET",
            "parameters": "Parámetro de ruta",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66a8419cd4db258b4c324a53",
                        "name": "IDGS",
                        "description": "Desarrollo de software",
                        "__v": 0
                    }
            }`,
            "error": `
            404 Not Found - División no encontrada
            500 Internal Server Error - Error al obtener la división`
        },
        {
            "title": "Actualizar división por su ID",
            "description": "Este endpoint permite actualizar los detalles de una división existente utilizando su ID. " +
            "Los campos que se pueden actualizar incluyen el nombre y la descripción de la división. " +
            "Si la división se encuentra y se actualiza con éxito, se devuelve la información actualizada; de lo contrario, se devuelve un mensaje de error. La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/divisions/:DivisionId",
            "method": "PUT",
            "parameters": "Header, Body, Parámetro de ruta",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Ambiental",
                "description": "Enfocada en las soluciones para el medio ambiente"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66b9659b989d0ba0bf70d20a",
                        "name": "Ambiental",
                        "description": "Enfocada en las soluciones para el medio ambiente",
                        "__v": 0
                    }
            }`,
            "error": `
            404 Not Found - División no encontrada
            400 Bad Request - Error al actualizar la división`
        },
        {
            "title": "Eliminar división por su ID",
            "description": "Este endpoint permite eliminar una división existente usando su ID. " +
            "Antes de eliminar la división, se actualizan todos los documentos de usuarios y cursos asociados para asignarles una división predeterminada. " +
            "Si la división se elimina con éxito, se devuelve un mensaje de confirmación; de lo contrario, se devuelve un mensaje de error. La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/divisions/:DivisionId",
            "method": "DELETE",
            "parameters": "Header, Parámetro de ruta",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                    "message": "División eliminada"
                    }
            }`,
            "error": `
            404 Not Found - División no encontrada
            500 Internal Server Error - Error al eliminar la división`
        }
    ],
    //PROFESORES    PROFESORES  PROFESORES  PROFESORES  PROFESORES
    "Profesores": [
        {
            "title": "Obtener todos los profesores",
            "description": "Este endpoint permite obtener una lista de todos los profesores registrados en el sistema. " +
            "Los profesores son identificados por su rol, y se proporciona información adicional sobre la división a la que pertenecen y los roles asociados a cada profesor.",
            "path": "/professors",
            "method": "GET",
            "parameters": "N/A",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                        {
                            "_id": "66a84b2661c4946d0f25228c",
                            "name": "Juan",
                            "lname": "Pérez",
                            "age": 50,
                            "division": {
                                "_id": "66a8419cd4db258b4c324a53",
                                "name": "IDGS"
                            },
                            "email": "juan@gmail.com",
                            "password": "$2a$10$aUZBjn7D8OsScUTETCQg/OcwVHO0kZHIOJbTWzy/y8iIkbd4dpWHS",
                            "roles": [
                                {
                                    "_id": "66a83fa49c7e89ca73062ddf",
                                    "name": "professor"
                                }
                            ],
                            "createdAt": "2024-07-30T02:08:38.367Z",
                            "updatedAt": "2024-07-30T02:23:17.792Z"
                        }
                    ]
            }`,
            "error": `500 Internal Server Error - Error al obtener los profesores`
        },
        {
            "title": "Obtener profesor por ID",
            "description": "Este endpoint permite obtener la información detallada de un profesor específico utilizando su ID. " +
            "Incluye la información del profesor junto con la división a la que pertenece y los roles asociados.",
            "path": "/professors/:professorId",
            "method": "GET",
            "parameters": "Parámetro de ruta",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66a84b2661c4946d0f25228c",
                        "name": "Juan",
                        "lname": "Pérez",
                        "age": 50,
                        "division": {
                            "_id": "66a8419cd4db258b4c324a53",
                            "name": "IDGS"
                        },
                        "email": "juan@gmail.com",
                        "password": "$2a$10$aUZBjn7D8OsScUTETCQg/OcwVHO0kZHIOJbTWzy/y8iIkbd4dpWHS",
                        "roles": [
                            {
                                "_id": "66a83fa49c7e89ca73062ddf",
                                "name": "professor"
                            }
                        ],
                        "createdAt": "2024-07-30T02:08:38.367Z",
                        "updatedAt": "2024-07-30T02:23:17.792Z"
                    }
            }`,
            "error": `
            404 Not Found - Profesor no encontrado
            500 Internal Server Error - Error al obtener el profesor`
        },
        {
            "title": "Crear profesor",
            "description": "Este endpoint permite a los administradores del sistema agregar nuevos profesores a la base de datos. " +
            "El profesor creado estará asociado a una división específica y tendrá asignado el rol de 'professor'. " +
            "La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/professors/",
            "method": "POST",
            "parameters": "Header, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Carlos",
                "lname": "Pérez",
                "age": 48,
                "division": "Ambiental",
                "email": "carlos@gmail.com",
                "password": "pass1234",
                "roles": "professor"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "name": "Carlos",
                        "lname": "Pérez",
                        "age": 48,
                        "division": "66b9659b989d0ba0bf70d20a",
                        "email": "carlos@gmail.com",
                        "password": "$2a$10$J4pFg9/Ke8w9zUrynB7fs.hRBYioY7TG4q4SV8pAl8LjyjMG3mWtO",
                        "roles": [
                            "66a83fa49c7e89ca73062ddf"
                        ],
                        "_id": "66b970a43bc6e52b04928bf5",
                        "createdAt": "2024-08-12T02:17:08.293Z",
                        "updatedAt": "2024-08-12T02:17:08.293Z"
                    }
            }`,
            "error": `
            404 Not Found - División no encontrada
            500 Internal Server Error - Error al crear al profesor`
        },
        {
            "title": "Actualizar profesor por ID",
            "description": "Este endpoint permite a los administradores actualizar la información de un profesor existente en la base de datos. " +
            "Se puede modificar el nombre, apellido, división y edad del profesor. La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/professors/:professorId",
            "method": "PUT",
            "parameters": "Header, Parámetro de ruta, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Gilbert",
                "lname": "Pérez",
                "age": 48,
                "division": "Ambiental",
                "email": "gilbert@gmail.com",
                "password": "pass1234"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66b970a43bc6e52b04928bf5",
                        "name": "Gilbert",
                        "lname": "Pérez",
                        "age": 50,
                        "division": "66a8419cd4db258b4c324a53",
                        "email": "carlos@gmail.com",
                        "password": "$2a$10$J4pFg9/Ke8w9zUrynB7fs.hRBYioY7TG4q4SV8pAl8LjyjMG3mWtO",
                        "roles": [
                            "66a83fa49c7e89ca73062ddf"
                        ],
                        "createdAt": "2024-08-12T02:17:08.293Z",
                        "updatedAt": "2024-08-12T02:22:06.379Z"
                    }
            }`,
            "error": `
            404 Not Found - División no encontrada
            404 Not Found - Profesor no encontrado
            400 Bad Request - Error al actualizar el profesor`
        },
        {
            "title": "Eliminar profesor",
            "description": "Este endpoint permite a los administradores eliminar un profesor específico de la base de datos. " +
            "La eliminación se realiza a través del ID del profesor proporcionado en la solicitud. El acceso a esta operación está restringido a usuarios con rol de administrador.",
            "path": "/professors/:professorId",
            "method": "DELETE",
            "parameters": "Header, Parámetro de ruta",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                    "message": "Profesor eliminado"
                    }
            }`,
            "error": `
            404 Not Found - Profesor no encontrado
            500 Internal Server Error - Error al eliminar el profesor`
        }
    ],
    //ESTUDIANTES   ESTUDIANTES ESTUDIANTES ESTUDIANTES ESTUDIANTES
    "Estudiantes": [
        {
            "title": "Obtener todos los estudiantes",
            "description": "Este endpoint permite obtener una lista de todos los estudiantes registrados en el sistema. " +
            "La información de cada estudiante incluye los detalles de su división y roles. Está diseñado para ser accesible solo para usuarios autenticados con los permisos adecuados.",
            "path": "/students",
            "method": "GET",
            "parameters": "N/A",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": [
                        {
                            "_id": "66a843768851dcf52e1e4184",
                            "name": "Panchiro",
                            "lname": "Jimenez",
                            "age": 27,
                            "division": {
                                "_id": "66a8419cd4db258b4c324a53",
                                "name": "IDGS"
                            },
                            "email": "tony@gmail.com",
                            "password": "$2a$10$DCoL3HeBHDy27lztQxw7QeA6yyyU9gz1NuYLkHR2QpTP4.NggQkTm",
                            "roles": [
                                {
                                    "_id": "66a83fa49c7e89ca73062dde",
                                    "name": "student"
                                }
                            ],
                            "createdAt": "2024-07-30T01:35:50.323Z",
                            "updatedAt": "2024-07-30T01:42:01.368Z"
                        }
                    ],
            }`,
            "error": `500 Internal Server Error - Error al obtener los estudiantes`
        },
        {
            "title": "Obtener estudiante por ID",
            "description": "Este endpoint permite obtener los detalles de un estudiante específico mediante su ID. " +
            "La información incluye detalles del estudiante, como su nombre, apellido, correo electrónico, división y roles. " +
            "Está diseñado para ser accesible solo para usuarios autenticados con permisos adecuados.",
            "path": "/students/:studentId",
            "method": "GET",
            "parameters": "Parámetro de ruta",
            "headers": "N/A",
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66a843768851dcf52e1e4184",
                        "name": "Panchiro",
                        "lname": "Jimenez",
                        "age": 27,
                        "division": {
                            "_id": "66a8419cd4db258b4c324a53",
                            "name": "IDGS"
                        },
                        "email": "tony@gmail.com",
                        "password": "$2a$10$DCoL3HeBHDy27lztQxw7QeA6yyyU9gz1NuYLkHR2QpTP4.NggQkTm",
                        "roles": [
                            {
                                "_id": "66a83fa49c7e89ca73062dde",
                                "name": "student"
                            }
                        ],
                        "createdAt": "2024-07-30T01:35:50.323Z",
                        "updatedAt": "2024-07-30T01:42:01.368Z"
                    },
            }`,
            "error": `
            400 Not Found - Estudiante no encontrado
            500 Internal Server Error - Error al obtener el estudiante`
        },
        {
            "title": "Crear estudiante",
            "description": "Este endpoint permite crear un nuevo estudiante en el sistema. " +
            "Se deben proporcionar los detalles necesarios del estudiante, como nombre, apellido, correo electrónico, contraseña, división y edad. " +
            "El sistema verifica que la división y el rol existan antes de crear el estudiante. La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/students",
            "method": "POST",
            "parameters": "Header, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Flora",
                "lname": "Jimenez",
                "age": 27,
                "division": "IDGS",
                "email": "tony@gmail.com",
                "password": "pass1234",
                "roles": "student"
            }`,
            "response": `{
            "status": 201,
            "message": "Created",
            "data": {
                        "name": "Flora",
                        "lname": "Jimenez",
                        "age": 27,
                        "division": "66a8419cd4db258b4c324a53",
                        "email": "tony@gmail.com",
                        "password": "$2a$10$J65g.3qEy7RZrCjiUyEGqut9ZVmSjGZeNqKFbdkJm0Yf.vB7yW8Bm",
                        "roles": [
                            "66a83fa49c7e89ca73062dde"
                        ],
                        "_id": "66b976c53cf71814fdda5b56",
                        "createdAt": "2024-08-12T02:43:17.652Z",
                        "updatedAt": "2024-08-12T02:43:17.652Z"
                    },
            }`,
            "error": `
            404 Not Found - División no encontrada
            500 Internal Server Error - Error al crear el estudiante`
        },
        {
            "title": "Actualizar estudiante por ID",
            "description": "Este endpoint permite actualizar la información de un estudiante existente en el sistema. " +
            "Se pueden modificar detalles como el nombre, apellido, división y edad del estudiante. " +
            "El sistema verifica que la división y el rol existan antes de realizar la actualización. La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/students/:studentId",
            "method": "PUT",
            "parameters": "Header, Parámetro de ruta, Body",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": `
            {
                "name": "Sona",
                "lname": "Jimenez",
                "age": 27,
                "division": "IDGS",
                "email": "sona@gmail.com",
                "password": "pass1234"
            }`,
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                        "_id": "66b976c53cf71814fdda5b56",
                        "name": "Sona",
                        "lname": "Jimenez",
                        "age": 27,
                        "division": "66a8419cd4db258b4c324a53",
                        "email": "tony@gmail.com",
                        "password": "$2a$10$J65g.3qEy7RZrCjiUyEGqut9ZVmSjGZeNqKFbdkJm0Yf.vB7yW8Bm",
                        "roles": [
                            "66a83fa49c7e89ca73062dde"
                        ],
                        "createdAt": "2024-08-12T02:43:17.652Z",
                        "updatedAt": "2024-08-12T02:48:27.223Z"
                    },
            }`,
            "error": `
            404 Not Found - División no encontrada
            404 Not Found - Estudiante no encontrado
            400 Bad Request - Error al actualizar el estudiante`
        },
        {
            "title": "Eliminar estudiante por ID",
            "description": "Este endpoint permite eliminar un estudiante específico del sistema. " +
            "La eliminación verifica primero que el estudiante exista y tenga el rol adecuado antes de proceder a eliminarlo de la base de datos. La solicitud requiere autenticación y privilegios de administrador.",
            "path": "/students/:studentId",
            "method": "DELETE",
            "parameters": "Header, Parámetro de ruta",
            "headers": `
            Authorization: Bearer <token>
            x-access-token = {{TOKEN}}
            `,
            "body": "N/A",
            "response": `{
            "status": 200,
            "message": "OK",
            "data": {
                    "message": "Estudiante eliminado"
                    },
            }`,
            "error": `
            404 Not Found - Estudiante no encontrado
            500 Internal Server Error - Error al eliminar el estudiante`
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {

    // SPA Navigation
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar a, .top-navbar a');

    function setActiveSection(hash) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.querySelector(hash);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const hash = this.getAttribute('href');
            setActiveSection(hash);
        });
    });

    // Set default section
    setActiveSection('#home');

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful login
                document.getElementById('login-response').innerHTML = `<p>Login successful!</p>`;
                // Save the token in localStorage
                localStorage.setItem('authToken', data.token);
                // Obtener información del usuario y actualizar la vista
                await getUserInfo();
                // Redirect to home
                window.location.reload();
            } else {
                // Handle errors
                document.getElementById('login-response').innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('login-response').innerHTML = `<p>Error al intentar iniciar sesión. Inténtalo de nuevo más tarde.</p>`;
        }
    });

    // Handle logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Remove the token from localStorage
            localStorage.clear();
            // Update navbar
            updateNavbar();
            // Redirect to home
            window.location.reload();
        });
    }

    // Function to get user information
    async function getUserInfo() {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener la información del usuario.');
                }

                const data = await response.json();
                //console.log(data);
                // Display user info in the navbar
                document.getElementById('user-info').textContent = `Hola, ${data.name} (${data.role})`;
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userRole', data.role);

                if (data.role === 'student') {
                    // Lógica adicional para estudiantes
                } else if (data.role === 'professor') {
                    document.getElementById('student-controls').classList.add('hidden');
                    document.getElementById('professor-controls').classList.remove('hidden');
                    loadCourses(true); // Cargar todos los cursos para los profesores
                } else if (data.role === 'admin') {
                    // Lógica adicional para administradores si es necesario
                }
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
                document.getElementById('user-info').textContent = 'Error al obtener información del usuario.';
            }
        }
    }

    // Function to update the navbar based on login status
    function updateNavbar() {
        const token = localStorage.getItem('authToken');
        const loginLink = document.getElementById('login-link');
        const logoutButton = document.getElementById('logout-button');
        const userInfo = document.getElementById('user-info');

        if (token) {
            loginLink.style.display = 'none';
            logoutButton.style.display = 'inline';
            getUserInfo();
        } else {
            loginLink.style.display = 'inline';
            logoutButton.style.display = 'none';
            userInfo.textContent = '';
        }
    }

    // Initialize the navbar
    updateNavbar();

    // CURSOS   CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS  CURSOS
    // Función para cargar todos los curos o solo los cursos del estudiante
    async function loadCourses(showAll) {
        const token = localStorage.getItem('authToken');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');
        const urlParams = new URLSearchParams(window.location.search);
        const divisionId = urlParams.get('division');

        try {
            // Obtener cursos
            let url = showAll ? '/courses' : '/courses/my-courses';
            if (divisionId) {
                url += `?division=${divisionId}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            });

            const courses = await response.json();

            // Inicializar pendingCourses como un array vacío
            let pendingCourses = [];

            // Solo obtener solicitudes pendientes si el usuario es un estudiante
            if (userRole === 'student') {
                const requestsResponse = await fetch('/courses/student/requests', {
                    method: 'GET',
                    headers: {
                        'x-access-token': token
                    }
                });

                const pendingRequests = await requestsResponse.json();

                // Verificar que pendingRequests sea un array
                pendingCourses = Array.isArray(pendingRequests)
                    ? pendingRequests.map(req => req._id.toString())
                    : []; // Si no es un array, usar un array vacío
            }

            // Seleccionar el contenedor de cursos basado en el parámetro
            const coursesList = document.getElementById(showAll ? 'courses-list' : 'my-courses-list');
            coursesList.innerHTML = '';

            if (courses.length === 0) {
                coursesList.innerHTML = `<p>No hay cursos disponibles.</p>`;
            } else {
                courses.forEach(course => {
                    const isEnrolled = course.students.some(student => student.email === userEmail);
                    const hasPendingRequest = pendingCourses.includes(course._id.toString());

                    const courseElement = document.createElement('div');
                    courseElement.className = 'course-item';
                    courseElement.innerHTML = `
                        <h3>${course.name}</h3>
                        <p>Profesor: ${course.professor.name}</p>
                        <p>Duración: ${course.duration}</p>
                    `;

                    if (userRole === 'student') {
                        if (isEnrolled) {
                            courseElement.innerHTML += `<span class="enrolled-label">Inscrito ✅</span>`;
                        } else if (hasPendingRequest) {
                            courseElement.innerHTML += `<span class="pending-label">Pendiente 📋</span>`;
                        } else {
                            courseElement.innerHTML += `
                                <button class="enroll-button" data-course-id="${course._id}">Inscribirme</button>
                            `;
                        }
                    } else if (userRole === 'professor') {
                        courseElement.innerHTML += `
                            <button class="edit-button" data-course-id="${course._id}">Editar</button>
                            <button class="delete-button" data-course-id="${course._id}">Eliminar</button>
                        `;
                    }

                    coursesList.appendChild(courseElement);
                });
            }

            document.getElementById('courses-list').classList.toggle('hidden', !showAll);
            document.getElementById('my-courses-list').classList.toggle('hidden', showAll);

            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', () => editCourse(button.getAttribute('data-course-id')));
            });

            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', () => deleteCourse(button.getAttribute('data-course-id')));
            });
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    }

    // Controlar los clics en las pestañas de cursos
    document.getElementById('all-courses-tab').addEventListener('click', function () {
        loadCourses(true); // true para cargar todos los cursos
    });

    document.getElementById('my-courses-tab').addEventListener('click', function () {
        loadCourses(false); // false para cargar solo los cursos del estudiante
    });

    document.getElementById('search-course-button').addEventListener('click', function () {
        const searchText = document.getElementById('course-search').value.toLowerCase();
        filterCourses(searchText);
    });

    document.getElementById('course-search').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const searchText = document.getElementById('course-search').value.toLowerCase();
            filterCourses(searchText);
        }
    });

    //Función para buscar un curso específico
    function filterCourses(searchText) {
        const allCoursesList = document.getElementById('courses-list');
        const myCoursesList = document.getElementById('my-courses-list');

        // Helper function to filter courses
        function filterList(list) {
            const courses = list.getElementsByClassName('course-item');
            for (let i = 0; i < courses.length; i++) {
                const course = courses[i];
                const courseName = course.getElementsByTagName('h3')[0].textContent.toLowerCase();
                if (courseName.includes(searchText)) {
                    course.style.display = 'block';
                } else {
                    course.style.display = 'none';
                }
            }
        }

        filterList(allCoursesList);
        filterList(myCoursesList);
    }

    // Función para abrir el modal de edición del curso
    function editCourse(courseId) {
        console.log('Editando curso con ID:', courseId);
        openEditCourseModal(courseId); // Asegúrate de que esta función esté implementada
    }

    // Function to open the modal in create mode
    function openCreateCourseModal() {
        //console.log('Abriendo el modal para crear curso');
        document.getElementById('modal-title').textContent = 'Crear Curso';
        document.getElementById('create-course-form').reset();
        document.getElementById('students-list').classList.add('hidden');
        document.getElementById('create-course-modal').style.display = 'block';
    }

    // Function to open the modal in edit mode
    async function openEditCourseModal(courseId) {
        //console.log('Abriendo el modal para editar curso', courseId);
        document.getElementById('modal-title').textContent = 'Editar Curso';
        document.getElementById('students-list').classList.remove('hidden');

        const token = localStorage.getItem('authToken');

        try {
            // Almacena el ID del curso en localStorage
            localStorage.setItem('editingCourseId', courseId);
            // Obtener los detalles del curso
            const response = await fetch(`/courses/${courseId}`, {
                method: 'GET',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                }
            });

            const course = await response.json();
            //console.log(course.division._id);

            // Fill the form with course data
            document.getElementById('course-name').value = course.name;
            document.getElementById('course-description').value = course.description;
            document.getElementById('course-duration').value = course.duration;
            document.getElementById('course-active').checked = course.isActive;

            // Llenar el campo de la división
            const divisionSelect = document.getElementById('course-division');

            // Asegúrate de que el <select> contenga las opciones correctas antes de intentar seleccionarlas
            if (divisionSelect) {
                for (let option of divisionSelect.options) {
                    if (option.value === course.division.name) { // O usa el identificador correcto
                        divisionSelect.value = option.value;
                        break;
                    }
                }
            }

            // Cargar los estudiantes inscritos
            const studentsList = document.getElementById('students');
            studentsList.innerHTML = '';

            for (const studentId of course.students) {
                // Obtener detalles del estudiante usando su ID
                const studentResponse = await fetch(`/students/${studentId}`, {
                    method: 'GET',
                    headers: {
                        'x-access-token': token
                    }
                });

                const student = await studentResponse.json();

                if (student) {
                    const li = document.createElement('li');
                    const idStudent = student._id;
                    const studentEmail = student.email;

                    // Crear un contenedor para el nombre y el botón
                    const container = document.createElement('div');
                    container.style.display = 'flex';
                    container.style.alignItems = 'center';

                    // Crear el nombre del estudiante
                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = student.name; // Asume que `name` es el campo que contiene el nombre del estudiante
                    nameSpan.style.marginRight = '10px'; // Espacio entre el nombre y el botón

                    // Crear el botón de eliminación
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Eliminar';
                    removeButton.id = `remove-button-${idStudent}`; // Asignar un ID único
                    removeButton.addEventListener('click', () => removeStudentFromCourse(courseId, studentEmail));

                    // Agregar el nombre y el botón al contenedor
                    container.appendChild(nameSpan);
                    container.appendChild(removeButton);

                    // Agregar el contenedor a la lista
                    li.appendChild(container);
                    studentsList.appendChild(li);
                }
            }

            document.getElementById('create-course-modal').style.display = 'block';
        } catch (error) {
            console.error('Error al cargar el curso:', error);
        }
    }

    // Function to close the modal
    function closeCreateCourseModal() {
        //console.log('Cerrando el modal');
        localStorage.removeItem('editingCourseId');
        document.getElementById('create-course-modal').style.display = 'none';
        loadCourses(true); // Recargar la lista de cursos
    }

    window.onclick = function (event) {
        const modal = document.getElementById('create-course-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
            loadCourses(true); // Recargar la lista de cursos
        }
    }

    // Function to create or update a course
    async function saveCourse(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const token = localStorage.getItem('authToken');
        const courseId = document.getElementById('modal-title').textContent === 'Editar Curso' ? localStorage.getItem('editingCourseId') : null;
        const name = document.getElementById('course-name').value;
        const description = document.getElementById('course-description').value;
        const divisionName = document.getElementById('course-division').value;
        const duration = document.getElementById('course-duration').value;
        const isActive = document.getElementById('course-active').checked;
        const professorEmail = localStorage.getItem('userEmail');

        const method = courseId ? 'PUT' : 'POST';
        const url = courseId ? `/courses/${courseId}` : '/courses';

        if (name && description && divisionName && duration && professorEmail) {
            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        divisionName,
                        duration,
                        isActive,
                        professorEmail
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al guardar el curso.');
                }

                const data = await response.json();
                console.log('Curso guardado:', data);
                closeCreateCourseModal();
            } catch (error) {
                console.error('Error al guardar el curso:', error);
            }
        }
    }

    // Function to remove a student from a course
    async function removeStudentFromCourse(courseId, studentEmail) {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`/courses/remove-student/${courseId}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentEmail })
            });

            if (!response.ok) {
                throw new Error('Error al eliminar al estudiante del curso.');
            }

            const data = await response.json();
            console.log('Estudiante eliminado:', data);
            openEditCourseModal(courseId); // Recargar la lista de estudiantes
        } catch (error) {
            console.error('Error al eliminar al estudiante del curso:', error);
        }
    }

    // Event listeners
    document.getElementById('create-course-btn').addEventListener('click', () => {
        console.log('Botón de Crear Curso clickeado');
        openCreateCourseModal();
    });

    document.getElementById('close-create-course-modal').addEventListener('click', () => {
        console.log('Botón de Cerrar Modal clickeado');
        closeCreateCourseModal();
    });

    document.getElementById('create-course-form').addEventListener('submit', (event) => {
        console.log('Formulario de Crear/Editar Curso enviado');
        saveCourse(event);
    });

    async function deleteCourse(courseId) {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el curso.');
            }

            console.log('Curso eliminado exitosamente');
            loadCourses(true); // Recargar la lista de cursos
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    }

    // Function to handle course enrollment request
    async function enrollCourse(courseId) {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`/courses/${courseId}/request`, {
                method: 'POST',
                headers: {
                    'x-access-token': token, // Enviar el token en el encabezado
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Solicitud de inscripción enviada:', data);
                // Actualizar el botón a "Pendiente"
                const button = document.querySelector(`button[data-course-id="${courseId}"]`);
                button.textContent = 'Pendiente';
                button.disabled = true;
            } else {
                console.error('Falló la solicitud de inscripción:', data.message);
            }
        } catch (error) {
            console.error('Error al solicitar inscripción:', error);
        }
    }

    // Add event listener for enrollment buttons
    document.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('enroll-button')) {
            const courseId = event.target.getAttribute('data-course-id');
            enrollCourse(courseId);
        }
    });

    // Función para abrir el modal de solicitudes pendientes
    function openPendingRequestsModal() {
        document.getElementById('pending-requests-modal').style.display = 'block';
    }

    // Función para cerrar el modal de solicitudes pendientes
    function closePendingRequestsModal() {
        document.getElementById('pending-requests-modal').style.display = 'none';
    }

    // Función para aprobar o rechazar una solicitud
    async function handleRequest(requestId, status) {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`/courses/request/${requestId}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la solicitud.');
            }

            const data = await response.json();
            console.log('Solicitud actualizada:', data);
            // Puedes añadir lógica adicional aquí para actualizar la lista de solicitudes pendientes

            // Refrescar la lista de solicitudes pendientes
            viewPendingRequests();
        } catch (error) {
            console.error('Error al actualizar la solicitud:', error);
        }
    }

    // Función para obtener y mostrar las solicitudes pendientes
    async function viewPendingRequests() {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch('/courses/pending/requests', {
                method: 'GET',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener las solicitudes pendientes.');
            }

            const pendingRequests = await response.json();
            console.log(pendingRequests);
            const requestsList = document.getElementById('pending-requests-list');
            requestsList.innerHTML = ''; // Limpiar la lista anterior

            pendingRequests.forEach(request => {
                const li = document.createElement('li');
                li.textContent = `${request.student.name} (${request.student.email}) - Curso: ${request.course.name}`;

                // Botón de aceptar
                const acceptButton = document.createElement('button');
                acceptButton.className = 'accept-btn';
                acceptButton.innerHTML = '✔️';
                acceptButton.addEventListener('click', () => handleRequest(request._id, 'approved'));

                // Botón de rechazar
                const rejectButton = document.createElement('button');
                rejectButton.className = 'reject-btn';
                rejectButton.innerHTML = '❌';
                rejectButton.addEventListener('click', () => handleRequest(request._id, 'rejected'));

                li.appendChild(acceptButton);
                li.appendChild(rejectButton);
                requestsList.appendChild(li);
            });

            openPendingRequestsModal();
        } catch (error) {
            console.error('Error al obtener las solicitudes pendientes:', error);
        }
    }

    // Event listeners para abrir y cerrar el modal
    document.getElementById('view-pending-requests-btn').addEventListener('click', viewPendingRequests);
    document.getElementById('close-pending-requests-modal').addEventListener('click', closePendingRequestsModal);

    window.onclick = function (event) {
        const modal = document.getElementById('pending-requests-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS    DIVISIONS
    // Funci{on para cargar todas las divisiones}
    async function loadDivisions() {
        const divisionSelect = document.getElementById('course-division');
        const divisionsList = document.getElementById('divisions-list');

        // Limpiar el contenedor y el select cada vez que cargamos divisiones
        divisionSelect.innerHTML = '<option value="">Selecciona una división</option>'; // Limpiar el select
        divisionsList.innerHTML = ''; // Limpiar el contenedor de tarjetas

        try {
            const response = await fetch('/divisions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const divisions = await response.json();

            // Llenar el <select> con las divisiones
            divisions.forEach(division => {
                const option = document.createElement('option');
                option.value = division.name;
                option.textContent = division.name;
                divisionSelect.appendChild(option);
            });

            // Crear tarjetas para cada división y agregar al contenedor
            divisions.forEach(division => {
                const card = document.createElement('div');
                card.className = 'division-card'; // Cambia el nombre de la clase si es necesario
                card.innerHTML = `
                    <h3>${division.name}</h3>
                    <p>${division.description}</p>
                `;
                divisionsList.appendChild(card);
            });

        } catch (error) {
            console.error('Error al cargar las divisiones:', error);
        }
    }

    // Llamar a la función para cargar las divisiones cuando se abra la modal
    document.getElementById('create-course-modal').addEventListener('click', loadDivisions);

    // Controlar los clics en las pestañas de divisiones
    document.getElementById('all-divisions-tab').addEventListener('click', function () {
        loadDivisions(); // Llamar a loadDivisions para cargar todas las divisiones
    });

    // Función para filtrar divisiones
    function filterDivisions(searchText) {
        const allDivisions = document.querySelectorAll('.division-card'); // Asegúrate de que el selector coincide con las tarjetas creadas

        allDivisions.forEach(card => {
            const divisionName = card.querySelector('h3').textContent.toLowerCase();
            if (divisionName.includes(searchText)) {
                card.style.display = ''; // Mostrar tarjeta si coincide
            } else {
                card.style.display = 'none'; // Ocultar tarjeta si no coincide
            }
        });
    }

    document.getElementById('search-division-button').addEventListener('click', function () {
        const searchText = document.getElementById('division-search').value.toLowerCase();
        filterDivisions(searchText);
    });

    document.getElementById('division-search').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const searchText = document.getElementById('division-search').value.toLowerCase();
            filterDivisions(searchText);
        }
    });

    // Función para cargar los cursos por división
    async function loadCoursesByDivision(divisionName) {
        try {
            const response = await fetch('/api/courses/by-division', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ divisionName })
            });
            const courses = await response.json();

            const coursesList = document.getElementById('courses-list');
            coursesList.innerHTML = ''; // Limpiar el contenido actual

            if (courses.length === 0) {
                coursesList.innerHTML = '<p>No se encontraron cursos para esta división.</p>';
                return;
            }


            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.innerHTML = `
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <p>Duración: ${course.duration}</p>
                <p>Profesor: ${course.professor.name}</p>
            `;
                coursesList.appendChild(courseCard);
            });
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    }

    // DOCUMENTACIÓN    DOCUMENTACIÓN   DOCUMENTACIÓN   DOCUMENTACIÓN   DOCUMENTACIÓN
    const endpointList = document.getElementById('endpoint-list');

    for (const category in endpoints) {
        const categoryHeader = document.createElement('h2');
        categoryHeader.textContent = category;
        endpointList.appendChild(categoryHeader);

        const endpointItems = document.createElement('ul');
        endpoints[category].forEach(endpoint => {
            const listItem = document.createElement('li');

            const link = document.createElement('a');
            link.href = "#";
            link.textContent = endpoint.title;

            // Add a hover effect
            link.style.textDecoration = 'none';
            link.style.color = '#007bff';
            link.style.cursor = 'pointer';

            link.onmouseover = () => link.style.textDecoration = 'underline';
            link.onmouseout = () => link.style.textDecoration = 'none';

            link.onclick = (event) => {
                event.preventDefault();
                showEndpointDetails(endpoint);
            };

            listItem.appendChild(link);
            endpointItems.appendChild(listItem);
        });
        endpointList.appendChild(endpointItems);
    }
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function showEndpointDetails(endpoint) {
    document.getElementById('endpoint-title').textContent = endpoint.title;
    document.getElementById('endpoint-description').textContent = endpoint.description;
    document.getElementById('endpoint-path').textContent = endpoint.path;
    document.getElementById('endpoint-method').textContent = endpoint.method;
    document.getElementById('endpoint-parameters').textContent = endpoint.parameters;
    document.getElementById('endpoint-headers').textContent = endpoint.headers;
    document.getElementById('endpoint-body').textContent = endpoint.body;
    document.getElementById('endpoint-response').textContent = endpoint.response;
    document.getElementById('endpoint-error').textContent = endpoint.error;

    document.getElementById('endpoint-detail').style.display = 'block';
}

function getUserStatus() {
    return {
        role: localStorage.getItem('userRole')
    };
}