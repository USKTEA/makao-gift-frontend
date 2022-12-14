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

  rest.get(`${baseUrl}/orders/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    orderItem: {
      id: 1,
      name: '초콜릿',
      manufacturer: 'Jocker',
      price: 1000,
      description: 'yammy chocolate',
      imageUrl: '1',
    },
    quantity: 6,
    cost: 6000,
    createdAt: '2022-12-05T20:52:16.213867',
    deliveryInformation: {
      recipient: 'faker',
      address: '서울시 성동구 상원동',
      message: '중꺾맘',
    },
  }))),

  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const { specification } = await req.json();
    const { product, deliveryInformation } = specification;
    const { recipient, address } = deliveryInformation;

    if (!product.id || !recipient || !address) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(
    ctx.json(
      {
        orders: [
          {
            id: 1,
            orderItem: {
              id: 1,
              name: '초콜릿',
              manufacturer: 'Jocker',
              price: 1000,
              description: 'yammy chocolate',
              imageUrl: '1',
            },
            quantity: 6,
            cost: 6000,
            createdAt: '2022-12-05T20:52:16.213867',
            deliveryInformation: {
              recipient: 'faker',
              address: '서울시 성동구 상원동',
              message: '중꺾맘',
            },
          },
        ],
        page: {
          current: 1,
          total: 1,
        },
      },
    ),
  )),

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

    return res(
      ctx.status(400),
      ctx.json({
        message: '아이디 혹은 비밀번호가 맞지 않습니다',
      }),
    );
  }),

  rest.get(`${baseUrl}/members/me`, async (req, res, ctx) => res(
    ctx.json(
      {
        memberName: 'ashal1234',
        name: '김이박최아샬',
        amount: 50_000,
      },
    ),
  )),

  rest.post(`${baseUrl}/members`, async (req, res, ctx) => {
    const { name, memberName, password } = await req.json();

    if (!name || !memberName || !password) {
      return rest(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.get(`${baseUrl}/members`, async (req, res, ctx) => {
    const countOnly = req.url.searchParams.get('countOnly');
    const memberName = req.url.searchParams.get('memberName');

    if (countOnly && memberName === 'alreadyinuse1') {
      return res(ctx.json({
        count: 1,
      }));
    }

    return res(ctx.json({
      count: 0,
    }));
  }),
);

export default server;
