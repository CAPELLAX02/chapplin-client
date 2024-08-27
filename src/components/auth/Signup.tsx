import { Link } from 'react-router-dom';
import { Link as MUILink, TextField } from '@mui/material';
import Auth from './Auth';
import { useCreateUser } from '../../hooks/useCreateUser';
import React, { useState } from 'react';
import { extractErrorMessage } from '../../utils/errors';
import { useLogin } from '../../hooks/useLogin';
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/errors';

const Signup = () => {
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useLogin();

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const userNameField = () => {
    return (
      <TextField
        color="success"
        type="text"
        label="Username"
        variant="outlined"
        value={username}
        onChange={onUsernameChange}
        error={!!error}
        helperText={error}
      />
    );
  };

  return (
    <Auth
      title="Join Us!"
      submitLabel="Sign up"
      error={error}
      extraFields={[userNameField()]}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });
          await login({ email, password });
          setError('');
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to={'/login'} style={{ alignSelf: 'center' }}>
        <MUILink
          style={{ color: 'lightgreen', textDecorationColor: 'lightgreen' }}
        >
          Login
        </MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
