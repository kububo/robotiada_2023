import _thread


class InParalel:
    def wrap(self, func):
        func()

        self.done += 1

    def run_in_paralel(self, *target_functions):
        self.done = 0

        for func in target_functions:
            _thread.start_new_thread(self.wrap, (func,))

        while True:
            if self.done == len(target_functions):
                break
