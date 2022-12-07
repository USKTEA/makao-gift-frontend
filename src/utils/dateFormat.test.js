import dateFormat from './dateFormat';

test('dateFormat', () => {
  const date = '2022-12-05T20:52:16.213867';

  expect(dateFormat(date)).toBe('2022-12-05');
});
