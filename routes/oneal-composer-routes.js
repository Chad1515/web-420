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
});

/**
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     name: findComposerById
 *     description: Reads,retrieves a composers by id.
 *     summary: Returns a composer by id.
 *     operationId: findComposerById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the composers collection by.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returned a composer with corresponding Id
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */ router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({_id: req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
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
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding new composer objects
 *     summary: Creates new composer object
 *     requestBody:
 *      description: Composer's information
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/composers', async (req, res) => {
	try {
		const newComposer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		};

		await Composer.create(newComposer, function (err, composer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composer);
				res.json(composer);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e.message}`,
		});
	}
});

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     description: Update a composer's first name and last name
 *     summary: update a composer by id
 *     operationId: updateComposerById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.put('updateComposerByID', async (req, res) => {
    try {
      const id = req.params.id;
      Composer.findOne({ _id: id }, function (err, composer) {
        if (composer) {
          composer.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });
          composer.save(function (err, savedComposer) {
            if (err) {
              res.status(501).send({
                message: `MongoDB Exception:${err}`,
              });
            } else {
              res.json(savedComposer);
            }
          });
        } else if (!composer) {
          res.status(401).send({
            message: `Invalid composerID ${err}`,
          });
        } else {
          res.status(501).send({ message: `MongoDB Exception: ${err}` });
        }
      });
    } catch (e) {
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });
  
/**
   * deleteComposerById
   * @openapi
   * /api/composers/{id}:
   *   delete:
   *     tags:
   *       - Composers
   *     description: Deletes a composer document
   *     summary: Finds a composer by Id and deletes this composer document
   *     operationId: deleteComposerById
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         scheme:
   *           type: string
   *     responses:
   *       '200':
   *         description: Composer document
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */
  router.delete('/composers/:id', async (req, res) => {
    try {
      const id = req.params.id;
      Composer.findByIdAndDelete({ _id: id }, function (err, composer) {
        if (composer) {
          // res.json(composer);
          res.status(200).send({
            message: `Deleted: ${composer}`,
          });
        } else {
          res.status(501).send({
            message: `MongoDB Exception ${err}`,
          });
        }
      });
    } catch (e) {
      res.status(500).send({
        message: `Server Exception: ${e}`,
      });
    }
  });

module.exports = router;