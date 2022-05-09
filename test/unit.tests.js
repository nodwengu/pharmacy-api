const assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_test_db';

const pool = new Pool({
   connectionString
});

const UnitInstance = require("../functions/unitFactory");
const unitInstance = UnitInstance(pool);


describe("Facility-Unit Functions", () => {
   // before(async () => {
   //    pool.query("DELETE FROM unit;");
   // });

   // it("Should be able to create Unit record", async () => {
   //    const newUnit1 = { unit_name: "Unit-A", facility_id: 161, floor_no: 1 }
   //    const newUnit2 = { unit_name: "Unit-B", facility_id: 161, floor_no: 1 }
   //    const newUnit3 = { unit_name: "Unit-C", facility_id: 161, floor_no: 2 }
   //    const newUnit4 = { unit_name: "Unit-A", facility_id: 163, floor_no: 3 }
   //    const newUnit5 = { unit_name: "Unit-B", facility_id: 163, floor_no: 3 }
   //    const newUnit6 = { unit_name: "Unit-C", facility_id: 163, floor_no: 3 }

   //    assert.equal("Successfully created unit record", await unitInstance.create(newUnit1));
   //    assert.equal("Successfully created unit record", await unitInstance.create(newUnit2));
   //    assert.equal("Successfully created unit record", await unitInstance.create(newUnit3));
   //    assert.equal("Successfully created unit record", await unitInstance.create(newUnit4));
   //    assert.equal("Successfully created unit record", await unitInstance.create(newUnit5));
   //    assert.equal("Successfully created unit record", await unitInstance.create(newUnit6));

   // });

   it("Should be able to return all Unit records", async () => {
      assert.equal(5, (await unitInstance.readAll()).length);
   });

   it("Should be able to return one Unit record by id", async () => {
      assert.equal(false, await unitInstance.readById(54) === undefined);
      assert.equal(true, await unitInstance.readById(52) === undefined);
   });

   it("Should be able to update Unit record on the db table", async () => {
      const newUnit = { unit_name: 'TB division', floor_no: 4 }
      const unit = await await unitInstance.readById(58)
      assert.equal("Successfully updated unit record", await unitInstance.updateName(unit.id, newUnit));
      assert.equal("TB division", (await unitInstance.readById(58)).unit_name)
   });

   it("Should be able to delete unit record from the table", async () => {
      assert.equal(5, (await unitInstance.readAll()).length);
      assert.equal("Successfully deleted unit record", await unitInstance.remove(53));
      assert.equal(5, (await unitInstance.readAll()).length);
   });

   it("Should be able to return all units for a specific facility", async () => {
      assert.equal(3, (await unitInstance.allForFacility(163)).length);
   });

   after(() => {
      pool.end();
   })
});