/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

// TODO 이미지 소스 추가하고 저장해야해 메타데이터만 저장하고 불러오자
const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1,
        name: '초콜릿',
        manufacturer: 'Jocker',
        price: 10000,
        description: 'yammy chocolate',
        imageUrl: 1,
      },
    ],
  }))),

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    name: '초콜릿',
    manufacturer: 'Jocker',
    price: 10000,
    description: 'yammy chocolate',
    imageUrl: 1,
  }))),

  rest.get(`${baseUrl}/products/2`, async (req, res, ctx) => res(ctx.json({
    id: 2,
    name: '사탕',
    manufacturer: 'Jocker',
    price: 20000,
    description: 'yammy candy',
    imageUrl: 2,
  }))),

  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { memberName, password } = await req.json();

    if (memberName === 'ashal1234' && password === 'Password1234!') {
      return res(
        ctx.json({
          name: '김이박최아샬',
          amount: 50_000,
          accessToken: 'ACCESSTOKEN',
        }),
      );
    }

    return rest(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/members/me`, async (req, res, ctx) => res(
    ctx.json(
      {
        name: '김이박최아샬',
        amount: 50_000,
      },
    ),
  )),
);

export default server;
