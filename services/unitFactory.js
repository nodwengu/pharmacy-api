module.exports = function (pool) {

    const readAll = async() => {
        const results = await pool.query(`SELECT * FROM unit`);
        return results.rows;
    }

   const create = async (unit) => {
      await pool.query(`
         INSERT INTO unit(unit_name, facility_id, floor_no)
         VALUES($1, $2, $3)`, [unit.unit_name, unit.facility_id, unit.floor_no]);
      return `Successfully created unit record`;
   }

   const allForFacility = async (id) => {
      const results = await pool.query(`
            SELECT u.id, u.unit_name, u.floor_no, f.address, f.phone
            FROM unit As u
            INNER jOIN facility As f
            ON f.id = u.facility_id
            WHERE f.id = $1`, [id]);
      return results.rows;
   }

   const readById = async(id) => {
      const results = await pool.query(`SELECT * FROM unit WHERE id = $1`, [id]);
      return results.rows[0];
   }

   const updateName = async (id, unitObj) => {
      await pool.query(`
         UPDATE unit SET unit_name = $2, floor_no = $3
         WHERE id = $1`, [id, unitObj.unit_name, unitObj.floor_no]);
      return `Successfully updated unit record`;
   }

   const remove = async (id) => {
      await pool.query(`DELETE FROM unit WHERE id = $1`, [id]);
      return `Successfully deleted unit record`;
   }


   return {
      create,
      readAll,
      readById,
      updateName,
      remove,
      allForFacility

   }
}