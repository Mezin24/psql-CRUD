const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

app.use(express.json());
app.use('/', userRouter);
app.use('/', postRouter);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server works on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
