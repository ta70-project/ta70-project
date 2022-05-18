import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { ToastMessageService } from './toast-message.service';
import {
  apiGateways,
  BaseWebsocketEvent,
  SendMessageWebsocketEvent,
  TestWebsocketEvent,
  WebsocketEventType,
} from '@libraries/lib-common';
import { ApiError } from '@libraries/lib-nestjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _socket: Socket;

  constructor(private readonly _toastMessageService: ToastMessageService) {}

  async connect(): Promise<void> {
    if (this._socket) {
      return;
    }

    this._socket = io(environment.webserviceOrigin);

    this._socket.on(apiGateways.exception, (error: ApiError) => {
      this._toastMessageService.showError(error.message);
    });

    this._socket.on(apiGateways.disconnect, () => {
      this._toastMessageService.showError('Disconnected from the server');
    });

    this._socket.on(apiGateways.events, (event: BaseWebsocketEvent) => {
      this.handleEvent(event);
    });

    await new Promise<void>((resolve) => {
      this._socket.on(apiGateways.connect, () => {
        this._toastMessageService.showSuccess('Connected to the server');
        resolve;
      });
    });
  }

  async handleEvent(event: BaseWebsocketEvent) {
    switch (event.type) {
      case WebsocketEventType.Test:
        this._toastMessageService.showSuccess((event as TestWebsocketEvent).message);
        break;
      case WebsocketEventType.SendMessage:
        this._toastMessageService.showInfo((event as SendMessageWebsocketEvent).message);
    }
  }

  async test() {
    this._socket.emit(apiGateways.events, {
      type: WebsocketEventType.Test,
      message: 'Hello from the desktop app 👋',
    } as TestWebsocketEvent);
  }
}
