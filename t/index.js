process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');

const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwTXpNeFptWXdNMkk0TkRFeE1HWmhaamd4Wmpjd01TSXNJbVZ0WVdsc0lqb2lkR1Z6ZERGQVoyMWhhV3d1WTI5dElpd2lhV0YwSWpveE5qZ3hNRGN5TVRFemZRLmd2RXNkX2ZUWmNlWHJMck91MzZ4amNucG4tWngtWjNKa0wtVktlWGxlSVUifQ==';

const doRequest = async () => {
  const { data } = await axios.post(
    `https://ticketing.dev/api/tickets`,
    { title: 'ticket', price: 5 },
    {
      headers: { cookie },
    }
  );
  console.log(data);

  await axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    { title: 'ticket', price: 10 },
    {
      headers: { cookie },
    }
  );

  axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    { title: 'ticket', price: 15 },
    {
      headers: { cookie },
    }
  );

  console.log('Request complete');
};

(async () => {
  for (let i = 0; i < 200; i++) {
    doRequest();
  }
})();