/**
==============================================
; Title: Assignment 5.2 - Person API 
; Author: Chad ONeal
; Date: 11/14/2022
; Description: oneal-person.js
==============================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  text: { type: String, required: true },
});

const dependantSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roles: { type: Array, roleSchema, required: true },
  dependents: { type: Array, dependantSchema, required: true },
  birthDate: { type: String, required: true },
});

module.exports = mongoose.model("Person", personSchema);