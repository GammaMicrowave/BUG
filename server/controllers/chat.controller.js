import {
  response_200,
  response_500,
  response_400,
} from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";

import { io } from "../config/socket.config.js";

export async function getAllUsers(req, res) {
  const q = req.query.q;
  const user = req.user;
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: user.id,
            },
          },
          {
            OR: [
              {
                name: {
                  contains: q,
                },
              },
              {
                email: {
                  contains: q,
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    return response_200(res, "Users fetched successfully", users);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function fetchAllChats(req, res) {
  const user = req.user;
  const q = req.query.q;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
        OR: [
          {
            chatName: {
              contains: q,
            },
          },
          {
            users: {
              some: {
                AND: [
                  {
                    name: {
                      contains: q,
                    },
                  },
                  {
                    NOT: {
                      id: user.id,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      select: {
        id: true,
        chatName: true,
        isGroupChat: true,
        users: {
          where: {
            id: {
              not: user.id,
            },
          },
          select: {
            id: true,
            name: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: 1,
        },
      },

      orderBy: {
        updatedAt: "asc",
      },
    });
    return response_200(res, "Chats fetched successfully", chats);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getChat(req, res) {
  const user = req.user;
  const chatId = req.params.chatId;
  if (!chatId) {
    return response_400(res, "Please provide a valid chat id");
  }
  try {
    let chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        users: {
          some: {
            id: user.id,
          },
        },
      },
      select: {
        id: true,
        chatName: true,
        isGroupChat: true,
        users: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        groupAdmins: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    if (!chat) {
      return response_400(res, "No chat found");
    }
    chat.isAdmin = chat.groupAdmins.includes(user.id);

    chat.messages = chat.messages.map((message) => {
      return {
        ...message,
        isMine: message.author.id === user.id,
      };
    });

    io.to(user.id).socketsJoin(chatId);

    return response_200(res, "Chat fetched successfully", chat);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getPrivateChat(req, res) {
  const user = req.user;
  const otherUserId = req.params.otherUserId;
  if (!otherUserId) {
    return response_400(res, "Please provide a valid user id");
  }
  try {
    let chat = await prisma.chat.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: user.id,
              },
            },
          },
          {
            users: {
              some: {
                id: otherUserId,
              },
            },
          },
          {
            isGroupChat: false,
          },
        ],
      },
      select: {
        id: true,
        users: {
          where: {
            id: {
              not: user.id,
            },
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!chat) {
      const newChat = await prisma.chat.create({
        data: {
          users: {
            connect: [
              {
                id: user.id,
              },
              {
                id: otherUserId,
              },
            ],
          },
        },
        select: {
          id: true,
          users: {
            where: {
              id: {
                not: user.id,
              },
            },
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          messages: {
            select: {
              id: true,
              content: true,
              createdAt: true,
            },
          },
        },
      });

      chat = newChat;
    }

    return response_200(res, "Chat fetched successfully", chat);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function createGroupChat(req, res) {
  const user = req.user;
  const { chatName, users } = req.body;

  if (users.length < 2) {
    return response_400(res, "Please select atleast 2 users");
  }
  try {
    const newGroupChat = await prisma.chat.create({
      data: {
        chatName: chatName,
        isGroupChat: true,
        users: {
          connect: [
            {
              id: user.id,
            },
            ...users.map((user) => {
              return {
                id: user,
              };
            }),
          ],
        },
      },
      select: {
        id: true,
        chatName: true,
        isGroupChat: true,
        users: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });
    return response_200(res, "Chat created successfully", newGroupChat);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function renameGroupChat(req, res) {
  const user = req.user;
  const chatId = req.params.chatId;
  const { chatName } = req.body;

  try {
    const { count } = await prisma.chat.updateMany({
      where: {
        AND: [
          {
            id: chatId,
          },
          {
            groupAdmins: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },
      data: {
        chatName: chatName,
      },
    });
    if (count == 1) {
      return response_200(res, "Chat renamed successfully", {
        chatName: chatName,
      });
    }
    return response_400(
      res,
      "You are not admin of this group or chat not found"
    );
  } catch (err) {
    return response_500(res, err);
  }
}

export async function addUserToGroupChat(req, res) {
  const user = req.user;
  const chatId = req.params.chatId;
  const { userId } = req.body;

  try {
    const { count } = await prisma.chat.updateMany({
      where: {
        AND: [
          {
            id: chatId,
          },
          {
            groupAdmins: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (count == 1) {
      return response_200(res, "User added successfully");
    }
    return response_400(
      res,
      "You are not admin of this group or chat not found"
    );
  } catch (err) {
    return response_500(res, err);
  }
}

export async function removeUserFromGroupChat(req, res) {
  const user = req.user;
  const chatId = req.params.chatId;
  const { userId } = req.body;
  try {
    const { count } = await prisma.chat.updateMany({
      where: {
        AND: [
          {
            id: chatId,
          },
          {
            groupAdmins: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
    if (count == 1) {
      return response_200(res, "User removed successfully");
    }
    return response_400(
      res,
      "You are not admin of this group or chat not found"
    );
  } catch (err) {
    console.log(err);
    return response_500(res, err);
  }
}

export async function makeUserAdminOfGroupChat(req, res) {
  const user = req.user;
  const chatId = req.params.chatId;
  const { userId } = req.body;
  try {
    const { count } = await prisma.chat.updateMany({
      where: {
        AND: [
          {
            id: chatId,
          },
          {
            groupAdmins: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },
      data: {
        groupAdmins: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (count == 1) {
      return response_200(res, "User made admin successfully");
    }
    return response_400(
      res,
      "You are not admin of this group or chat not found"
    );
  } catch (err) {
    return response_500(res, err);
  }
}

export async function addMessage(req, res) {
  const user = req.user;
  const chatId = req.params.chatId;
  const { message } = req.body;
  try {
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        author: {
          connect: {
            id: user.id,
          },
        },
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        chatId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    newMessage.isMine = true;
    io.to(user.id).emit("newMessage", newMessage);

    // console.log(Object.keys(io.sockets.sockets));

    io.in(chatId).emit("newMessage", { ...newMessage, isMine: false });

    return response_200(res, "Message sent successfully", newMessage);
  } catch (err) {
    return response_500(res, err);
  }
}
