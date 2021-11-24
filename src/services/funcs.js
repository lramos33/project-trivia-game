import md5 from 'crypto-js/md5';

export const addLocalStorage = (name, email) => {
  const user = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };
  const userStr = JSON.stringify(user);
  localStorage.setItem('state', userStr);
};

export const getToken = async () => {
  const token = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => res.json())
    .then((res) => res.token);
  localStorage.setItem('token', token);
};

export const getImage = async (email) => {
  const emailLower = email.toLowerCase().trim();
  const hash = md5(emailLower).toString();
  const image = await fetch(`https://www.gravatar.com/avatar/${hash}`)
    .then((res) => res.url);
  return image;
};

export const getLocalStorageItens = () => {
  const userStr = localStorage.getItem('state');
  const user = JSON.parse(userStr);
  return user;
};
