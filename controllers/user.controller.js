const db = require('../db');

class userController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    const newPerson = await db.query(
      'INSERT INTO person (name, surname) values ($1, $2) RETURNING *',
      [name, surname]
    );
    res.json(newPerson.rows[0]);
  }
  async getUsers(req, res) {
    const { rows } = await db.query('SELECT * FROM person');
    res.json(rows);
  }
  async getOneUser(req, res) {
    const { id } = req.params;
    const { rows } = await db.query(`SELECT * FROM person WHERE id = ${id}`);
    res.json(rows);
  }
  async updateUser(req, res) {
    const { id, name, surname } = req.body;
    const { rows } = await db.query(
      `UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *`,
      [name, surname, id]
    );
    res.json(rows[0]);
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    const { rows } = await db.query(
      `DELETE FROM person  where id = $1 RETURNING *`,
      [id]
    );
    res.json(rows);
  }
}

module.exports = new userController();
