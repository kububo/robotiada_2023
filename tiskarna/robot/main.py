#!/usr/bin/env micropython

from modules.in_paralel import InParalel
from modules.move import MoveControl
from modules.request import get_info, get_instructions
from modules.control import get_speed_coefficients

import utime

move_control = MoveControl()

# Calibrate the printer
move_control.calibrate_z()
move_control.calibrate_y()
move_control.calibrate_x()

# Get print info
print_info = get_info()
# Get the print instructions
print_instructions = get_instructions(print_info["id"])

# Start printing
for layer in print_instructions:
    for shape in layer:
        # Put the pen UP, so we don't have unwanted lines
        move_control.move_z("UP")

        for i, position in enumerate(shape):
            # At start put the pen down
            if i == 1:
                move_control.move_z("DOWN")

            # Get the speed coefficients
            (x_speed_coefficient, y_speed_coefficient) = get_speed_coefficients(
                position["x"], position["y"], move_control.get_x_position(), move_control.get_y_position(), move_control.x_full_move_time, move_control.y_full_move_time)

            # Move to desired position
            InParalel().run_in_paralel(
                lambda: move_control.move_x_to(
                    position["x"], x_speed_coefficient),
                lambda: move_control.move_y_to(
                    position["y"], y_speed_coefficient)
            )

            # Wait for a while after move, just in case...
            utime.sleep(0.1)

# Reset the position
move_control.move_z("UP")
InParalel().run_in_paralel(
    lambda: move_control.move_x_to(0),
    lambda: move_control.move_y_to(0)
)
move_control.move_z("DOWN")
