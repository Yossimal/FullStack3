
import time


class WaiterData:
    def __init__(self, name):
        self.name = name
        self.lastTime = time.time()
        self.currenTime = time.time()
        self.funcs = []

    def addEvent(self, func):
        self.funcs.append(func)

data = WaiterData("waiter")

def waiter():
    # wait 140 seconds and print "Hello World" with while loop
    while True:
        data.currenTime = time.time()
        if data.currenTime-data.lastTime >= 3:
            for f in data.funcs:
                f(data.currenTime)
            data.lastTime = data.currenTime


def main():
    data.addEvent(lambda x: print(x))
    waiter()


if __name__ == "__main__":
    main()
