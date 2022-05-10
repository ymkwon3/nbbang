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
