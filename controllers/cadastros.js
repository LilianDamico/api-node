const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../db/models'); 
const router = express.Router();


const validateCadastro = [
  check('nome').notEmpty().withMessage('Nome é obrigatório').isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  check('cpf').isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 dígitos').isNumeric().withMessage('CPF deve conter apenas números'),
  check('email').isEmail().withMessage('E-mail inválido'),
  check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
];


router.get("/", async (req, res) => {
    try {
        const cadastros = await db.Cadastros.findAll();
        return res.json({
            error: false,
            cadastros
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro ao buscar cadastros.",
            details: error.message
        });
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const cadastro = await db.Cadastros.findByPk(id);
        if (!cadastro) {
            return res.status(404).json({
                error: true,
                message: "Cadastro não encontrado."
            });
        }
        return res.json({
            error: false,
            cadastro
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro ao buscar o cadastro.",
            details: error.message
        });
    }
});

router.post("/", validateCadastro, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { cpf, email } = req.body;
    try {
        
        const cpfExists = await db.Cadastros.findOne({ where: { cpf } });
        if (cpfExists) {
            return res.status(400).json({
                error: true,
                message: "CPF já cadastrado."
            });
        }

        
        const emailExists = await db.Cadastros.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({
                error: true,
                message: "E-mail já cadastrado."
            });
        }

        
        const dataCadastro = await db.Cadastros.create(req.body);
        return res.status(201).json({
            error: false,
            message: "Cadastro realizado com sucesso.",
            dataCadastro
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Falha ao cadastrar. Tente novamente.",
            details: error.message 
        });
    }
});


router.put("/:id", validateCadastro, async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const cadastro = await db.Cadastros.findByPk(id);
        if (!cadastro) {
            return res.status(404).json({
                error: true,
                message: "Cadastro não encontrado."
            });
        }

        await cadastro.update(req.body);
        return res.json({
            error: false,
            message: "Cadastro atualizado com sucesso.",
            cadastro
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Falha ao atualizar. Tente novamente.",
            details: error.message 
        });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const cadastro = await db.Cadastros.findByPk(id);
        if (!cadastro) {
            return res.status(404).json({
                error: true,
                message: "Cadastro não encontrado."
            });
        }

        await cadastro.destroy();
        return res.json({
            error: false,
            message: "Cadastro deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro ao deletar o cadastro.",
            details: error.message
        });
    }
});

module.exports = router;
