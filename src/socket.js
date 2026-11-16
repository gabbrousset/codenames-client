import { io } from 'socket.io-client';

// One connection per tab, same origin as the page; in dev, Vite proxies
// /socket.io to the server.
const socket = io();

export default socket;
