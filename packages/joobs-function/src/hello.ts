import { Handler } from '@netlify/functions';

export const getResponse = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};

const handler: Handler = async (event, context) => {
  return getResponse();
};

export { handler };
