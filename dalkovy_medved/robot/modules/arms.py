from ev3dev2.motor import OUTPUT_B, SpeedPercent, MediumMotor


class Arms:
    def __init__(self):
        self.motor = MediumMotor(OUTPUT_B)
        self.speed = SpeedPercent(50)
        self.open_position = 50
        self.open = False

        self.motor.reset()

    def toggle(self):
        if self.open:
            # Close the arms
            self.motor.on_to_position(self.speed, -10)
        else:
            # Open the arms
            self.motor.on_to_position(self.speed, self.open_position)

        self.open = not self.open
