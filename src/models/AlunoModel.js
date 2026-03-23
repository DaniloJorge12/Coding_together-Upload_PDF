import prisma from '../utils/prismaClient.js';

export default class AlunoModel {
    constructor({ id = null, nome, escola = null, turma = null, foto = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.escola = escola;
        this.turma = turma;
        this.foto = foto;
    }

    async criar() {
        return prisma.aluno.create({
            data: {
                nome: this.nome,
                escola: this.escola,
                turma: this.turma,
                foto: this.foto,
            },
        });
    }

    async atualizar() {
        return prisma.aluno.update({
            where: { id: this.id },
            data: { nome: this.nome, escola: this.escola, turma: this.turma, foto: this.foto },
        });
    }

    async deletar() {
        return prisma.aluno.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) where.nome = { contains: filtros.nome, mode: 'insensitive' };
        if (filtros.escola) where.escola = { contains: filtros.escola, mode: 'insensitive' };
        if (filtros.turma) where.turma = { contains: filtros.turma, mode: 'insensitive' };

        return prisma.aluno.findMany({ where, orderBy: { id: 'asc' } });
    }

    static async buscarPorId(id) {
        const data = await prisma.aluno.findUnique({ where: { id } });
        if (!data) return null;
        return new AlunoModel(data);
    }
}
