import connection from '../database/connection';
const TABLE_NAME = 'incidents';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;
    const queryOffset = (page - 1) * 5;
    const [count] = await connection(TABLE_NAME).count();

    const incidents = await connection(TABLE_NAME)
      .join('ongs', 'ongs.id', '=', 'ong_id')
      .limit(5)
      .offset(queryOffset)
      .select([
        'incidents.*',
        'ongs.name as ong_name',
        'ongs.email as ong_email',
        'ongs.whatsapp as ong_whatsapp',
        'ongs.city as ong_city',
        'ongs.uf as ong_uf',
      ]);
    
    res.header('X-Total-Count', count['count(*)']);

    return res.send(incidents);
  },

  async create (req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection(TABLE_NAME).insert({
      title,
      description,
      value,
      ong_id
    });
    
    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection(TABLE_NAME)
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id)
      return res.status(404).json({ error: 'Operation not permitted.' });

    await connection(TABLE_NAME).where('id', id).delete();

    return res.status(204).send();
  }
}