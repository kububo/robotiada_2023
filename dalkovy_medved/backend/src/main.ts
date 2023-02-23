import { WebSocketServer } from 'ws';
import dgram from 'node:dgram';

import { getSpeeds } from './process';
import type { Values } from './types';

const socket = dgram.createSocket('udp4');

const wss = new WebSocketServer({
  port: 5069,
});

wss.on('connection', (ws) => {
  ws.on('message', (payload: Buffer) => {
    const stringified = payload.toString();
    const values: Values = JSON.parse(stringified);

    const speeds = getSpeeds(values);

    // Data for robot
    const { toggleArms, autoHome } = values;
    const dataForRobot = JSON.stringify({
      toggleArms,
      autoHome,
      speeds,
    });

    socket.send(dataForRobot, 5069, '192.168.0.156');
  });
});

console.log('👂 Listening on "ws://localhost:5069" 👂');
