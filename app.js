const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Configuração do middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Configuração do template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota principal
app.get('/', (req, res) => {
    try {
        console.log('Renderizando página inicial');
        const theme = req.cookies.theme || 'dark';
        console.log('Tema atual:', theme);
        res.render('index', { theme });
    } catch (error) {
        console.error('Erro ao renderizar:', error);
        res.status(500).send('Erro ao carregar a página');
    }
});

// Rota para alternar o tema
app.get('/toggle-theme', (req, res) => {
    const currentTheme = req.cookies.theme || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    res.cookie('theme', newTheme);
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
