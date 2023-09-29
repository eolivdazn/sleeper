describe('Health', () => {
  let jwt = '';
  const createReservation = {
    startDate: '12/12/12',
    endDate: '12/12/12',
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
    // email: `sleeprexercise@gmail.com`,
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
    console.log('response', response.headers.get('set-cookie'));
    jwt = response.headers.get('set-cookie').split('=')[1];
    console.log('jwt', jwt);
  });
  test('create reservation..', async () => {
    const newReservation = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json,',
          Authentication: jwt,
        },
        body: JSON.stringify(createReservation),
      },
    );
    expect(newReservation.status).toBe(201);
  });
});
