/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1,
        name: '초콜릿',
        manufacturer: 'Jocker',
        price: 10000,
        description: 'yammy chocolate',
      },
    ],
  }))),
);

export default server;
