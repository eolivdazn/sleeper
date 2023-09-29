describe('Health', () => {
  test.skip('reservations should be healthy', async () => {
    const result = await fetch('http://reservations:3000/');
    console.log(result);
    expect(result.ok).toBeTruthy();
  });
});
