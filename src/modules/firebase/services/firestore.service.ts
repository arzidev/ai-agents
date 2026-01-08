import { Inject, Injectable } from '@nestjs/common';
import { BusinessRepository } from '../repositories/Business.repository';
import { BUSINESS_REPOSITORY } from '../tokens';

@Injectable()
export class FirestoreService {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly businessRepository: BusinessRepository,
  ) {}

  async getSchedules() {
    return await this.businessRepository.getSchedules();
  }

  async getLocations() {
    return await this.businessRepository.getLocations();
  }

  async getServices() {
    return await this.businessRepository.getServices();
  }
}
