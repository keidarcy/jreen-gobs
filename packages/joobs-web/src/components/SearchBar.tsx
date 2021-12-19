import React from 'react';
import { Input, Flex, Button } from '@chakra-ui/react';

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <Flex justifyContent={'space-around'} width={'full'}>
        <Input placeholder="Filter me" value={query} onChange={handleChange} mr={'5'} />
        <Button size={'md'} color={'teal.400'}>
          Search
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
