const assert = require("assert");
const { Pool, Client } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgresql://thando:thando123@localhost:5432/pharmacy_test_db";

const pool = new Pool({
    connectionString
});

const OrderInstance = require("../functions/orderFactory");
const orderInstance = OrderInstance(pool);


describe("Order Functions", function() {
    before(async () => {
        // pool.query("DELETE FROM order;");
     });
  
     it("Should be able to create order record", async () => {
        const obj1 = { prescript_id: 3, phar_id: 10, order_date: "5 Mar 2022", price: 100 }
        const obj2 = { prescript_id: 4, phar_id: 10, order_date: "5 Mar 2022", price: 200 }
        const obj3 = { prescript_id: 6, phar_id: 12, order_date: "5 Mar 2022", price: 300 }
       
      //   assert.equal("Successfully created record", await orderInstance.create(obj1));
      //   assert.equal("Successfully created record", await orderInstance.create(obj2));
      //   assert.equal("Successfully created record", await orderInstance.create(obj3));
     });
  
     it("Should be able to return all order records", async () => {
        assert.equal(3, (await orderInstance.readAll()).length);
     });
  
     it("Should be able to return one order record by id", async () => {
        assert.equal(false, await orderInstance.readById(1) === undefined);
        assert.equal(false, await orderInstance.readById(2) === undefined);
        assert.equal(true, await orderInstance.readById(100) === undefined);
     });
  
   //   it("Should be able to update order record on the db table", async () => {
   //      const obj = { patient_id: 8, drug_id: 26, dosage: "changed" }
   //      const order = await orderInstance.readById(6)
  
   //      assert.equal("Successfully updated record", await orderInstance.update(order.id, obj));
   //      assert.equal("changed", (await orderInstance.readById(order.id)).dosage)
   //   });
  
   //   it("Should be able to delete order record from the table", async () => {
   //      assert.equal("Successfully deleted order record", await orderInstance.remove(2));
   //      assert.equal(true, await orderInstance.readById(2) === undefined);
   //   });
  
  
     after(() => {
        pool.end();
     })

});