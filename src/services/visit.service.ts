import { Injectable } from "@nestjs/common";
import { VisitRepository } from "../repositories/visit.repository";

@Injectable()
export class VisitService {
  constructor(private visitRepository: VisitRepository) {}

  async create(urlId: string, ip: string) {
    return await this.visitRepository.create(urlId, ip);
  }
}
