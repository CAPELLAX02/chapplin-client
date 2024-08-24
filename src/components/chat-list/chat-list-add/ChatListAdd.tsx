import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useCreateChat } from '../../../hooks/useCreateChat';
import { UNKNOWN_ERROR_MESSAGE } from '../../../constants/errors';

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [createChat] = useCreateChat();

  const handleClick = async () => {
    if (!name.length) {
      setError('Chat name is required.');
      return;
    }
    try {
      await createChat({
        variables: {
          createChatInput: {
            isPrivate,
            name: name || undefined,
          },
        },
      });
    } catch (err) {
      setError(UNKNOWN_ERROR_MESSAGE);
    }
    onClose();
  };

  const onClose = () => {
    setError('');
    setName('');
    setIsPrivate(false);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>
          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked={isPrivate}
                  value={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
              <IconButton sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText={error}
            />
          )}
          <Button
            variant="contained"
            style={{
              backgroundColor: 'green',
              color: 'white',
              fontWeight: 'bold',
            }}
            onClick={handleClick}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
