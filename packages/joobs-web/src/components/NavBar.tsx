import { Heading, Flex, useColorModeValue } from '@chakra-ui/react';

import DarkModeSwitch from './DarkModeSwitch';

const NavBar = () => {
  const color = useColorModeValue('teal.500', 'teal.100');
  return (
    <Flex mt={'2'} mb={'6'} direction="row" w="full" pt={4} justifyContent={'space-between'}>
      <Heading color={color} as="h1" size="xl" fontWeight="bold">
        Easy, job search!
      </Heading>
      <DarkModeSwitch />
    </Flex>
  );
};

export default NavBar;
