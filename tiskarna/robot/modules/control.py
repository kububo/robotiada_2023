def get_speed_coefficients(x_move_target, y_move_target, x_position, y_position, x_full_move_time, y_full_move_time):
    x_coefficient = 1
    y_coefficient = 1

    x_dist = abs(x_position - x_move_target)
    y_dist = abs(y_position - y_move_target)

    x_time = x_dist * x_full_move_time  # Time it takes to make this move
    y_time = y_dist * y_full_move_time

    if x_time > y_time:
        y_coefficient = y_time / x_time
    else:
        x_coefficient = x_time / y_time

    return (x_coefficient, y_coefficient)
