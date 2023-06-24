import {
  response_200,
  response_500,
  response_400,
} from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";

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
  try {
    const chats = await prisma.chat.findMany({
      where: {
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
    });
    return response_200(res, "Chats fetched successfully", chats);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getChat(req, res) {
  const user = req.user;
  const otherUserId = req.body.id;
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
  //users only have id
  //eg : users = ['abcd-egh', 'abcd-egh']
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
  const { chatId, chatName } = req.body;

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
  const { chatId, userId } = req.body;

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
    console.log(err);
    return response_500(res, err);
  }
}

export async function removeUserFromGroupChat(req, res) {
  const user = req.user;
  const { chatId, userId } = req.body;
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
  const { chatId, userId } = req.body;
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
    console.log(err);
    return response_500(res, err);
  }
}

//For Testing purposes

// setTimeout(async () => {
//   await fetchAllChats(
//     {
//       user: {
//         id: "fb4d4e2b-850b-4702-aef8-1c126f12f654",
//       },
//       //   body: {
//       //     id: "a1840f31-a920-4e09-852a-91a149c839a8",
//       //   },
//     },
//     {
//       send: console.log,
//     }
//   );
//   await createGroupChat(
//     {
//       user: {
//         id: "fb4d4e2b-850b-4702-aef8-1c126f12f654",
//       },
//       body: {
//         chatName: "Group Chat2",
//         users: [
//           "3fa2ef5e-97f5-4344-8283-07252c91d8fd",
//           "83bdd87a-d5c6-4ecf-b378-33535ea92eb4",
//           "a1840f31-a920-4e09-852a-91a149c839a8",
//         ],
//       },
//     },
//     {
//       send: console.log,
//     }
//   );
//   await renameGroupChat({
//     user: {
//       id: "fb4d4e2b-850b-4702-aef8-1c126f12f654",
//     },
//     body: {
//       chatId: "4f9dde7c-1788-4d57-9148-c44bb27b91b6",
//       chatName: "Renamed Group Chat",
//     },
//   });
// }, 1000);
