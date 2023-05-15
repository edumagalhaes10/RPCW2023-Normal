var express = require('express');
var router = express.Router();

var Contrato = require('../controllers/contrato')

router.get('/contracts/institutions', function(req, res) {
  Contrato.institutions()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem das Instituicoes: "}))
});

router.get('/contracts/courses', function(req, res) {
  Contrato.courses()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem dos Cursos: "}))
});


router.get('/contracts/:id', function(req, res) {
  Contrato.getContratoById(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem do Contrato com id: "+req.params.id}))
});

router.get('/contracts', function(req, res, next) {
  if (req.query["inst"]){
    Contrato.getContratoByInst(req.query["inst"])
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, message: "Erro na mensagem da  lista dos contratos realizados pela instituição contratante..."}))
  }
  else{
    Contrato.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem da lista dos Contratos: "}))
  }
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

// Escola Superior de Saúde Atlântica

/* GET home page. */
router.get('/', function(req, res, next) {
  // Con<trato.list()
  // .then(dados => res.status(200).json(dados))
  // .catch(erro => res.status(521).json({erro: erro, message: "Erro na mensagem da lista dos contratos: "}))
  res.render('index', { title: 'Express' });
});

module.exports = router;
