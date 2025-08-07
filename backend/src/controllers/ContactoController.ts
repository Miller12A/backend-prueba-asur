import { AppDataSource } from "../data-source";
import { Contacto } from "../entities/Contacto";
import { Request, Response } from "express";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../utils/response";
import { ILike } from "typeorm";

const repo = AppDataSource.getRepository(Contacto);

export class ContactoController {
  
  static async crearContacto(req: Request, res: Response) {
    try {
      const { nombre, apellido, correo, telefono } = req.body;

      if (!nombre || !apellido || !correo || !telefono) {
        return res
          .status(400)
          .json(
            errorResponse(
              "Todos los campos son obligatorios: nombre, apellido, correo, telefono.",
              400
            )
          );
      }

      // Verificar si el teléfono ya está registrado
      const telefonoExistente = await repo.findOne({ where: { telefono } });
      if (telefonoExistente) {
        return res
          .status(409)
          .json(
            errorResponse(
              "El número de teléfono ya se encuentra registrado.",
              409
            )
          );
      }

      const contacto = repo.create({ nombre, apellido, correo, telefono });
      const result = await repo.save(contacto);

      return res
        .status(201)
        .json(successResponse("Contacto creado con éxito", result, 201));
    } catch (error) {
      return res
        .status(500)
        .json(
          errorResponse(
            "Error al crear contacto",
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message: string }).message
              : String(error)
          )
        );
    }
  }

  static async obtenerContactos(req: Request, res: Response) {
    const contactos = await repo.find();
    return res.json(
      successResponse("Contactos obtenidos con éxito", contactos)
    );
  }

  static async actualizarContacto(req: Request, res: Response) {
    const { id } = req.params;

    if (!req.body) {
      return res
        .status(400)
        .json(errorResponse("No se recibió body en la solicitud", 400));
    }

    const { nombre, apellido, correo, telefono } = req.body;

    if (!nombre || !apellido || !correo || !telefono) {
      return res
        .status(400)
        .json(
          errorResponse(
            "Todos los campos son obligatorios: nombre, apellido, correo, telefono.",
            400
          )
        );
    }

    try {
      const contacto = await repo.findOne({
        where: { id_contacto: Number(id) },
      });

      if (!contacto) {
        return res
          .status(404)
          .json(notFoundResponse("Contacto no encontrado", 404));
      }

      const telefonoExistente = await repo.findOne({
        where: { telefono },
      });

      if (
        telefonoExistente &&
        telefonoExistente.id_contacto !== contacto.id_contacto
      ) {
        return res
          .status(409)
          .json(
            errorResponse(
              "El número de teléfono ya se encuentra registrado.",
              409
            )
          );
      }

      contacto.nombre = nombre;
      contacto.apellido = apellido;
      contacto.correo = correo;
      contacto.telefono = telefono;

      const result = await repo.save(contacto);
      return res.json(
        successResponse("Contacto actualizado con éxito", result)
      );
    } catch (error) {
      return res
        .status(500)
        .json(
          errorResponse(
            "Error al actualizar contacto",
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message: string }).message
              : String(error)
          )
        );
    }
  }

  static async obtenerContactoId(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res
        .status(400)
        .json(errorResponse("ID inválido. Debe ser un número.", 400));
    }

    const contacto = await repo.findOneBy({ id_contacto: Number(id) });

    if (!contacto) {
      return res.status(404).json(notFoundResponse("Contacto no encontrado"));
    }

    return res.json(successResponse("Contacto encontrado", contacto));
  }

  static async buscarContactos(req: Request, res: Response) {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res
        .status(400)
        .json(
          errorResponse("Debes proporcionar un término de búsqueda válido", 400)
        );
    }

    const contactos = await repo
      .createQueryBuilder("contacto")
      .where("contacto.nombre ILIKE :term", { term: `%${q}%` })
      .orWhere("contacto.apellido ILIKE :term", { term: `%${q}%` })
      .orWhere("contacto.correo ILIKE :term", { term: `%${q}%` })
      .orWhere("contacto.telefono ILIKE :term", { term: `%${q}%` })
      .getMany();

    if (contactos.length === 0) {
      return res
        .status(404)
        .json(notFoundResponse("No se encontraron contactos con ese término"));
    }

    return res.json(successResponse("Contactos encontrados", contactos));
  }

  static async eliminarContacto(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res
        .status(400)
        .json(errorResponse("ID inválido. Debe ser un número.", 400));
    }

    try {
      const contacto = await repo.findOneBy({ id_contacto: Number(id) });

      if (!contacto) {
        return res.status(404).json(notFoundResponse("Contacto no encontrado"));
      }

      await repo.remove(contacto);
      return res.json(successResponse(
        "Contacto eliminado con éxito",
        contacto
      ));
    } catch (error) {
      return res
        .status(500)
        .json(
          errorResponse(
            "Error al eliminar contacto",
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message: string }).message
              : String(error)
          )
        );
    }
  }
}
