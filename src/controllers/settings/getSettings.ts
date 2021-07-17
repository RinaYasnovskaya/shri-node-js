import axios from 'axios';
import process from 'process';
import { RequestExp, ResponseExp } from '../Types';

export const getSettings = async (request: RequestExp, response: ResponseExp) => {
  const TOKEN = process.env.AUTH_TOKEN;

  try {
    const res = await axios.get('https://shri.yandex/hw/api/conf', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    response.json(res.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.json(error.message);
    }
  }
};
