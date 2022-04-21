import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { FieldError, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { NavBar } from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Box>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const { data, error } = await register(values);
            if (error?.graphQLErrors[0].extensions.validationErrors) {
              setErrors(
                toErrorMap(
                  error.graphQLErrors[0].extensions
                    .validationErrors as FieldError[]
                )
              );
            } else if (data?.register.user) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                label="Username"
                placeholder="username"
              />
              <Box mt={8}>
                <InputField
                  name="password"
                  label="Password"
                  placeholder="password"
                  type="password"
                />
              </Box>
              <Button
                mt={8}
                type="submit"
                isLoading={isSubmitting}
                variant="solid"
                colorScheme={'telegram'}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
