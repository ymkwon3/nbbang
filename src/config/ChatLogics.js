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
  return new Date(date).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const isTheSameDate = (message, idx, messages) => {
  return idx === 0 ||
    (message.createdAt &&
      messages[idx - 1].createdAt &&
      messages[idx - 1].createdAt.split(" ")[0] !==
        message.createdAt.split(" ")[0])
    ? new Date(message.createdAt).toLocaleDateString()
    : "";
};
