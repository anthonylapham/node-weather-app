console.log('Starting App');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('Nearing the end of callback');
}, 0000);

console.log('Finishing App');
