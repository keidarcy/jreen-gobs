import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { SelectColumns, SHOW_NUMBER, SupaJob } from '../utils/helper';

type FetchedJobsType = {
  jobs: SupaJob[];
  setJobs: React.Dispatch<React.SetStateAction<SupaJob[]>>;
  paging: number;
};

export const useFetchJobs = ({ jobs, setJobs, paging }: FetchedJobsType) => {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const selectColumns = SelectColumns.join(',');
    const fn = async () => {
      setLoading(true);
      let { data: newJobs, error } = await supabase
        .from('jobs')
        .select(selectColumns)
        .not('job_offer_skill_name', 'eq', '')
        .order('id', { ascending: true })
        .range(paging * SHOW_NUMBER + 1, (paging + 1) * SHOW_NUMBER);

      const currentJobs = jobs.concat(newJobs as SupaJob[]);
      setJobs(currentJobs as SupaJob[]);
      setError(error);
      setLoading(false);
    };
    fn();
  }, [paging]);
  return { jobs, error, loading, setJobs };
};
