import { Gamepad } from './Gamepad/Gamepad';
import { GamepadButton } from './Gamepad/GamepadButton';

import { useBound } from './Gamepad/useBound';

import { values } from './values';
import { ws } from './remote';

import type { Values } from './values';

const gamepad = new Gamepad();

const buttonX = new GamepadButton();
const buttonY = new GamepadButton();

const leftAxisBound = useBound(0.1);

const rightAxisButton = new GamepadButton();

gamepad.addAction('before_loop', (gamepad) => {
  buttonX.update(gamepad.buttons[2].pressed);
  buttonY.update(gamepad.buttons[3].pressed);

  rightAxisButton.update(gamepad.buttons[11].pressed);
});

gamepad.addAction('loop', (gamepad) => {
  const speed = gamepad.buttons[7].value - gamepad.buttons[6].value;
  const turn = leftAxisBound(gamepad.axes[0]);

  const turnInPlace = buttonX.isHeld;
  const toggleArms = buttonY.isPressed;
  const autoHome = rightAxisButton.isPressed;

  const loopValues: Values = { speed, turn, turnInPlace, toggleArms, autoHome };

  values.set(loopValues);
  ws.send(JSON.stringify(loopValues));
});

export {};
