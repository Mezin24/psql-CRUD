const db = require('../db');

class postController {
  async createPost(req, res) {
    const { title, content, userId } = req.body;
    console.log(userId);
    const { rows } = await db.query(
      'INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *',
      [title, content, userId]
    );
    res.json(rows[0]);
  }

  async getPostByUser(req, res) {
    const { id } = req.query;
    const { rows } = await db.query('select * from post where user_id = $1', [
      id,
    ]);
    res.json(rows);
  }
}

module.exports = new postController();
