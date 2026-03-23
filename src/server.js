import express from 'express';
import 'dotenv/config';
import alunosRoutes from './routes/alunoRoutes.js';
import pdfRoutes from './routes/pdfRoute.js'
import fotoRoutes from './routes/fotoRoutes.js'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

app.use('/alunos', pdfRoutes);
app.use('/alunos', alunosRoutes);
app.use('/alunos', fotoRoutes);
app.use('/uploads', express.static('uploads'));

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
