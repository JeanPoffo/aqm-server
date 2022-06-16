const infoMessage = (...messages: String[]): void => {
  messages.forEach((message) => console.log('\x1b[37m%s\x1b[0m', message));
};

const sucessMessage = (...messages: String[]): void => {
  messages.forEach((message) => console.log('\x1b[32m%s\x1b[0m', message));
};

const warningMessage = (...messages: String[]): void => {
  messages.forEach((message) => console.log('\x1b[33m%s\x1b[0m', message));
};

const errorMessage = (...messages: String[]): void => {
  messages.forEach((message) => console.log('\x1b[31m%s\x1b[0m', message));
};

export {
  infoMessage, sucessMessage, warningMessage, errorMessage,
};
