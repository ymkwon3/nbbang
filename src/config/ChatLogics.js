export const isFirstMessage = (message, idx, messages) => {
  return (
    idx === 0 || messages[idx - 1].User_userEmail !== message.User_userEmail
  );
};

export const isLoggedUser = (message, loggedUser) => {
  return message.User_userEmail === loggedUser.userEmail;
};
