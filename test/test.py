import json
import base64
import requests as req

# imagen a base64
#################################
ruta = "imagen1.png" ### RUTA ###
#################################
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

######## ENDPOINT #########################################################################################
# response = req.get("http://localhost:5000/api") ############
# response = req.post("http://localhost:5000/api/dogorcat", headers=headers, data=payloadjson) ############
# response = req.post("http://localhost:5000/api/dogbreed", headers=headers, data=payloadjson) ############
# response = req.post("http://localhost:5000/api/catbreed", headers=headers, data=payloadjson) ############
# response = req.post("http://localhost:5000/api/alldogcat", headers=headers, data=payloadjson) ############

# response = req.get("https://samfind-backend.herokuapp.com/api") ############
response = req.post("https://samfind-backend.herokuapp.com/api/dogorcat", headers=headers, data=payloadjson) ############
# response = req.post("https://samfind-backend.herokuapp.com/api/dogbreed", headers=headers, data=payloadjson) ############
# response = req.post("https://samfind-backend.herokuapp.com/api/catbreed", headers=headers, data=payloadjson) ############
# response = req.post("https://samfind-backend.herokuapp.com/api/alldogcat", headers=headers, data=payloadjson) ############
###########################################################################################################

# respuesta
if response:
    print('Success!')
    print(response.text)
else:
    print('An error has occurred.')