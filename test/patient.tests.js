const assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_test_db';

const pool = new Pool({
   connectionString
});

const PatientInstance = require("../functions/patientFactory");
const patientInstance = PatientInstance(pool);


describe("The Patient Functions", () => {
   // before(async () => {
   //    pool.query("DELETE FROM patient;");
   // });

   // it("Should be able to create patient record", async () => {
   //    const newPatient1 = { first_name: "Bob", last_name: "Marly", age: 40, unit_id: 54 }
   //    const newPatient2 = { first_name: "Jim", last_name: "Skew", age: 45, unit_id: 54 }
   //    const newPatient3 = { first_name: "John", last_name: "Doe", age: 50, unit_id: 58 }
   //    const newPatient4 = { first_name: "Bill", last_name: "Gates", age: 60, unit_id: 58 }
   //    const newPatient5 = { first_name: "Tom", last_name: "Cruz", age: 46, unit_id: 58 }
   //    const newPatient6 = { first_name: "Thando", last_name: "Nodwengu", age: 38, unit_id: 57 }

   //    assert.equal("Successfully created patient record", await patientInstance.create(newPatient1));
   //    assert.equal("Successfully created patient record", await patientInstance.create(newPatient2));
   //    assert.equal("Successfully created patient record", await patientInstance.create(newPatient3));
   //    assert.equal("Successfully created patient record", await patientInstance.create(newPatient4));
   //    assert.equal("Successfully created patient record", await patientInstance.create(newPatient5));
   //    assert.equal("Successfully created patient record", await patientInstance.create(newPatient6));
   // });

   it("Should be able to return all patient records", async () => {
      assert.equal(5, (await patientInstance.readAll()).length);
   });

   it("Should be able to return one patient record by id", async () => {
      //   assert.equal(false, await patientInstance.readById(54) === undefined);
      assert.equal(false, await patientInstance.readById(8) === undefined);
      assert.equal(true, await patientInstance.readById(1) === undefined);
      assert.equal("Marly", (await patientInstance.readById(8)).last_name);
   });

   it("Should be able to return patient id from the table", async () => {
      assert.equal( 10, await patientInstance.getId("John", "Doe") );
      assert.equal( 12, await patientInstance.getId("Tom", "Cruz") );
   });

   it("Should be able to update patient record on the db table", async () => {
      const newPatient = { first_name: "Mark", last_name: "Anthony", age: 38, unit_id: 57 }
      const patient = await await patientInstance.readById(13)
      
      assert.equal("Successfully updated patient record 13", await patientInstance.update(patient.id, newPatient));
      assert.equal("Anthony", (await patientInstance.readById(13)).last_name)
   });

   it("Should be able to delete patient record from the table", async () => {
      assert.equal(5, (await patientInstance.readAll()).length);
      assert.equal("Successfuly removed record: 9", await patientInstance.remove(9));
      assert.equal(true, await patientInstance.readById(9) === undefined);
   });


   after(() => {
      pool.end();
   })
});