export const isFirstMessage = (message, idx, messages) => {
  return (
    idx === 0 || messages[idx - 1].sender.userEmail !== message.sender.userEmail
  );
};

export const isLoggedUser = (message, loggedUser) => {
  return message.sender.userEmail === loggedUser.userEmail;
};
