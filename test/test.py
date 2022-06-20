import json
import base64
import requests as req

# imagen a base64
ruta = "imagen5.jpg"
nombre = ruta.split(".")[0]
formato = ruta.split(".")[1]

data = {}
with open(ruta, mode='rb') as file:
    img = file.read()
data['img'] = base64.encodebytes(img).decode('utf-8')

datajson = json.dumps(data)

# hacemos peticion a api
payload = {
    "image": datajson,
    "name": nombre,
    "format": formato
}
payloadjson = json.dumps(payload)

headers = {
    "content-type": "application/json",
}
headersjson = json.dumps(headers)

response = req.post("http://localhost:3001/api/dogorcat", headers=headers, data=payloadjson)

# respuesta
if response:
    print('Success!')
    print(response.text)
else:
    print('An error has occurred.')