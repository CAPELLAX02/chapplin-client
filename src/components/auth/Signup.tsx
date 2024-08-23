import { Link } from 'react-router-dom';
import { Link as MUILink } from '@mui/material';
import Auth from './Auth';
import { useCreateUser } from '../../hooks/useCreateUser';
import { useState } from 'react';

const Signup = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState('');

  return (
    <Auth
      submitLabel="Sign Up"
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
        } catch (err: any) {
          console.log(err);
          throw err;
        }
      }}
    >
      <Link to={'/login'} style={{ alignSelf: 'center' }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
