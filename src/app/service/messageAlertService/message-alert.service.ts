import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageAlertService {
  private time: number;
  actionButtonLabel: string;
  action: boolean;

  constructor(
    private msgAlert: MatSnackBar
  ) {
    this.time = 3000;
    this.actionButtonLabel = '确定';
    this.action = true;
  }

  public onceOk(msg) {
    const config = new MatSnackBarConfig();
    config.duration = this.time;
    config.panelClass = 'success';  // 样式写在style.less中
    this.msgAlert.open(msg, this.action && this.actionButtonLabel, config);
  }

  public onceErr(msg) {
    const config = new MatSnackBarConfig();
    config.duration = this.time;
    config.panelClass = 'error';
    this.msgAlert.open(msg, this.action && this.actionButtonLabel, config);
  }

  public waiting(msg) {
    const config = new MatSnackBarConfig();
    config.panelClass = 'waiting';
    this.msgAlert.open(msg, this.action && this.actionButtonLabel, config);
  }

  public hideWaiting() {
    this.msgAlert.dismiss();
  }
}
