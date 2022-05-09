const express = require('express');
const router = express.Router();

// const { Pool, Client } = require('pg');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
   useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_db';

const pool = new Pool({
   connectionString,
   ssl: useSSL
});


const PatientInstance = require("../functions/patientFactory");
const patientInstance = PatientInstance(pool);

const DrugInstance = require("../functions/drugFactory");
const drugInstance = DrugInstance(pool);

const PrescriptionInstance = require("../functions/prescriptionFactory");
const prescriptionInstance = PrescriptionInstance(pool);

const OrderInstance = require("../functions/orderFactory");
const orderInstance = OrderInstance(pool);

const FacilityInstance = require("../functions/facilityFactory");
const facilityInstance = FacilityInstance(pool);

const UnitInstance = require("../functions/unitFactory");
const unitInstance = UnitInstance(pool);

const Pharmacist = require("../functions/pharmacistFactory");
const pharmacistInstance = Pharmacist(pool);


// router.get("/", async function (req, res) {
//    const patients = await patientInstance.readAll();
//    const drugs = await drugInstance.readAll();
//    const prescriptions = await prescriptionInstance.readAll();
//    const pharmacists = await pharmacistInstance.readAll();

//    res.render("home-home", { drugs, patients, prescriptions, pharmacists });
// });

router.get("/add-prescription", async function (req, res) {
  
   res.redirect('/facility');
});

// router.post("/add-prescription", async function (req, res) {
//    console.log("POSTING PRESCRIPTION");
//    // const { name, drug, dosage } = req.body;
//    // const first = name.split(' ')[0];
//    // const last = name.split(' ')[1];
//    // const patient_id = await patientInstance.getId(first, last);
//    // const drug_id = await drugInstance.getId(drug);
//    // const prescription = { patient_id, drug_id };

//    // const prescriptions = await prescriptionInstance.readAll();
//    // const orders = await orderInstance.readAll();

//    // prescriptionInstance.create(prescription);
//    // const today = Date();
//    // console.log("Today: ", today);

//    // for (const item of prescriptions) {
//    //    const orderPrescripts = orders.filter(order => order.prescript_id === item.id);
//    //    if (orderPrescripts.length === 0) {
//    //       orderInstance.create(item.id, '10-Feb-22', '100');
//    //    }
//    // }


//    res.redirect('/facility');
// });


// router.get("/update-prescription/:id", async function (req, res) {
//    const prescript = await prescriptionInstance.readById(req.params.id);
//    res.render('updatePrescript', { prescript });
// });

// router.post("/update-prescription/:id", async function (req, res) {
//    await prescriptionInstance.update(req.params.id, req.body.dosage);
//    res.redirect('/');
// });

// router.get("/delete-prescription/:id", async function (req, res) {
//    await prescriptionInstance.remove(req.params.id);
//    res.redirect('/');
// });

// router.get('/orders', async (req, res) => {
//    let orders = await orderInstance.allPrescripts();
//    console.log("Orders: ", orders);
//    //let buttonStatus = createPizza.getButtonStatus();
//    let buttonStatus = 'Fulfill order';

//    res.render('orders', {
//       orders,
//       buttonStatus,

//    });
// });

// router.get("/update-order/:id", async function (req, res) {
//    await orderInstance.update(req.params.id, "Fullfilled");
//    res.redirect('orders');
// });


router.get("/", async function (req, res) {
   // const facilities = await facilityInstance.readAll();
   res.render("home");
});

// router.get("/test", async function (req, res) {
//    const facilities = await facilityInstance.readAll();
//    res.render("test", { facilities });
// });

// router.get("/facility", async function (req, res) {
//    const patients = await patientInstance.readAll();
//    const drugs = await drugInstance.readAll();
//    const prescriptions = await prescriptionInstance.readAll();

//    res.render("facility", { drugs, patients, prescriptions });
// });

// router.get("/facility/:id", async function (req, res) {
//    const patients = await patientInstance.readAll();
//    const drugs = await drugInstance.readAll();
//    const prescriptions = await prescriptionInstance.readAll();

//    res.render("facility", { drugs, patients, prescriptions });
// });

// router.get("/pharmacist", async function (req, res) {
//    const patients = await patientInstance.readAll();
//    const drugs = await drugInstance.readAll();
//    const prescriptions = await prescriptionInstance.readAll();

//    res.render("pharmacist", { drugs, patients, prescriptions });
// });

// router.get("/pharmacist/:id", async function (req, res) {
//    console.log("ID: ", req.params.id);
   
//    const pharmacist = await pharmacistInstance.readById(req.params.id)
//    console.log(pharmacist);

//    res.render("pharmacist");
// });



module.exports = router;
