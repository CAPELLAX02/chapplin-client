import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetMe } from '../../hooks/useGetMe';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

const Auth = ({ submitLabel, onSubmit, children, error }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: '100vh',
        maxWidth: 360,
        margin: '0 auto',
        justifyContent: 'center',
      }}
    >
      <TextField
        color="success"
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={!!error}
        helperText={error}
      />
      <TextField
        color="success"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        error={!!error}
        helperText={error}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}
        variant="contained"
        onClick={() => onSubmit({ email, password })}
      >
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
