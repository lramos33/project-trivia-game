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
  return token;
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
};

export const getLocalStorageItens = () => {
  const userStr = localStorage.getItem('state');
  const user = JSON.parse(userStr);
  return user;
};

export const addPoints = (points) => {
  const { player } = getLocalStorageItens();
  const { score, assertions } = player;
  const sum = Number(score) + Number(points);
  console.log(sum, points);
  const newObj = {
    player: {
      ...player,
      assertions: Number(assertions) + 1,
      score: sum,
    },
  };
  const objStr = JSON.stringify(newObj);
  localStorage.setItem('state', objStr);
};

export const getQuestionAndAnswers = async () => {
  const amount = 5;
  const token = getToken();
  const data = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`)
    .then((response) => response.json());
  return data;
};

export const shuffleArray = (array) => array.sort(() => '0.5' - Math.random());
