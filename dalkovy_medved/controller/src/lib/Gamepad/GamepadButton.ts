export class GamepadButton {
  private wasPressed = false; // Was pressed at previous loop event

  private pressed = false; // Activate on press just once
  private held = false; // Activate while button is pressed

  public update(pressed: boolean) {
    this.pressed = !!pressed && !this.wasPressed;

    this.held = pressed;
    this.wasPressed = pressed;
  }

  public get isPressed() {
    return this.pressed;
  }

  public get isHeld() {
    return this.held;
  }
}
