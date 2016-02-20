import rugRide from './rug_ride';

window.onload = () => {
  let width = window.innerWidth, height = window.innerHeight;

  setTimeout(() => {
    rugRide({
      domContainer: '#game-container',
      width, height,
    });
  }, 1000
  );
};
