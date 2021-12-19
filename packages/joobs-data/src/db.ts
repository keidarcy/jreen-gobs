import axios from 'axios';
import { definitions } from './types/supabase';
import { API_URL, SEARCH_TYPES, dbClient, createClient } from './utils';

async function insertMany(page: number, cursor: number): Promise<string> {
  try {
    const insertData: definitions['jobs'][] = [];
    const list = [];
    for (let i = cursor; i < cursor + page; i++) {
      list.push(i);
    }

    for (const i of list) {
      const params = {
        offset: i,
        'low_job_type_ids[]': SEARCH_TYPES,
      };
      const axiosResponse = await axios.get<{ job_offers: definitions['jobs'][] }>(API_URL, {
        params,
      });
      const { job_offers: newJobs } = axiosResponse.data;

      if (!newJobs) throw new Error('fetch new job fails');

      for (const currentJob of newJobs) {
        insertData.push(currentJob);
      }
    }

    if (!insertData.length) throw new Error('no new job');

    const { error: insertError } = await dbClient.from('jobs').insert(insertData);

    if (insertError) throw { insertError };

    const results = insertData.map((j) => j.client_name).join('\n');
    return results;
  } catch (error) {
    console.error('error:', error);
    return 'fail';
  }
}

export default {
  insertMany,
  createClient,
};
