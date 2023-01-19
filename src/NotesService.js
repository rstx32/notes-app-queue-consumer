import pg from 'pg'
const { Pool } = pg

class NotesService {
  constructor() {
    this._pool = new Pool()
  }

  async getNotes(userId) {
    const query = `
        SELECT notes.*
        FROM notes
        LEFT JOIN collaborations ON collaborations.note_id = notes.id
        WHERE notes.owner = '${userId}' OR collaborations.user_id = '${userId}'
        GROUP BY notes.id
    `

    const { rows } = await this._pool.query(query)
    return rows
  }
}

export default NotesService