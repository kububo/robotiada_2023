#!/usr/bin/env micropython
from modules.arms import Arms
from modules.auto_home import AutoHome

from ev3dev2.motor import OUTPUT_A, OUTPUT_D, SpeedPercent, LargeMotor

import socket
import json
import _thread

left_motor = LargeMotor(OUTPUT_A)
right_motor = LargeMotor(OUTPUT_D)

arms = Arms()

auto_home = AutoHome((left_motor, right_motor))
_thread.start_new_thread(auto_home.watch, ())


sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('0.0.0.0', 5069))

while True:
    data, _ = sock.recvfrom(1024)
    decoded = data.decode("utf-8")

    values = json.loads(decoded)

    if values["toggleArms"]:
        arms.toggle()

    if values["autoHome"]:
        auto_home.watching = False
        auto_home.auto_home()
        # Reset auto home watch
        _thread.start_new_thread(auto_home.watch, ())

    left_speed = SpeedPercent(-values["speeds"][0] * 100)
    right_speed = SpeedPercent(-values["speeds"][1] * 100)

    left_motor.on(left_speed)
    right_motor.on(right_speed)
