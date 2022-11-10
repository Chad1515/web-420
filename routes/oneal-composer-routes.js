/**
==============================================
; Title: Assignment 4.2 Composer API
; Author: Chad ONeal
; Date: 11/10/2022
; Description: oneal-composer-routes
==============================================
*/

const express = require('express')
const router = express.Router()
const Composer = require('../models/oneal-composer')


/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
 router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/** findAllComposersByID
*@openapi
* /composers/{id}:
*   get:
*   summary: Returns a composer by ID
*   description: |
*          Returns composers first and last name by ID
*   parameters:
*    - name: id
*      in: path
*      schema:
*        type: string
*      required: true
* responses:
*   '200':    # status code
*      description: A JSON array of composers names          
*   '500':    # status code
*      description: Server exceptions   
*   '501':    # status code
*      description: MongoDB exceptions*/

router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exeception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/**createComposer
* @openapi
*  /composers:
*     post:
*      summary: Creates new composer.
*      description: |
*        Creates and adds new composer to the catalog.
*      responses:
*        '200':    # status code
*          description: A JSON array for new composer.
*        '500':    # status code
*          description: Server exceptions
*        '501':    # status code
*          description: MongoDB exceptions*/

router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.type,
            lastName: req.body.type
        }

        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exeception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
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