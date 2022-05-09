const assert = require("assert");
const { Pool, Client } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgresql://thando:thando123@localhost:5432/pharmacy_test_db";

const pool = new Pool({
   connectionString
});

const PharmacistInstance = require("../functions/pharmacistFactory");
const pharmacistInstance = PharmacistInstance(pool);

describe("pharmacist Functions", function () {
   before(async () => {
      // pool.query("DELETE FROM pharmacist;");
   });

   it("Should be able to create pharmacist record", async () => {
      const obj1 = { first_name: "Anold", last_name: "Goeson", email: "anold@gmail.com", phone: "011 123" }
      const obj2 = { first_name: "Vincent", last_name: "Khumalo", email: "vincent@gmail.com", phone: "011 132" }
      const obj3 = { first_name: "test1", last_name: "test1", email: "test@gmail.com", phone: "011" }

      // assert.equal("Successfully created record", await pharmacistInstance.create(obj3));
      // assert.equal("Successfully created record", await pharmacistInstance.create(obj2));
      // assert.equal("Successfully created record", await pharmacistInstance.create(obj3));
   });

   it("Should be able to return all pharmacist records", async () => {
      assert.equal(3, (await pharmacistInstance.readAll()).length);
   });

   it("Should be able to return one pharmacist record by id", async () => {
      assert.equal(false, await pharmacistInstance.readById(10) === undefined);
      assert.equal(false, await pharmacistInstance.readById(11) === undefined);
      assert.equal(true, await pharmacistInstance.readById(100) === undefined);
   });

   it("Should be able to update pharmacist record on the db table", async () => {
      // const pharmacist = await pharmacistInstance.readById(13);
      // const obj = { first_name: "new_name", last_name: "new_surname", email: "new@gmail.com", phone: "new" }

      // assert.equal("Successfully updated record", await pharmacistInstance.update(pharmacist.id, obj));
   });

   it("Should be able to delete pharmacist record from the table", async () => {
      // assert.equal("Successfully deleted pharmacist record", await pharmacistInstance.remove(13));
      // assert.equal(true, await pharmacistInstance.readById(2) === undefined);
   });


   after(() => {
      pool.end();
   })

});