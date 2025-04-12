import {QdrantClient} from '@qdrant/js-client-rest';
import dotenv from 'dotenv';

dotenv.config();

export const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_HOST,
  apiKey: process.env.QDRANT_API_KEY
});