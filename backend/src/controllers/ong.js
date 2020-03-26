import connection from '../database/connection';
import crypto from 'crypto';
const TABLE_NAME = 'ongs';

export default {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection(TABLE_NAME).insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  },

  async index(req, res) {
    const ongs = await connection(TABLE_NAME).select('*');

    return res.json({ ongs });
  }
}