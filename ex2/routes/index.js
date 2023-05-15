var express = require('express');
var router = express.Router();

var Contrato = require('../controllers/contrato')

router.get('/contracts/institutions', function(req, res) {
  Contrato.institutions()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem das Instituicoes: "}))
});

router.get('/contracts/:id', function(req, res) {
  Contrato.getContratoById(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem do Contrato com id: "+req.params.id}))
});

router.get('/contracts', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  if (req.query["inst"]){
    Contrato.getContratoByInst(req.query["inst"])
    .then(dados => {
      res.render('instituicaoContratos', {slist: dados, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na mensagem da  lista dos contratos realizados pela instituição contratante..."})
    })
  }
  else{
    Contrato.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem da lista dos Contratos: "}))
  }
});

router.get('/courses', function(req, res) {
  Contrato.courses()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem dos Cursos: "}))
});

router.post('/contracts', (req,res) => {
  Contrato.add(req.body)
  .then(dados => res.status(200).json(dados))
  .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem add contrato: "}))
})

router.get('/contracts/:id', (req,res)=>{
  Contrato.delete(req.params.id)
  .then(dados => res.status(200).json(dados))
  .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem add contrato: "}))
})


router.get('/:id', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)

  Contrato.getContratoById(req.params.id)
  .then(dados => {
    console.log(dados)
    res.render('contrato', { a: dados, d: data })
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção dc contrato com id "+  req.params.id})
  })
});

router.get('/inst/:nipc', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  Contrato.getContratoByInstNIPC(req.params.nipc)
  .then(dados => {
    res.render('instituicaoContratos', {slist: dados, d: data });
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na mensagem da  lista dos contratos realizados pela instituição contratante..."})
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Contrato.list()
    .then(dados => {
      // console.log(dados)
      res.render('index', { slist: dados, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

module.exports = router;
