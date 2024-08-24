import AddCircle from '@mui/icons-material/AddCircle';
import { AppBar, IconButton, Toolbar } from '@mui/material';

interface ChatListHeaderProps {
  handleAddChat: () => void;
}

const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton onClick={handleAddChat} size="large" edge="start">
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
