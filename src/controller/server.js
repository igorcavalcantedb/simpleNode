const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('./src/views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checkMiddleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }
  return next()
}

// app.use(logMiddleware);

/* app.get("/1/:name", (req, res) => {
  if (req.params.name != "add") {
    res.send(`hello ${req.params.name}`);
  } else return res.send(`Adicionar usuario ${req.injection}`);
}); */
const lista = []

app.get('/list/', (req, res) => {
  return res.render('list', { lista })
})
app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  console.log(req.body.idade)
  if (req.body.idade >= 18) res.redirect(`/major?age=${req.body.idade}`)
  res.redirect(`/minor?age=${req.body.idade}`)
})

app.get('/minor', checkMiddleware, (req, res) => {
  console.log(req.query.age)
  return res.render('minor', { age: req.query.age })
})
app.get('/major', checkMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})
app.listen('3001')
