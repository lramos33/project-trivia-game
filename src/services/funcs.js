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

export const setToken = async () => {
  const token = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => res.json())
    .then((res) => res.token);
  localStorage.setItem('token', token);
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const getImage = async (email) => {
  const emailLower = email.toLowerCase().trim();
  const hash = md5(emailLower).toString();
  const image = await fetch(`https://www.gravatar.com/avatar/${hash}`)
    .then((res) => res.url);
  return image;
}

export const getLocalStorageItens = () => {
  const userStr = localStorage.getItem('state');
  const user = JSON.parse(userStr);
  return user;
};

export const getQuestionAndAnswers = async () => {
  const amount = 5;
  const token = getToken();
  const data = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`)
    .then((response) => response.json());
  return data;
};

export const shuffleArray = (array) => array.sort(() => '0.5' - Math.random());

export const secondShuffleArray = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}