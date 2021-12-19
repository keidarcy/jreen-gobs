import { definitions } from '@joobs/joobs-data/src/types/supabase';

export const handleName = (name: string | undefined) => {
  if (!name) return '';
  const result = name.replace(/[\u682A|\u5F0F|\u4F1A|\u793E]/g, '*');
  return result;
};

export const handleDescription = (description: string | undefined) => {
  let result = description;
  if (!result) return result;
  if (result.length > 30) {
    result = result.replace(/\u0047\u0072\u0065\u0065\u006E/g, '*').slice(0, 30) + '...';
  }
  result = handleName(result);
  return result;
};

export const handleDate = (date: string | undefined) => {
  if (!date) return 'invalid date';
  let result = new Date(date);
  if (Number.isNaN(result)) return 'invalid date';
  const year = result.getFullYear();
  const month = result.getMonth() + 1;
  const day = result.getDate();

  return `${year}-${month}-${day}`;
};

export const SelectColumns = [
  'id',
  'client_name',
  'job_offer_title',
  'job_offer_salary_range',
  'job_offer_area',
  'job_offer_skill_name',
  'created_at',
] as const;

export type SelectColumnsType = typeof SelectColumns[number];

export type SupaJob = Pick<definitions['jobs'], SelectColumnsType>;

export const sortFieldDirectionsInitValue = {
  id: false,
  client_name: false,
  job_offer_title: false,
  job_offer_salary_range: false,
  job_offer_area: false,
  job_offer_skill_name: false,
  created_at: false,
};

export const getSearchedRows = <T>(rows: T[], query: string): T[] => {
  if (!query) return rows;
  return rows.filter((row: any) => {
    return Object.values(row).some((s) => ('' + s).toLowerCase().includes(query));
  });
};

export const SHOW_NUMBER = 20;
