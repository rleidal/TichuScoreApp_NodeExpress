// Type definitions for socket.io 1.2.0
// Project: http://socket.io/
// Definitions by: PROGRE <https://github.com/progre/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path='../node/node.d.ts' />

declare var io : {
    connect(url?: string): SocketIO.ClientSocket;
}
declare module SocketIO {
    interface ClientSocket {
        on(event: string, callback: (data: any) => void);
        emit(event: string, ...args: any[]);
    }
}
