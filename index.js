import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

let posts = [];

app.get("/", (req, res) => {
  res.render('index', { posts: posts });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/posts", (req, res) => {
  res.render("posts", { posts: posts });
});

app.post("/posts", (req, res) => {
  const novoPost = req.body;
  posts.push(novoPost);
  res.redirect("/posts");
});

app.get('/posts/:index/edit-post', (req, res) => {
  const index = req.params.index;
  const post = posts[index];

  if (!post) {
      return res.status(404).send('Post não encontrado');
  }

  res.render('editPost', { post: post, index: index });
});

app.post('/posts/:index/edit-post', (req, res) => {
  const index = req.params.index;
  const novoConteudo = req.body.content;
  posts[index].content = novoConteudo;
  res.redirect('/posts');
});

app.delete('/posts/:index', (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.send('Post excluído com sucesso!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});