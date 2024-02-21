import { rest } from 'msw';

export const handlers = [
    rest.get('/api/endpoint', (req, res, ctx) => {
        return res(ctx.json({ message: 'Mocked response' }));
    }),
];