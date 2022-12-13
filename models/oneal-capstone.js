/**
==============================================
; Title: Assignment 9.2 - Capstone 
; Author: Chad ONeal
; Date: 12/12/2022
; Description: oneal-capstone.js
==============================================
*/

// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// playerSchema
const playerSchema = new Schema({
  firstName: { type: String,},
  lastName: { type: String,},
  salary: { type: Number,},
});

// teamSchema
const teamSchema = new Schema({
  name: { type: String,},
  mascot: { type: String,},
  players: [playerSchema],
});

module.exports = mongoose.model("Team", teamSchema);