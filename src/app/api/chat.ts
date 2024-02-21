// import { IncomingMessage } from "http";
// import { Server } from "socket.io";

// import { NextApiRequest, NextApiResponse } from 'next';

// export default function SocketHandler(req: any, res: any) {
// 	if (res.socket.server.io) {
// 		console.log("Socket is already running");
// 	} else {
// 		console.log("Socket is initializing");
// 		const io = new Server(res.socket.server);
// 		res.socket.server.io = io;
// 	}
// 	res.end();
// }
