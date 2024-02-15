import autocannon from 'autocannon';

async function runAutocannon() {
  const result = await autocannon({
    url: 'http://localhost:4000/users',
    connections: 200,
    duration: 30,
  });

  console.log(result);
}

runAutocannon();