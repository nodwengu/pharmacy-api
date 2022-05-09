module.exports = function(pool) {

    const create = async(pharObj) => {
        await pool.query(`
            INSERT INTO pharmacist(first_name, last_name, email, phone) 
            VALUES($1, $2, $3, $4)`, [pharObj.first_name, pharObj.last_name, pharObj.email, pharObj.phone]);

        return `Successfully created record`;
    }

    const readAll = async() => {
        const result = await pool.query(`SELECT * FROM pharmacist`);
        return result.rows;
    }

    const readById = async(id) => {
        const result = await pool.query(`SELECT * FROM pharmacist WHERE id = $1`, [id]);
        return result.rows[0];
    }

    const update = async(id, pharObj) => {
        await pool.query(`
            UPDATE pharmacist 
            SET first_name = $1, last_name = $2, email = $3, phone = $4 WHERE id = $5`, 
            [pharObj.first_name, pharObj.last_name, pharObj.email, pharObj.phone, id]);
        return `Successfully updated record`;
    }

    const remove = async(id) => {
        await pool.query(`DELETE FROM pharmacist WHERE id = $1`, [id]);
        return `Successfully deleted record`;
    }


    return {
        create,
        readAll,
        readById,
        update,
        remove 
    }
}