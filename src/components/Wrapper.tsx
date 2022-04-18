import React from 'react';
import { Box } from '@chakra-ui/react';

interface wrapperProps {
  variant?: 'regular' | 'small';
}

export const Wrapper: React.FC<wrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      w="100%"
      maxW={variant === 'regular' ? '800px' : '400px'}
    >
      {children}
    </Box>
  );
};
