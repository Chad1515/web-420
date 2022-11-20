/**
==============================================
; Title: Assignment 6.2 - NodeSecurity 
; Author: Chad ONeal
; Date: 11/20/2022
; Description: oneal-user.js for signup and login
==============================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{type:String},
    Password:{type:String},
    emailAddress:{type:Array}
})

module.exports = mongoose.model('User', userSchema)