import { Router } from "express";
import { ContactoController } from "../controllers/ContactoController";


const router = Router();


/**
 * @swagger
 * tags:
 *   name: Contactos
 *   description: Endpoints de gestión de contactos
 */




/** * @swagger
 * /contacts:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto creado con éxito
 *       500:
 *         description: Error al crear contacto
 */
router.post("/create", ContactoController.crearContacto)



/**
 * @swagger
 * /contacts/all:
 *   get:
 *     summary: Obtiene todos los contactos
 *     tags: [Contactos]
 *     responses:
 *       200:
 *         description: Contactos obtenidos con éxito
 */
router.get("/all", ContactoController.obtenerContactos)

/**
 * @swagger
 * /contactss/buscar:
 *   get:
 *     summary: Buscar contactos por q
 *     tags: [Contactos]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: q del contacto a buscar
 *     responses:
 *       200:
 *         description: Contactos encontrados con éxito
 *       404:
 *         description: No se encontraron contactos con ese q
 */
router.get("/buscar", ContactoController.buscarContactos);


/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Obtiene un contacto por ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a obtener
 *     responses:
 *       200:
 *         description: Contacto obtenido con éxito
 *       404:
 *         description: Contacto no encontrado
 */
router.get("/:id", ContactoController.obtenerContactoId);





/**
 * @swagger
 * /contacts/update/{id}:
 *   put:
 *     summary: Actualiza un contacto existente
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado con éxito
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error al actualizar contacto
 */
router.put("/update/:id", ContactoController.actualizarContacto);



/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Elimina un contacto por ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a eliminar
 *     responses:
 *       200:
 *         description: Contacto eliminado con éxito
 *       404:
 *         description: Contacto no encontrado
 */
router.delete("/delete/:id", ContactoController.eliminarContacto);


export const contactoRoutes = router;