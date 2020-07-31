import * as uuid from "uuid";

import OngsRepository from "../repositories/OngsRepository";
import { IOng } from "../models/Ong";

export default class OngService {
  ongRepository: OngsRepository;

  constructor(ongRepository: OngsRepository = new OngsRepository()) {
    this.ongRepository = ongRepository;
  }

  async getAllOngs(): Promise<IOng[]> {
    return this.ongRepository.getAllOngs();
  }

  async createOng(name: string, description: string): Promise<IOng> {
    const id = uuid.v4();

    return await this.ongRepository.createOng({
      id,
      name,
      description,
    });
  }

  async updateOng(partialOng: Partial<IOng>) {
    return await this.ongRepository.updateOng(partialOng);
  }

  async deleteOngById(id: string) {
    return await this.ongRepository.deleteOngById(id);
  }
}
