import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import ProfessorController from '../controllers/ProfessorController';
import ParceiroController from '../controllers/ParceiroController';
const router = Router()

import UsuarioController from '../controllers/UsuarioController';

const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const professorController = new ProfessorController();
const parceiroController = new ParceiroController();

router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', usuarioController.get)
router.get('/usuario', usuarioController.getAll)
router.delete('/usuario/:id', usuarioController.delete)
router.put('/usuario/:id', usuarioController.update)

router.post('/aluno', alunoController.create)
router.get('/aluno/:id', alunoController.get)
router.get('/aluno', alunoController.getAll)
router.delete('/aluno/:id', alunoController.delete)
router.put('/aluno/:id', alunoController.update)

router.post('/professor', professorController.create)
router.get('/professor/:id', professorController.get)
router.get('/professor', professorController.getAll)
router.delete('/professor/:id', professorController.delete)
router.put('/professor/:id', professorController.update)
router.post('/professor/:id', professorController.enivarMoedas)
router.put('/professor', professorController.iniciarSemestre)

router.post('/parceiro', parceiroController.create)
router.get('/parceiro/:id', parceiroController.get)
router.get('/parceiro', parceiroController.getAll)
router.delete('/parceiro/:id', parceiroController.delete)
router.put('/parceiro/:id', parceiroController.update)


export default router;
