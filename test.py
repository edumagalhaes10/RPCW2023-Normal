import json
 
# Opening JSON file
with open('emprego-cientifico.json') as json_file:
    data = json.load(json_file)

id = 1
for contrato in data:
    contrato["_id"] = 'c'+str(id)
    if contrato["ProvasAgregacao"] == "": contrato["ProvasAgregacao"] = 0
    if contrato["TituloEspecialista"] == "": contrato["TituloEspecialista"] = 0
    if contrato["ProvasCoordenacao"] == "": contrato["ProvasCoordenacao"] = 0
    if contrato["ProvasAptidao"] == "": contrato["ProvasAptidao"] = 0
    id+=1

json_object = json.dumps(data, indent = 4,ensure_ascii=False) 


with open('emprego-cientifico2.json', 'w') as f:
    f.write(json_object)


# print(data)
# print(data.keys())