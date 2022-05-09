
module.exports = function UsersService(pool) {

   async function create(user) {
      await pool.query(`
         INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`, 
         [user.username, user.email, user.password]);
   }

   async function readAll() {
      const result = await pool.query(`SELECT * FROM users`);
      return result.rows;
   }

   async function readByEmail(email) {
      const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
      return result.rows[0];
   }

   // async function readByName(name) {
   //    const result = await pool.query(`SELECT * FROM drug WHERE name = $1`, [name]);
   //    return result.rows[0];
   // }

   // async function readById(id) {
   //    const result = await pool.query(`SELECT * FROM drug WHERE id = $1`, [id]);
   //    return result.rows[0];
   // }

   // async function readId(name) {
   //    const result = await pool.query(`SELECT * FROM drug WHERE name = $1`, [name]);
   //    return result.rows[0].id;
   // }

   // async function update(id, drug) {
   //    await pool.query(`
   //       UPDATE drug 
   //       SET name = $1, description = $2, dose = $3, price = $4, instock = $5 WHERE id = $6`, 
   //       [drug.name, drug.description, drug.dose, drug.price, drug.instock, id]);
   //    return "Updated drug table record";
   // }

   // async function remove(id) {
   //    await pool.query(`DELETE FROM drug WHERE id = $1`, [id]);
   //    return "Deleted drug from the table";
   // }

   return {
      create,
      readAll,
      readByEmail
      // readByName,
      // readById,
      // readId,
      // update,
      // remove
   }
}