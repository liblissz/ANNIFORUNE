import { io } from 'socket.io-client';

// Replace with the actual URL of your backend
// If your backend is running on localhost:4000:
const socket = io('http://localhost:4000'); 

export default socket;
