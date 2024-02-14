import { Request, Response } from "express";
import { globalState } from "../..";
import {
  findByIdServiceSchema,
  findServiceSchema,
  serviceSchema,
} from "./servicesSchema";

class ServiceController {
  static create(req: Request, res: Response) {
    const data = serviceSchema.parse(req.body);
    globalState.services.push(data);

    res.json({ success: true });
  }

  static list(req: Request, res: Response) {
    const data = findServiceSchema.parse(req.query);
    const { country, state, city } = data;

    const services = globalState.services;

    res.json(services);
  }

  static findById(req: Request, res: Response) {
    const data = findByIdServiceSchema.parse(req.query);
    const { id } = data;

    const services = globalState.services.find((service) => {
      return service.id === id;
    });

    res.json(services);
  }
}

export default ServiceController;
