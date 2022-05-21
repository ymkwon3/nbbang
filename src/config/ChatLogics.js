// MessageBox 컴포넌트 함수 모음
export const isFirstMessage = (message, idx, messages, loggedUser) => {
  return (
    message.User_userId !== loggedUser.userId &&
    message.User_userEmail !== loggedUser.userEmail &&
    message.User_userName !== loggedUser.userName &&
    (idx === 0 || messages[idx - 1].User_userName !== message.User_userName)
  );
};

export const isLoggedUser = (message, loggedUser) => {
  return (
    message.User_userId === loggedUser.userId &&
    message.User_userEmail === loggedUser.userEmail &&
    message.User_userName === loggedUser.userName
  );
};

export const formatAMPM = (date) => {
  return new Date(date)
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toString();
};

export const isTheSameDate = (message, idx, messages) => {
  return (idx === 0 && message.createdAt) ||
    (message.createdAt &&
      messages[idx - 1].createdAt &&
      messages[idx - 1].createdAt.split(" ")[0] !==
        message.createdAt.split(" ")[0])
    ? new Date(message.createdAt).toLocaleDateString().toString()
    : "";
};

// 채팅방 들어오고 나갈 때 함수들 모음

export const getNewlyAddedUser = (updatedChatroomUserList) => {
  return {
    User_userEmail: updatedChatroomUserList[0].userEmail,
    User_userId: updatedChatroomUserList[0].userId,
    User_userName: updatedChatroomUserList[0].userName,
    userImage: updatedChatroomUserList[0].userImage,
  };
};

export const getNewAwaiterList = (
  updatedChatroomUserList,
  newlyAddedUser,
  status
) => {
  return updatedChatroomUserList[1].filter((awaiter) => {
    return status !== "leave"
      ? awaiter.User_userId !== updatedChatroomUserList[3][0].User_userId
      : awaiter.User_userId !== newlyAddedUser.User_userId &&
          awaiter.User_userId !== updatedChatroomUserList[3][0].User_userId;
  });
};

export const getNewParticipantList = (
  updatedChatroomUserList,
  newlyAddedUser,
  status
) => {
  return updatedChatroomUserList[2].filter((participant) => {
    return status !== "leave"
      ? participant.User_userId !== updatedChatroomUserList[3][0].User_userId
      : participant.User_userId !== newlyAddedUser.User_userId &&
          participant.User_userId !== updatedChatroomUserList[3][0].User_userId;
  });
};

export const getDoesTheSameUserExist = (
  newlyAddedUser,
  newAwaiterList,
  newParticipantList
) => {
  return (
    newAwaiterList.find(
      (awaiter) => awaiter.User_userId === newlyAddedUser.User_userId
    ) ||
    newParticipantList.find(
      (participant) => participant.User_userId === newlyAddedUser.User_userId
    )
  );
};
