from ev3dev2.motor import LargeMotor, MediumMotor, SpeedPercent, OUTPUT_A, OUTPUT_B, OUTPUT_C, OUTPUT_D
from ev3dev2.sensor import INPUT_1
from ev3dev2.sensor.lego import TouchSensor


class MoveControl:

    def __init__(self):
        # Initialize motors and sensors
        self.x_motor = MediumMotor(OUTPUT_D)
        self.x_button = TouchSensor(INPUT_1)
        self.y_motors = (
            LargeMotor(OUTPUT_A),
            LargeMotor(OUTPUT_B)
        )
        self.z_motor = MediumMotor(OUTPUT_C)
        # Setup default values
        self.pen_position = "DOWN"
        self.pen_up_target = -50
        self.speed = SpeedPercent(25)
        self.x_max = 0
        self.y_max = 1000  # TODO: This is hardcoded
        self.x_full_move_time = 1.22  # Time it takes to move through the page
        self.y_full_move_time = 4  # TODO: We might need to change these...

    def calibrate_x(self):
        # Reset motor position
        self.x_motor.reset()
        # Move motor to the end
        self.x_motor.on(self.speed)
        self.x_button.wait_for_pressed()
        self.x_motor.stop()
        # Set maximum to current position
        self.x_max = self.x_motor.position

    def move_x_to(self, target_position, speed_coefficient=1):
        # Get the position we want motor move to
        motor_position = self.x_max * target_position

        try:
            # Move the motor to desired position
            self.x_motor.on_to_position(
                self.speed * speed_coefficient, motor_position)
        except:
            print("An error occurred, trying to recover...")
            # If fails, try to the same again...
            self.x_motor.on_to_position(
                self.speed * speed_coefficient, motor_position)

    def get_x_position(self):
        return self.x_motor.position / self.x_max

    def calibrate_y(self):
        self.y_motors[0].reset()
        self.y_motors[1].reset()

    def move_y_to(self, target_position, speed_coefficient=1):
        # Get the position we want motors move to
        motor_position = self.y_max * target_position

        try:
            # Move the motors to desired position
            self.y_motors[0].on_to_position(
                self.speed * speed_coefficient, motor_position, True, False)
            self.y_motors[1].on_to_position(
                self.speed * speed_coefficient, motor_position)
        except:
            print("An error occurred, trying to recover...")
            # If fails, try to the same again...
            self.y_motors[0].on_to_position(
                self.speed * speed_coefficient, motor_position, True, False)
            self.y_motors[1].on_to_position(
                self.speed * speed_coefficient, motor_position)

    def get_y_position(self):
        # TODO: Maybe change from which motor we get the value
        return self.y_motors[0].position / self.y_max

    def calibrate_z(self):
        # Reset motor position
        self.z_motor.reset()
        # Move pen up
        self.z_motor.on_to_position(self.speed, self.pen_up_target)

    def move_z(self, target_position):
        if target_position == "UP":
            self.z_motor.on_to_position(self.speed, self.pen_up_target)
        if target_position == "DOWN":
            self.z_motor.on_to_position(self.speed, 0)
