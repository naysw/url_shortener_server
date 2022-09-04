import { Injectable } from "@nestjs/common";
import { Visit } from "@prisma/client";
import { VisitRepository } from "../repositories/visit.repository";

@Injectable()
export class VisitService {
  constructor(private visitRepository: VisitRepository) {}

  /**
   * create new visit record
   *
   * @param urlId string
   * @param ip ip
   * @returns Promise<Visit>
   */
  async create(urlId: string, ip: string): Promise<Visit> {
    return await this.visitRepository.create(urlId, ip);
  }
}
