import { useLocation, useParams } from 'react-router-dom';
import { useGetChat } from '../../hooks/useGetChat';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from '../../hooks/useCreateMessage';
import { useEffect, useRef, useState } from 'react';
import { useGetMessages } from '../../hooks/useGetMessages';
import { useMessageCreated } from '../../hooks/useMessageCreated';

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const chatId = params._id || '';
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { data: latestMessage } = useMessageCreated({ chatId });

  console.log(latestMessage);

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView();
  };

  useEffect(() => {
    setMessage('');
    scrollToBottom();
  }, [location, messages]);

  const handleSendMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage('');
    scrollToBottom();
  };

  return (
    <Stack
      sx={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: '70vh', minHeight: '70vh', overflow: 'auto' }}>
        {messages?.messages.map((message) => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid item xs={2} md={1}>
              <Avatar src="" sx={{ width: 50, height: 50 }} />
            </Grid>
            <Grid item xs={10} md={11}>
              <Stack>
                <Paper sx={{ width: 'fit-content' }}>
                  <Typography sx={{ padding: '0.9rem' }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ marginLeft: '0.25rem' }}>
                  {/* {new Date(message.createdAt).toLocaleTimeString()} */}
                  {new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          justifySelf: 'flex-end',
          alignItems: 'center',
          width: '100%',
          margin: '1rem 0',
        }}
      >
        <InputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ ml: 1, flex: 1, width: '100%' }}
          placeholder="Your message"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage();
            }
          }}
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
