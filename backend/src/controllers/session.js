import connection from '../database/connection';
const ONG_TABLE_NAME = 'ongs';

export default {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connection(ONG_TABLE_NAME)
    .where('id', id)
    .select('name')
    .first();

    if(!ong) return res.status(400).json({ error: 'No ONG found with this ID' });

    return res.json(ong);
  }
}