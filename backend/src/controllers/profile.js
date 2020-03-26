import connection from '../database/connection';
const INCIDENTS_TABLE_NAME = 'incidents';

export default {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection(INCIDENTS_TABLE_NAME)
    .where('ong_id', ong_id)
    .select('*');

    return res.json({ incidents });
  }
}