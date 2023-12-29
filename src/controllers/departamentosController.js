import express from 'express';
import db from '../services/departamentosServices.js';

const routes = express.Router();

routes.post('/', async (request, response) => {
    try{
        const{nome, birth, data_congresso}=request.body;

        await db.createDepartamentos(nome, birth, data_congresso);

        response.status(201).send({message: "Cadastro realizado com sucesso."})
              
    } catch (error) {
        response.status(500).send(`Erro na requisição! ${error}`);
    }
});

routes.put('/:id_departamento', async (request, response) => {
    try {
        const { id_departamento } = request.params;
        
        const { nome, birth, data_congresso } = request.body;

        await db.updateDepartamento(id_departamento, nome, birth, data_congresso);

        response.status(200).send({ message: "Departamento atualizado com sucesso." });
    } catch (error) {
        response.status(500).send(`Erro na requisição! ${error}`);
    }
});

routes.get('/', async (request, response) => {
    try{
        const { id_departamento } = request.params;

        const departamento = await db.selectDepartamento(id_departamento);
 
        if (departamento) {
            response.status(200).send(departamento);
        } else {
            response.status(404).send("Departamento não encontrado!");
        }
    } catch (error){
        response.status(500).send(`Erro na requisição! ${error}`);
    }
})

routes.get('/:id_departamento', async (request, response) => {
    try {
        const { id_departamento } = request.params;

        const departamento = await db.selectDepartamento(id_departamento);

        if (departamento) {
            response.status(201).send(departamento);
        } else {
            response.status(404).send("Departamento não encontrado!");
        }
    } catch (error) {
        response.status(500).send(`Erro na requisição! ${error}`);
    }
});

export default routes;