describe('Health', () => {
  let jwt = '';
  const createReservation = {
    startDate: '2012-12-:00:00.000Z',
    endDate: '2012-12-12T00:00:00.000Z',
    placeId: 'Montreux',
    charge: {
      amount: 401,
      card: {
        cvc: '423',
        exp_month: 12,
        exp_year: 2034,
        number: '4242424242424242',
      },
    },
  };
  const randomNumber = Math.floor(Math.random() * 555555555);
  const user = {
    email: `sleeprexercise+${randomNumber}@gmail.com`,
    password: 'strongPassword123!@#!',
  };

  beforeAll(async () => {
    const newUser = await fetch('http://auth:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    expect(newUser.status).toBe(201);
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    jwt = response.headers.get('set-cookie').split('=')[1].split(';')[0];
  });
  test('create reservation..', async () => {
    const newReservation = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authentication: jwt,
        },
        body: JSON.stringify(createReservation),
      },
    );
    expect(newReservation.status).toBe(201);
  });
});
