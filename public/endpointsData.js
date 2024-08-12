export const endpoints = [
    {
        name: "Obtener todas las divisiones",
        description: "Este endpoint permite obtener todas las divisiones existentes.",
        route: "router.get('/', divisionsCtrl.getDivisions);",
        controller: `
            //Obtener todas las divisiones
            export const getDivisions = async (req, res) => {
                try{
                    const divisions = await Division.find({ name: { $ne: 'default' } });
                    res.json(divisions);
                } catch(error){
                    res.status(500).json({message: error.message})
                }
            }
        `,
        requestBody: null,
        response: {
            success: {
                status: 200,
                body: "[{\"_id\": \"string\", \"name\": \"string\", \"description\": \"string\"}]"
            },
            error: {
                status: 500,
                body: "{\"message\": \"string\"}",
                resolution: "Asegúrate de que el servidor esté funcionando correctamente."
            }
        }
    },
    {
        name: "Crear división",
        description: "Este endpoint permite crear una nueva división.",
        route: "router.post('/', [authJwt.verifyToken, authJwt.isAdmin], divisionsCtrl.createDivision);",
        controller: `
            //Crear una division
            export const createDivision = async (req, res) => {
                try {
                    const { name, description } = req.body;
                    const newDivision = new Division({ name, description });
                    const divisionSave = await newDivision.save();
                    res.status(201).json(divisionSave);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            }
        `,
        requestBody: {
            name: "string",
            description: "string"
        },
        response: {
            success: {
                status: 201,
                body: "{\"_id\": \"string\", \"name\": \"string\", \"description\": \"string\"}"
            },
            error: {
                status: 500,
                body: "{\"message\": \"string\"}",
                resolution: "Asegúrate de que los datos enviados en la solicitud sean correctos y que el servidor esté funcionando correctamente."
            }
        }
    },
    {
        name: "Obtener una división por ID",
        description: "Este endpoint permite obtener una división específica por su ID.",
        route: "router.get('/:DivisionId', divisionsCtrl.getDivisionById);",
        controller: `
            //Obtener una division por su ID
            export const getDivisionById = async (req, res) => {
                const { DivisionId } = req.params;
                try {
                    const division = await Division.findById(DivisionId);
                    if (!division) return res.status(404).json({ message: 'Division no encontrada' });
                    res.json(division);
                } catch (error) {
                    res.status(500).json({ message: 'Error al obtener la division' });
                }
            }
        `,
        requestBody: null,
        response: {
            success: {
                status: 200,
                body: "{\"_id\": \"string\", \"name\": \"string\", \"description\": \"string\"}"
            },
            error: {
                status: 500,
                body: "{\"message\": \"string\"}",
                resolution: "Asegúrate de que el ID proporcionado sea correcto y que el servidor esté funcionando correctamente."
            }
        }
    },
    {
        name: "Actualizar una división por ID",
        description: "Este endpoint permite actualizar una división específica por su ID.",
        route: "router.put('/:DivisionId', [authJwt.verifyToken, authJwt.isAdmin], divisionsCtrl.updateDivisionById);",
        controller: `
            //Actualizar una division por su ID
            export const updateDivisionById = async (req, res) => {
                const { DivisionId } = req.params;
                const { name, description } = req.body;
                try {
                    const updatedDivision = await Division.findByIdAndUpdate(DivisionId, { name, description }, { new: true });
                    if (!updatedDivision) return res.status(404).json({ message: 'Division no encontrada' });
                    res.json(updatedDivision);
                } catch (error) {
                    res.status(400).json({ message: 'Error al actualizar la division' });
                }
            }
        `,
        requestBody: {
            name: "string",
            description: "string"
        },
        response: {
            success: {
                status: 200,
                body: "{\"_id\": \"string\", \"name\": \"string\", \"description\": \"string\"}"
            },
            error: {
                status: 400,
                body: "{\"message\": \"string\"}",
                resolution: "Asegúrate de que los datos enviados en la solicitud sean correctos y que el servidor esté funcionando correctamente."
            }
        }
    },
    {
        name: "Eliminar una división por ID",
        description: "Este endpoint permite eliminar una división específica por su ID.",
        route: "router.delete('/:DivisionId', [authJwt.verifyToken, authJwt.isAdmin], divisionsCtrl.deleteDivisionById);",
        controller: `
            //Eliminar una division por su ID
            export const deleteDivisionById = async (req, res) => {
                const { DivisionId } = req.params;
                try {
                    await User.updateMany(
                        { division: DivisionId },
                        { $set: { division: "66a1f139997f8623e4c64f77" } }  
                    );

                    await Course.updateMany(
                        { division: DivisionId },
                        { $set: { division: "66a1f139997f8623e4c64f77" } }  
                    );

                    const deletedDivision = await Division.findByIdAndDelete(DivisionId);
                    if (!deletedDivision) return res.status(404).json({ message: 'Division no encontrada' });
                    res.json({ message: 'Division eliminada' });
                } catch (error) {
                    res.status(500).json({ message: 'Error al eliminar la division' });
                }
            }
        `,
        requestBody: null,
        response: {
            success: {
                status: 200,
                body: "{\"message\": \"Division eliminada\"}"
            },
            error: {
                status: 500,
                body: "{\"message\": \"string\"}",
                resolution: "Asegúrate de que el ID proporcionado sea correcto y que el servidor esté funcionando correctamente."
            }
        }
    }
];
