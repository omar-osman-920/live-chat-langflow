export type ChatMessageType = {
    message: string;
    isSend: boolean;
    error?: boolean;
    bot_message_style?: React.CSSProperties;
    user_message_style?: React.CSSProperties;
    error_message_style?: React.CSSProperties;
    id?: string; // Add ID for tracking streaming updates
    isStreaming?: boolean; // Flag to indicate streaming status
  };


  export type ChatMessagePlaceholderType = {
    bot_message_style?: React.CSSProperties;
  };