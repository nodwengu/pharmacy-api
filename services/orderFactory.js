
module.exports = function (pool) {

   const create = async (orderObj) => {
      await pool.query(`
         INSERT INTO orders(prescript_id, phar_id, order_date, price) 
         VALUES($1, $2, $3, $4)`, [orderObj.prescript_id, orderObj.phar_id, orderObj.date, orderObj.price]);
      return `Successfully created record`;
   };

   const readAll = async () => {
      const results = await pool.query(`SELECT * FROM orders`);
      return results.rows;
   }

   const readById = async (id) => {
      const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
      return result.rows[0];
   }

   const update = async (id, status) => {
      await pool.query(`UPDATE orders SET order_status = $2 WHERE id = $1`, [id, status]);
      console.log(`Successfully updated record: ${id}`);
   };

   const remove = async (id) => {
     
   };

   const allPrescripts = async () => {
      const results = await pool.query(`
         SELECT p.first_name, d.name, pr.dosage, o.prescript_id, o.id, o.order_status, o.order_date
         FROM patient As p
         INNER JOIN prescription As pr
         ON p.id = pr.patient_id
         INNER JOIN drug As d
         ON d.id = pr.drug_id
         INNER JOIN orders As o
         ON pr.id = o.prescript_id
         WHERE order_status = 'In-progress'
      `);

      return results.rows;
   }


   return {
      readAll,
      create,
      readById,
      update,
      remove,


      allPrescripts
      
   }
}