module.exports = function(pool) {

    const create = async(facility) => {
        await pool.query(`
            INSERT INTO facility(name, address, phone)
            VALUES($1, $2, $3)`, [facility.name, facility.address, facility.phone]);
        return `Added new record to facility table`;
    }
    
    const readAll = async() => {
        const results = await pool.query(`SELECT * FROM facility`);
        return results.rows;
    };

    const readByName = async(name) => {
        const results = await pool.query(`SELECT * FROM facility WHERE name = $1`, [name]);
        return results.rows[0];
    };

    const readById = async(id) => {
        const results = await pool.query(`SELECT * FROM facility WHERE id = $1`, [id]);
        return results.rows[0];
    };

    const readByAddress = async(address) => {
        const results = await pool.query(`SELECT * FROM facility WHERE address = $1`, [address]);
        return results.rows[0];
    };

    const update = async(id, facility) => {
        await pool.query(`
            UPDATE facility 
            SET name = $1, address = $2, phone = $3 
            WHERE id = $4`, [facility.name, facility.address, facility.phone, id]);
        return "Updated facility record."
    }

    const remove = async(id) => {
        await pool.query("DELETE FROM facility WHERE id = $1", [id]);
        return "Removed one record from facility table.";
    }

    return {
        create,
        readAll,
        readById,
        readByName,
        readByAddress,
        update,
        remove

    }
}