import urequests
import ujson


def make_request(path):
    res = urequests.get("http://192.168.0.176:8080/print/{0}".format(path))

    return ujson.loads(res.content)


def get_info():
    return make_request("")


def get_instructions(id):
    return make_request(id)["instructions"]
