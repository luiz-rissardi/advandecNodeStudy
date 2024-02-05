import autocannon from 'autocannon';

async function runAutocannon() {
  const result = await autocannon({
    url: 'http://localhost:4000/image?image=https://banner2.cleanpng.com/20180325/avw/kisspng-mbt-70-main-battle-tank-t-80-military-tanks-5ab7aaa9ad3e05.7725387315219862177096.jpg&background=https://wallpapers.com/images/hd/battlefield-background-x6shaan524hr7ev7.jpg',
    connections: 200,
    duration: 30,
  });

  console.log(result);
}

runAutocannon();