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
import { PAGE_SIZE } from '../../constants/page-size';
import { useCountMessages } from '../../hooks/useCountMessages';
import InfiniteScroll from 'react-infinite-scroller';

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage('');
      scrollToBottom();
    }
  }, [location.pathname, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage('');
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({ variables: { skip: messages?.messages.length } })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message) => (
                <Grid
                  container
                  alignItems="center"
                  marginBottom="1rem"
                  key={message._id}
                >
                  <Grid item xs={2} lg={1}>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Avatar src="" sx={{ width: 52, height: 52 }} />
                      {/* Replace the imageUrl source as below after configuring AWS connections, configurations and permissions. */}
                      {/* <Avatar src={message.user.imageUrl} sx={{ width: 52, height: 52 }} /> */}
                      <Typography variant="caption">
                        {message.user.username}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper
                        sx={{
                          width: 'fit-content',
                          maxWidth: '80%',
                          wordWrap: 'break-word',
                          wordBreak: 'break-all',
                        }}
                      >
                        <Typography sx={{ padding: '0.9rem' }}>
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{ marginLeft: '0.25rem' }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString()} -{' '}
                        {new Date(message.createdAt).toLocaleDateString()}{' '}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
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
          sx={{ ml: 1, flex: 1, width: '100%' }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          multiline={true} // Allow multiline input
          maxRows={4} // Set maximum rows to prevent excessive growth
          onKeyDown={async (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              await handleCreateMessage();
              event.preventDefault(); // Prevent default Enter behavior
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: '10px' }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
