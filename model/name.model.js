const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
// Importar el archivo que está en /config/db.js
// Un objeto, que dentro tiene a "sequelize"
const {sequelize} = require("./config/db");
const {Game} = require("./models/game.model");
const {Comment} = require("./models/comment.model");
const app = express();
const port = 3001;

Game.hasMany(Comment);

// Una vez que tenemos los modelos, omitimos el force para que la información se mantenga
sequelize.sync({});

app.set("view engine", "ejs");

// Variables

// Rutas
app.use(express.static("public"));

// Configurar app para poder usar req.body
app.use(bodyParser.urlencoded({ extended: false }));

// Read
app.get("/", (req, res) => {

    (async () => {
        // Consultar todos los "Game" desde la base de datos
        let games = await Game.findAll();

        console.log('jedis.length', jedis.length);
        jedis.forEach((jedi) => {
            console.log('jedi.name', jedi.name);
        });

        // Renderizar (mostrar) el archivo ejs: /views/pages/index.ejs
        res.render("pages/index", {

            jedis: jedis,
        });
    })();

});

// Create, parte 1
app.get("/create", (req, res) => {
    res.render("pages/create");
});

// Create, parte 2
app.post("/create", (req, res) => {

    console.log("Name:", req.body.name);
    console.log("Genre:", req.body.genre);

    // Crear una variable para facilitar el acceso al valor introducido
    let jedi = req.body.name;
    let era = req.body.genre;
    let saber = req.body.year;

    (async () => {

        let jedi = await jedi.create({
            name: jedi,
            genre: era,
            year: saber,
        });

        res.redirect('/');
    })();
});

// Update
// Mostrar formulario para editar registro (precargado con la información existente)
app.get('/update/:id', (req, res, next) => {

    let id = req.params.id;

    (async () => {
        let jedi = await Jedi.findByPk(id);

        res.render('pages/update', {
            game: jedi,
        });
    })();
});

app.post('/update', (req, res, next) => {
    let id = req.body.id;
    let jedi = req.body.jedi;
    let era = req.body.era;
    let saber = req.body.saber;

    (async () => {
        // Reconsultamos el registro de la BD
        let jedi = await Jedi.findByPk(id);

        // Actualizamos sus valores
        jedi.jedi = jedi;
        jedi.era = era;
        jedi.saber = saber

        // Actualizamos la base de datos
        await jedi.save();

        res.redirect('/');
    })();
});

// Delete
app.post('/delete', (req, res, next) => {
    (async () => {
        let id = req.body.id;

        await Jedi.destroy({
            where: {
                id: id,
            }
        });

        res.redirect('/');
    })();
});

app.get('/detail/:id', (req, res, next) => {
    let id = req.params.id;

    (async () => {
        let jedi = await Jedi.findByPk(id);

        let comments = await Comment.findAll({
            where: {
                jediId: id,
            },
        });

        res.render('pages/detail', {
            jedi: jedi,
            comments: comments,
        });
    })();
});

app.post('/comments/create', (req, res, next) => {
    let jediId = req.body.gameId;
    let username = req.body.username;
    let content = req.body.content;

    (async () => {
        await Comment.create({
            username: username,
            content: content,
            jediId: jediId,
        });

        res.redirect('/detail/' + Id);
    })();
});

// Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});