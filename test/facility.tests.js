const assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_test_db';

const pool = new Pool({
   connectionString
});

const FacilityInstance = require("../functions/facilityFactory");
const facilityInstance = FacilityInstance(pool);


describe('The Facility functions', () => {
//    before(async() => {
//       pool.query("DELETE FROM facility;");
//    });

//    it('Should be able to create new facility record.', async () => {
//       const obj1 = { name: 'Facility-A', address: 'Samora', phone: '011 123' };
//       const obj2 = { name: 'Facility-B', address: 'Langa', phone: '022 123' };
//       const obj3 = { name: 'Facility-C', address: 'Nyanga', phone: '033 123' };

//       assert.equal("Added new record to facility table", await facilityInstance.create(obj1));
//       assert.equal("Added new record to facility table", await facilityInstance.create(obj2));
//       assert.equal("Added new record to facility table", await facilityInstance.create(obj3));
//    });

   it('Should be able to return all facility records.', async () => {
      assert.equal(2, (await facilityInstance.readAll()).length);
   });

   it("Should be able to return one facility record by name", async() => {
      assert.equal(false, await facilityInstance.readByName("Facility-C") === undefined);
   });

   it("Should be able to return one facility record by id", async() => {
      const facility = await facilityInstance.readByName("Facility-C");
      assert.equal(true, await facilityInstance.readById(facility.id) !== undefined);
   });

   it("Should be able to return one facility record by address", async() => {
      assert.equal(false, await facilityInstance.readByAddress("Samora") === undefined);
   });

//    it("Should be able to update facility record", async() => {
//       const facility = await facilityInstance.readByName("Facility-B");
//       const obj = { name: 'Cape Town', address: "Long Street", phone: "022 123" }

//       assert.deepEqual(facility, await facilityInstance.readByName(facility.name));
//       assert.equal("Updated facility record.", await facilityInstance.update(facility.id, obj));
//       assert.equal(true, await facilityInstance.readByName("Facility-B") === undefined);
//       assert.equal(false, await facilityInstance.readByName("Cape Town") === undefined);
//    });

//    it("Should be able to delete a record from facility table", async() => {
//       const facility = await facilityInstance.readByName("Cape Town");

//       assert.equal(2, (await facilityInstance.readAll()).length);
//       assert.equal("Removed one record from facility table.", await facilityInstance.remove(facility.id));
//       assert.equal(2, (await facilityInstance.readAll()).length);
//    });


   after(() => {
      pool.end();
   })
});

