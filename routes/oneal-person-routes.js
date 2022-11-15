/**
==============================================
; Title: Assignment 5.2 - Person API 
; Author: Chad ONeal
; Date: 11/14/2022
; Description: oneal-person.js
==============================================
*/

const express = require("express");
const Person = require("../models/oneal-person.js");
const router = express.Router();

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an array of person objects.
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: array of persons.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
 router.get('/persons', async(req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     description: Creates new person object
 *     summary: returns an array of persons in JSON format. 
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 description: first name
 *                 type: string
 *               lastName:
 *                 description: last name
 *                 type: string
 *               roles:
 *                 description: Roles
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 description: Array of dependantSchema
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 description: Birth date
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/persons', async(req, res) => {
  try {
      const newPerson = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          roles: req.body.roles,
          dependents: req.body.dependents,
          birthDate: req.body.birthDate
      };

      await Person.create(newPerson, function(err, person) {
          if (err) {
              console.log(err);
              res.status(501).send({
                  'message': `MongoDB Exception: ${err}`
              })
          } else {
              console.log(person);
              res.json(person);
          }
      })
  } catch (e) {
      console.log(e);
      res.status(500).send({
          'message': `Server Exception: ${e.message}`
      })
  }
})

module.exports = router;

