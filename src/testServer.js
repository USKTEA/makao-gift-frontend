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

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    name: '초콜릿',
    manufacturer: 'Jocker',
    price: 10000,
    description: 'yammy chocolate',
  }))),

  rest.get(`${baseUrl}/products/2`, async (req, res, ctx) => res(ctx.json({
    id: 2,
    name: '사탕',
    manufacturer: 'Jocker',
    price: 20000,
    description: 'yammy candy',
  }))),
);

export default server;
