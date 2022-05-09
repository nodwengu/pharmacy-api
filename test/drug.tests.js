const assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_test_db';

const pool = new Pool({
   connectionString
});

const DrugInstance = require("../functions/drugFactory");
const drugInstance = DrugInstance(pool);


describe("The Drug Functions", () => {
   before(async () => {
      // pool.query("DELETE FROM drug;");
   });

   it("Should be able to create drug record", async () => {
      // const newdrug1 = { name: "drug-1", description: "", price: 100, dose: "", instock: 10 }
      // const newdrug2 = { name: "drug-2", description: "", price: 100, dose: "", instock: 10 }
      // const newdrug3 = { name: "drug-3", description: "", price: 100, dose: "", instock: 10 }
      // const newdrug4 = { name: "drug-4", description: "", price: 100, dose: "", instock: 10 }
      // const newdrug5 = { name: "drug-5", description: "", price: 100, dose: "", instock: 10 }
      // const newdrug5 = { name: "drug-5", description: "Medicine description", price: 100, dose: "120 mg/d daily", instock: 10 }
     
      // assert.equal("Added new drug record", await drugInstance.create(newdrug2));
      // assert.equal("Added new drug record", await drugInstance.create(newdrug3));
      // assert.equal("Added new drug record", await drugInstance.create(newdrug4));
      // assert.equal("Added new drug record", await drugInstance.create(newdrug5));
   });

   it("Should be able to return all drug records", async () => {
      assert.equal(7, (await drugInstance.readAll()).length);
   });

   it("Should be able to return one drug record by id", async () => {
      assert.equal(false, await drugInstance.readById(22) === undefined);
      assert.equal(false, await drugInstance.readById(26) === undefined);
      assert.equal(true, await drugInstance.readById(1) === undefined);
      assert.equal("drug-2", (await drugInstance.readById(23)).name);
   });

   it("Should be able to return one drug record by drug name", async () => {
      assert.equal(false, await drugInstance.readByName("drug-2") === undefined);
      assert.equal(false, await drugInstance.readByName("drug-3") === undefined);
      assert.equal(true, await drugInstance.readByName("drug-0") === undefined);
      assert.equal(10, (await drugInstance.readByName("drug-4")).instock);
   });

   it("Should be able to return drug id from the table", async () => {
      assert.equal(24, await drugInstance.readId("drug-3"));
      assert.equal(23, await drugInstance.readId("drug-2"));
   });

   it("Should be able to update drug record on the db table", async () => {
      const drug = await drugInstance.readByName("Panado")
      const newdrug = { name: drug.name, description: "updated description for Panado", dose: "", price: 100, instock: 50 }

      assert.equal("Updated drug table record", await drugInstance.update(drug.id, newdrug));
      assert.equal("Panado", (await drugInstance.readById(drug.id)).name)
   });

   it("Should be able to delete drug record from the table", async () => {
      // assert.equal(6, (await drugInstance.readAll()).length);
      // assert.equal("Deleted drug from the table", await drugInstance.remove(28));
      // assert.equal(true, await drugInstance.readById(28) === undefined);
   });


   after(() => {
      pool.end();
   })
});