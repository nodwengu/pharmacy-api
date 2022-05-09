const assert = require("assert");
// const pg = require("pg");
// const Pool = pg.Pool;
const { Pool, Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_test_db';

const pool = new Pool({
    connectionString
});

const PrescriptionInstance = require("../functions/prescriptionFactory");
const prescriptionInstance = PrescriptionInstance(pool);

describe("Prescription Functions", () => {

    before(async () => {
        // pool.query("DELETE FROM prescription;");
     });
  
     it("Should be able to create prescription record", async () => {
        // const obj1 = { patient_id: 8, drug_id: 22}
        // const obj2 = { patient_id: 8, drug_id: 23, dosage: "50 mg/day daily" }
        // const obj3 = { patient_id: 10, drug_id: 26, dosage: "take 2, 3 x per day" }
       
        // assert.equal("Successfully created record", await prescriptionInstance.create(obj1));
        // assert.equal("Successfully created record", await prescriptionInstance.create(obj2));
        // assert.equal("Successfully created record", await prescriptionInstance.create(obj3));
        // assert.equal("Added new prescription record", await prescriptionInstance.create(newprescription4));
        // assert.equal("Added new prescription record", await prescriptionInstance.create(newprescription5));
     });
  
     it("Should be able to return all prescription records", async () => {
        assert.equal(3, (await prescriptionInstance.readAll()).length);
     });
  
     it("Should be able to return one prescription record by id", async () => {
        assert.equal(false, await prescriptionInstance.readById(6) === undefined);
        assert.equal(false, await prescriptionInstance.readById(3) === undefined);
        assert.equal(true, await prescriptionInstance.readById(1) === undefined);
     });
  
     it("Should be able to update prescription record on the db table", async () => {
        const prescription = await prescriptionInstance.readById(6)
        const obj = { patient_id: 8, drug_id: 26 }
        assert.equal("Successfully updated record", await prescriptionInstance.update(prescription.id, obj));
     });
  
     it("Should be able to delete prescription record from the table", async () => {
        assert.equal("Successfully deleted prescription record", await prescriptionInstance.remove(2));
        assert.equal(true, await prescriptionInstance.readById(2) === undefined);
     });
  
  
     after(() => {
        pool.end();
     })


});