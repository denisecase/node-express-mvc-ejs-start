/**
*  user controller 
*  Handles requests related to users (see routes)
*
* @author Vikas Baswapuram <s538336@nwmissouri.edu>
*
*/
const express=require('express')
const app = express();
const api=express.Router()
const Model=require('../models/user.js')

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default) - list all
app.get('/', (req, res, next) => {
    const sql = 'select * from user'
    const params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ 'error': err.message });
        return;
      }
      res.json({
        'message': 'success',
        'data': rows
      })
    });
  });

  // GET create (same as register)

  
  // HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

  // POST new
  app.post('/save', (req, res, next) => {
    const errors = []
    if (!req.body.password) {
      errors.push('No password specified');
    }
    if (!req.body.email) {
      errors.push('No email specified');
    }
    if (errors.length) {
      res.status(400).json({ 'error': errors.join(',') });
      return;
    }
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password)
    }
    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    const params = [data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ 'error': err.message })
        return;
      }
      res.json({
        'message': 'success',
        'data': data,
        'id': this.lastID
      })
    });
  })
  
  // POST update with id
  
  app.patch('/save/:id', (req, res, next) => {
    var data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
      `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
      [data.name, data.email, data.password, req.params.id],
      (err, result) => {
        if (err) {
          res.status(400).json({ 'error': res.message })
          return;
        }
        res.json({
          message: 'success',
          data: data
        })
      });
  })
  
  // DELETE by id
  app.delete('/:id', (req, res, next) => {
    db.run(
      'DELETE FROM user WHERE id = ?',
      req.params.id,
      function (err, result) {
        if (err) {
          res.status(400).json({ 'error': res.message })
          return;
        }
        res.json({ 'message': 'deleted', rows: this.changes })
      });
  })
  