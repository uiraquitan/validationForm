const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");


app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser("jsadds"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}))

app.use(flash());

app.get("/", (req, res) => {

    var emailError = req.flash("nomeError");
    var nomeError = req.flash("emailError");
    var pontosError = req.flash("pontosError");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;

    let nome = req.flash("nome")
    let email = req.flash("email")
    let pontos = req.flash("pontos")

    res.render("index", { emailError, nomeError, pontosError, nome, email, pontos })
});

app.post("/form", (req, res) => {
    var { nome, email, pontos } = req.body;

    var emailError;
    var nomeError;
    var pontosError;


    if (nome == undefined || nome == "") {
        nomeError = "Error: Nome inválido";
    }

    if (nome.length < 4) {
        nomeError = "Error: Nome devem conter mais de 4 character";
    }
    if (email == undefined || email == "") {
        emailError = "Error: Email inválido";
    }


    if (pontos == undefined) {
        pontosError = "Error: pontos inválido";
    }

    if (pontos < 20) {
        pontosError = "Error: pontos devem ser maior que 20";
    }
    console.log(nome, email, pontos)

    console.log(["Nome: " + nomeError, "Email: " + emailError, "Pontos: " + pontosError])

    if (nomeError != undefined || emailError != undefined || pontosError != undefined) {

        req.flash("nomeError", nomeError);
        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);

        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);

        res.redirect("/")
    } else {
        res.send("Chegou");
    }

});

app.listen("3000", (req, res) => {
    console.log("servidor rodando");
})