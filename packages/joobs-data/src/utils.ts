import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const DB_URL = process.env.DB_URL as string;
const DB_KEY = process.env.DB_KEY as string;
const API_URL = process.env.API_URL as string;
const SEARCH_TYPES = process.env.SEARCH_TYPES as string;

const dbClient = createClient(DB_URL, DB_KEY);

export { API_URL, SEARCH_TYPES, dbClient, createClient };
