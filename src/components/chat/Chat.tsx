import { useParams } from 'react-router-dom';
import { useGetChat } from '../../hooks/useGetChat';
import { Divider, IconButton, InputBase, Paper, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from '../../hooks/useCreateMessage';
import { useState } from 'react';

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const chatId = params._id || '';
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();

  const handleSendMessage = () => {
    createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
  };

  return (
    <Stack
      sx={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          justifySelf: 'flex-end',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <InputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ ml: 1, flex: 1, width: '100%' }}
          placeholder="Your message"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleSendMessage}
          color="success"
          sx={{
            p: '10px',
          }}
        >
          <SendIcon color="success" />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
