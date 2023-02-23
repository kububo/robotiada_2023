from ev3dev2.motor import SpeedNativeUnits

import utime


class AutoHome:
    def __init__(self, motors):
        self.speed_history = []
        self.watching = False
        self.delay = 0.03
        self.motors = motors

    def watch(self):
        left_motor, right_motor = self.motors
        self.watching = True

        while self.watching:
            self.speed_history.append((
                left_motor.speed,
                right_motor.speed
            ))

            utime.sleep(self.delay)

    def auto_home(self):
        self.speed_history.reverse()

        left_motor, right_motor = self.motors
        filtered_speeds = filter(
            lambda speeds: not (speeds[0] == 0 and speeds[1] == 0), self.speed_history)

        for left_speed, right_speed in filtered_speeds:
            left_motor.on(SpeedNativeUnits(-left_speed))
            right_motor.on(SpeedNativeUnits(-right_speed))

            utime.sleep(self.delay)

        self.speed_history = []
