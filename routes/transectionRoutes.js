const express = require('express');
const {
    addTransection,
    getAllTransection,
    deleteTransection,
    editTransection, } = require('../controllers/transectionCtrl');

//route object
const router = express.Router();

//routes
//add transection 
router.post('/add-transection', addTransection);
//edit transection 
router.post('/edit-transection', editTransection);

//de;lete transection 
router.post('/delete-transection', deleteTransection);


//get transection
router.post('/get-transection', getAllTransection);

module.exports = router;