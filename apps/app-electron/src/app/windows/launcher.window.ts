import { AppRoute } from '@libraries/ipc/enumerations';
import { BaseWindow } from './base.window';

export class LauncherWindow extends BaseWindow {
  constructor() {
    super(AppRoute.Launcher, { title: 'Launcher', width: 800, height: 400, frame: true, resizable: true });
  }
}