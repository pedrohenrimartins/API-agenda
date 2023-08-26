import { Router } from "express";
import { inserir, listarContato, buscarNome, agendaFavorito, deletarContato, alterarContato } from '../repository/contatoRepository.js';


let endpoints = Router();

endpoints.post('/contato', async (req, resp) => {
    let contato = req.body
    let dados = await inserir(contato);
    resp.send(dados);
})

endpoints.get('/contato', async (req, resp) => {
    let dados = await listarContato();
    resp.send(dados);
})

endpoints.get('/contato/buscar', async (req, resp) =>{
    let nome = req.query.nome;
    let dados = await buscarNome(nome);
    resp.send(dados);
});

endpoints.get('/contato/favoritos', async (req,resp) =>{
    let dados = await agendaFavorito();
    resp.send(dados);
});

endpoints.get('/contato/cadastro', async (req,resp) =>{
    let data1 = req.query.inicio;
    let data2 = req.query.fim;

    let dados = await buscarData(data1,data2);
    resp.send(dados)
})

endpoints.put('/contato/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let contato = req.body;
      let r = await alterarContato(id, contato );

      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })

  endpoints.delete('/contato/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let r = await deletarContato(id);
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })

export default endpoints;