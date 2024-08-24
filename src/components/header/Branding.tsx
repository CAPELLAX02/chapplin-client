import { Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

const Branding = () => {
  return (
    <>
      <ForumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          cursor: 'default',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        CHAPPLIN
      </Typography>
    </>
  );
};

export default Branding;
