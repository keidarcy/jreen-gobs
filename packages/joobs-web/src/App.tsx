import { useState } from 'react';
import { Container, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import ContentTable from './components/ContentTable';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import { useFetchJobs } from './hooks/useFetchJobs';
import { SupaJob } from './utils/helper';
import useInView from 'react-cool-inview';

export default function App() {
  const [jobs, setJobs] = useState<SupaJob[]>([]);
  const [query, setQuery] = useState<string>('');
  const [paging, setPaging] = useState<number>(0);
  const { error, loading } = useFetchJobs({ jobs, setJobs, paging });
  const color = useColorModeValue('red.500', 'white');

  const { observe } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ observe, unobserve }) => {
      requestIdleCallback(() => {
        unobserve();
        observe();
      });
    },
    onEnter: () => {
      setPaging((prevPaging) => prevPaging + 1);
    },
  });

  return (
    <Stack as="main" align="center" mb={'20'}>
      <Container maxW="1500px" centerContent>
        <NavBar />
        <SearchBar query={query} setQuery={setQuery} />
        <ContentTable
          observe={observe}
          jobs={jobs}
          setJobs={setJobs}
          query={query}
          paging={paging}
        />
        {error && (
          <Text color={color} my={4}>
            Error
          </Text>
        )}
        {loading && (
          <Text color={color} my={4}>
            Loading
          </Text>
        )}
      </Container>
    </Stack>
  );
}
