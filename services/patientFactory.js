
module.exports = function(pool) {

    const create = async(patient) => {
        await pool.query(`
            INSERT INTO patient(first_name, last_name, age, unit_id) 
            VALUES($1, $2, $3, $4)`, [patient.first_name, patient.last_name, patient.age, patient.unit_id]);
        return `Successfully created patient record`;
    }

    const readAll = async() => {
        const result = await pool.query(`select * from patient`);
        return result.rows;
    }

    const readById = async(id) => {
        const result = await pool.query(`SELECT * FROM patient WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async function getId(first, last) {
        const result = await pool.query(`select * from patient where first_name = $1 and last_name = $2`, [first, last]);
        return result.rows[0].id;
    }

    const update = async(id, patient) => {
        await pool.query(`
            UPDATE patient 
            SET first_name = $1, last_name = $2, age = $3, unit_id = $4
            WHERE id = $5`, [patient.first_name, patient.last_name, patient.age, patient.unit_id, id]);
        return `Successfully updated patient record ${id}`;
    }

    const remove = async(id) => {
        await pool.query(`DELETE FROM patient WHERE id = $1`, [id]);
        return `Successfuly removed record: ${id}`;
    }

    // async function getByFirstAndLast(first, last) {
    //     const result = await pool.query(`select * from patient where first_name = $1 and last_name = $2`, [first, last]);
    //     return result.rows[0];
    // }

    


    return {
        create,
        readAll,
        readById,
        update,
        remove,
        // getByFirstAndLast,
        getId
    }
}