describe('Health', () => {
  test('reservations should be healthy', async () => {
    const result = await fetch('http://reservations:3000/');
    expect(result.ok).toBeTruthy();
  });
});
