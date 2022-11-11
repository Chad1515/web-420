/**
==============================================
; Title: Assignment 4.2 - Composer API 
; Author: Chad ONeal
; Date: 11/10/2022
; Description: oneal-composer.js
==============================================
*/

// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// composer Schema
let composerSchema = new Schema({
    firstName: { type: String},
    lastName: {type: String},
})

// exports data from app into the mongoDB database
module.exports = mongoose.model('Composer', composerSchema);