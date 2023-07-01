export const socketNewMessage = (socket, queryClient) => {
  socket.on("newMessage", (data) => {
    const chatId = router.query.chatId;
    const prevData = queryClient.getQueryData(["chat", chatId]);
    if (prevData) {
      //check if the message is already in the cache
      const lastMessage = prevData.messages[prevData.messages.length - 1];
      if (lastMessage?.id !== data.id) {
        queryClient.setQueryData(["chat", chatId], {
          ...prevData,
          messages: [...prevData.messages, data],
        });

        //update last message in chats list
        const prevChats = queryClient.getQueryData(["fetchAllChats"]);
        if (prevChats) {
          const updatedChats = prevChats.map((chat) => {
            if (chat.id === chatId) {
              chat.messages[0] = data;
              return chat;
            }
            return chat;
          });
          queryClient.setQueryData(["fetchAllChats"], updatedChats);
        }
      }
    }
  });
};
