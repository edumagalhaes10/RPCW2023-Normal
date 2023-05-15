var Contrato = require("../models/contrato")


module.exports.list = () => {
            // .distinct("AreaCNAEF")
    return Contrato
        // .aggregate([{"$group" : {_id:"$NomeInstituicao", count:{$sum:1}}}])
        .find()
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getContratoById = id => {
    return Contrato.findOne({_id:id},{})
        .then(contrato => {
            return contrato
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getContratoByInst = inst => {
    return Contrato.find({NomeInstituicao:inst},{})
        .then(contrato => {
            return contrato
        })
        .catch(erro => {
            return erro
        })
}


module.exports.getContratoByInstNIPC = inst => {
    return Contrato.find({NIPCInstituicao:inst},{})
        .then(contrato => {
            return contrato
        })
        .catch(erro => {
            return erro
        })
}


module.exports.courses = () => {
return Contrato
    .distinct("Curso")
    .then(dados => {
    return dados
})
.catch(erro => {
    return erro
})
}

module.exports.institutions = () => {
    return Contrato
        .distinct("NomeInstituicao")
        .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
    }

module.exports.add = a => {
    return Contrato.create(a)
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.delete = id => {
    return Contrato.deleteOne({_id:id})
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}