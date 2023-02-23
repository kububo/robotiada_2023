type ActionType = 'before_loop' | 'loop';
type Action = (gamepad: globalThis.Gamepad) => unknown;

export class Gamepad {
  private gamepad: globalThis.Gamepad;
  private beforeLoopActions: Function[] = [];
  private loopActions: Function[] = [];

  public constructor() {
    window.addEventListener('gamepadconnected', (e) => {
      this.gamepad = e.gamepad; // Connect gamepad
      this.startLoop();
    });
  }

  public addAction(actionType: ActionType, action: Action) {
    if (actionType === 'before_loop') this.beforeLoopActions.push(action);
    if (actionType === 'loop') this.loopActions.push(action);
  }

  private startLoop() {
    setInterval(() => {
      this.beforeLoopActions.forEach((action) => action(this.gamepad));
      this.loopActions.forEach((action) => action(this.gamepad));
    }, 20);
  }
}
