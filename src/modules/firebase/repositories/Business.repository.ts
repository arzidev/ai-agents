import { Inject } from '@nestjs/common';
import { FIRESTORE_COLLECTIONS } from '../tokens';
import { CollectionReference } from 'firebase-admin/firestore';
import { Business } from '../models/business.model';

export class BusinessRepository {
  constructor(
    @Inject(FIRESTORE_COLLECTIONS.BUSINESS_COLLECTION)
    private readonly businessCollection: CollectionReference<Business>,
  ) {}

  async getSchedules() {
    const doc = await this.businessCollection.doc('Sw9texhwoDREkSLMJ8lj').get();
    return doc.data()?.schedules;
  }
  async getLocations() {
    const docs = await this.businessCollection
      .doc('Sw9texhwoDREkSLMJ8lj')
      .get();
    return docs.data()?.locations;
  }
  async getServices() {
    const doc = await this.businessCollection.doc('Sw9texhwoDREkSLMJ8lj').get();
    return doc.data()?.services;
  }
}
