import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, Box } from '@chakra-ui/react';
import {
  handleDate,
  handleDescription,
  handleName,
  SupaJob,
  SelectColumnsType,
  sortFieldDirectionsInitValue,
  getSearchedRows,
  SHOW_NUMBER,
} from '../utils/helper';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

type HeaderValueMapping = {
  key: SelectColumnsType;
  title: string;
  value: (job: SupaJob) => string;
};

const headerValueMapping: HeaderValueMapping[] = [
  {
    key: 'client_name',
    title: 'company name',
    value: (job: SupaJob) => handleName(job?.client_name),
  },
  {
    key: 'job_offer_title',
    title: 'job title',
    value: (job: SupaJob) => handleDescription(job?.job_offer_title) ?? '',
  },
  {
    key: 'job_offer_salary_range',
    title: 'salary range',
    value: (job: SupaJob) => job?.job_offer_salary_range ?? '',
  },
  {
    key: 'job_offer_area',
    title: 'location',
    value: (job: SupaJob) => job?.job_offer_area ?? '',
  },
  {
    key: 'job_offer_skill_name',
    title: 'main skill',
    value: (job: SupaJob) => job?.job_offer_skill_name ?? '',
  },
  {
    key: 'created_at',
    title: 'created at',
    value: (job: SupaJob) => handleDate(job?.created_at),
  },
];

interface ContentTableProps {
  jobs: SupaJob[];
  setJobs: React.Dispatch<React.SetStateAction<SupaJob[]>>;
  query: string;
  observe: (element?: HTMLElement | null | undefined) => void;
  paging: number;
}

const ContentTable: React.FC<ContentTableProps> = ({ jobs, query, setJobs, observe, paging }) => {
  const [sortFieldDirections, setSortFieldDirections] = useState<
    typeof sortFieldDirectionsInitValue
  >(sortFieldDirectionsInitValue);

  const onSort = (field: SelectColumnsType) => {
    const direction = sortFieldDirections[field] === true;
    const sortedJobs = jobs.sort((a, b) => {
      const relativeA = a[field] ?? '';
      const relativeB = b[field] ?? '';
      if (relativeA < relativeB) return direction ? -1 : 1;
      if (relativeA > relativeB) return direction ? 1 : -1;
      return 0;
    });
    const newSortFieldDirections: typeof sortFieldDirectionsInitValue = {
      ...sortFieldDirections,
    };

    for (const currentField in sortFieldDirections) {
      newSortFieldDirections[currentField as SelectColumnsType] =
        currentField === field ? !sortFieldDirections[field] : sortFieldDirections[field];
    }
    setSortFieldDirections(newSortFieldDirections);
    setJobs([...sortedJobs]);
  };

  return (
    <Table variant="striped" width={'fit-content'} overflow={'auto'}>
      <TableCaption>A site to search IT jobs easily!</TableCaption>
      <Thead>
        <Tr>
          {headerValueMapping.map((header) => (
            <Th onClick={() => onSort(header.key)} key={header.title}>
              <Button
                leftIcon={sortFieldDirections[header.key] ? <ChevronDownIcon /> : <ChevronUpIcon />}
                colorScheme="teal"
                variant="ghost"
                size="sm"
              >
                {header.title}
              </Button>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {getSearchedRows(jobs, query).map((job, jobIndex) => {
          return (paging + 1) * SHOW_NUMBER - 2 === jobIndex ? (
            <Tr ref={observe} key={job?.id}>
              {headerValueMapping.map((headerValue) => (
                <Td key={headerValue.title}>{headerValue.value(job)}</Td>
              ))}
            </Tr>
          ) : (
            <Tr key={job?.id}>
              {headerValueMapping.map((headerValue) => (
                <Td key={headerValue.title}>{headerValue.value(job)}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default ContentTable;
