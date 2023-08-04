const DEFAULT_VOLUME = 100;
const VOLUME = 'volume';
let currentVolume = DEFAULT_VOLUME;
let gainNode = null;

intializeRequestListener();
initialiseCurrentVolume();

console.log("current volume: " + currentVolume);

