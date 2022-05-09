
module.exports = function (pool) {
   let prescrtList = [];

   async function create(obj) {
      await pool.query(`
         INSERT INTO prescription(patient_id, drug_id) 
         VALUES ($1, $2, $3)`, [obj.patient_id, obj.drug_id]);
      return `Successfully created record`;
   }

   async function readAll() {
      const results = await pool.query(`SELECT * FROM prescription`);
      return results.rows
   }

   async function update(id, obj) {
      await pool.query(`
         UPDATE prescription 
         SET patient_id = $1, drug_id = $2 
         WHERE id = $3`, [obj.patient_id, obj.drug_id, id]);
      return `Successfully updated record`;
   }

   async function remove(id) {
      await pool.query(`DELETE FROM prescription WHERE id = $1`, [id]);
      return `Successfully deleted prescription record`;
   }

   async function readById(id) {
      const results = await pool.query(`SELECT * FROM prescription WHERE id = $1`, [id]);
      return results.rows[0];
   }

   function getAll() {
      return prescrList;
   }

   function addPrescr(obj) {
      prescrtList.push(obj);
   }



   return {
      create,
      readAll,
      update,
      remove,
      readById,



      getAll,
      addPrescr
    
   }
}