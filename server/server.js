// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
var db = require("./database.js");

const Promise = require('bluebird')

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-spf1izht.us.auth0.com",
  audience: "https://quandary-api"
};

// Create middleware to validate the JWT using express-jwt
const checkJwt = jwt({
  // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"]
  });


/* Quandary REST API */



/* Insert new user into database. */
app.put("/add_user", (req, res) => { 
  var data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      advisor_id: req.body.advisor_id,
      incoming_year: req.body.incoming_year,
      grad_year: req.body.grad_year,
      is_undergrad: req.body.is_undergrad,
      is_grad: req.body.is_grad,
      is_alum: req.body.is_alum,
      is_transfer: req.body.is_transfer,
      pronouns: req.body.pronouns
  }
  var sql ='INSERT INTO profile (first_name, last_name, advisor_id, \
    incoming_year, grad_year, is_undergrad, is_grad, is_alum, \
    is_transfer, pronouns) VALUES (?,?,?,?,?,?,?,?,?,?)'
  
  var params =[data.first_name, data.last_name, data.advisor_id,
    data.incoming_year, data.grad_year, data.is_undergrad, 
    data.is_grad, data.is_alum, data.is_transfer, data.pronouns]
  
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "Added new user.",
          "data": data,
          "id" : this.lastID
      })
  });
})


/* Delete user from database given the user_id.
   user_id should be passed in the body of the request. */
app.delete("/delete_user/:user_id", (req, res) => {
  var sql = 'DELETE FROM profile WHERE user_id = ?'
  var params = [req.params.user_id]
  
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "Deleted a user.",
      })
  });
})


/* Delete all users from the database. */
app.delete("/delete_all_users", (req, res) => {
  var errors=[] 
  var sql = 'DELETE FROM profile'
  var params = []
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "Deleted all users.",
      })
  });
})


/* Add topics for new user given user_id and list of topic_id's.
  topic_ids should be a comma-separated list. */
app.put("/add_user_topics", (req, res) => {
  var data = {
      user_id: req.body.user_id,
      topic_ids: req.body.topic_ids
  }
  var i;
  for (i = 0; i < data.topic_ids.length; i++){
    var topic_id = data.topic_ids[i];
    var sql ='INSERT INTO user_topics VALUES (?,?)'
    var params =[data.user_id, topic_id]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
});


/* Get topics for a user. Returns a list of topic_name's. */
app.get('/get_user_topics/:user_id', (req, res) => {
  var sql = "select topic_name, topic_id from user_topics natural join topic \
  where user_id = ?"
    var params = [req.params.user_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        // Create a list of topic names.
        var i;
        var topic_names = []
        for (i = 0; i < rows.length; i++){
          topic_names.push(rows[i].topic_name)
        }
        res.send(topic_names)
      });
});


/* Get topics for all users for debugging purposes. 
   Returns a list of json objects each having user_id, topic_id, 
   and topic_name. */
app.get('/get_all_user_topics', (req, res) => {
  var sql = "select * from user_topics natural join topic"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(rows)
      });
});


/* Add topics for an existing user. */
app.put("/add_user_topics/:user_id", (req, res) => {
  var data = {
      user_id: req.params.user_id,
      topic_ids: req.body.topic_ids
  }

  var i;
  for (i = 0; i < data.topic_ids.length; i++){
    var topic_id = data.topic_ids[i];
    var sql ='INSERT INTO user_topics VALUES (?,?)'
    var params =[data.user_id, topic_id]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
  res.json({response: "Added topics for user."});
});


/* Remove certain topics for existing user. */
app.delete("/delete_user_topics/:user_id", (req, res) => {
  var data = {
      user_id: req.params.user_id,
      topic_ids: req.body.topic_ids
  }
  var i;
  for (i = 0; i < data.topic_ids.length; i++){
    var topic_id = data.topic_ids[i];
    var sql ='DELETE FROM user_topics WHERE user_id = ? AND topic_id = ?'
    var params =[data.user_id, topic_id]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
  res.json({response: "Deleted some topics for user."});
});


/* Remove all topics for an existing user. */
app.delete("/delete_all_user_topics/:user_id", (req, res) => {
  var sql ='DELETE FROM user_topics WHERE user_id = ?'
  var params =[req.params.user_id]
  
  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
  })
  res.json({response: "Deleted all topics for user."});
});


/* Add a lab. */
app.put("/add_lab", (req, res) => {
  var data = {
      name: req.body.name,
      pi: req.body.pi
  }
  var sql ='INSERT INTO labs (name, pi) VALUES (?,?)'
  var params =[data.name, data.pi]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
      "message": "Added new user.",
      "data": data,
      "id" : this.lastID
    })
  })
});


/* Remove a lab. */
app.delete("/remove_lab/:lab_id", (req, res) => {
  var sql ='DELETE FROM labs WHERE lab_id = ?'
  var params =[req.params.lab_id]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
      "message": "Deleted a lab.",
    })
  })
});


/* Add labs for an existing user. */
// lab name + pi should uniquely identify a lab.
// or, will we know the lab id? you can store a value?
// Assuming we will know the lab id.
app.put("/add_user_labs/:user_id", (req, res) => {
  var data = {
      user_id: req.params.user_id,
      lab_ids: req.body.lab_ids
  }

  var i;
  for (i = 0; i < data.lab_ids.length; i++){
    var lab_id = data.lab_ids[i];
    var sql ='INSERT INTO student_to_lab VALUES (?,?)'
    var params =[data.user_id, lab_id]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
  res.json({response: "Added labs for user."});
});


/* Remove certain labs for an existing user. 
   Assumes that the lab_id's will be given. */
app.delete("/delete_user_labs/:user_id", (req, res) => {
  var data = {
      user_id: req.params.user_id,
      lab_ids: req.body.lab_ids
  }

  var i;
  for (i = 0; i < data.lab_ids.length; i++){
    var lab_id = data.lab_ids[i];
    var sql ='DELETE FROM student_to_lab WHERE user_id = ? AND lab_id = ?'
    var params =[data.user_id, lab_id]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
  res.json({response: "Added labs for user."});
});


/* Add user house membership.
   Adds single house membership at a time. */
app.put("/add_user_house/:user_id", (req, res) => {
  var data = {
    house: req.body.house,
    user_id: req.params.user_id,
    is_full: req.body.is_full
  }
  var sql ='INSERT INTO house_memberships VALUES (?,?,?)'
  var params =[data.house, data.user_id, data.is_full]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
      "message": "Added new user house membership.",
      "data": data
    })
  })
});


/* Update user house membership.
   Updates a single house membershipt at a time. */
app.put("/update_user_house/:user_id", (req, res) => {
  var data = {
    house: req.body.house,
    user_id: req.params.user_id,
    is_full: req.body.is_full
  }
  var sql ='UPDATE house_memberships SET is_full = ? \
  WHERE user_id = ? AND house = ?'
  var params =[data.is_full, data.user_id, data.house]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
      "message": "Updated a user house membership.",
      "data": data
    })
  })
});


/* Removes a user house membership.
   Removes a single membership at a time. */
app.delete("/delete_user_house/:user_id", (req, res) => {
  var data = {
    house: req.body.house,
    user_id: req.params.user_id
  }
  var sql ='DELETE FROM house_memberships WHERE user_id = ? AND house = ?'
  var params =[data.user_id, data.house]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
      "message": "Deleted a user house membership.",
      "data": data
    })
  })
});


/* Add user option(s) for existing user.
   Users can add multiple options at a time. */
app.put("/add_user_options/:user_id", (req, res) => {
  var data = {
      user_id: req.params.user_id,
      option_ids: req.body.option_ids,
      is_majors: req.body.is_majors
  }

  var i;
  for (i = 0; i < data.option_ids.length; i++){
    var option_id = data.option_ids[i];
    var is_major = data.is_majors[i];
    var sql ='INSERT INTO user_option VALUES (?,?,?)'
    var params =[data.user_id, option_id, is_major]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
  res.json({response: "Added option(s) for user."});
});


/* Get all options for an existing user.
   Returns a list of options. */
app.get('/get_user_options/:user_id', (req, res) => {
  var sql = "select * from user_option where user_id = ?"
  //var sql = "select * from user_topics natural join topic"
  var params = [req.params.user_id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    
    /* Convert rows into a list of options. */
    var i;
    options = [];
    for (i = 0; i < rows.length; i++){
      if(rows[i].is_major == 0){
        options.push(rows[i].option_id + " " + "Minor")
      }
      else{
        options.push(rows[i].option_id + " " + "Major")
      }
    }
    res.json(options);
  })
});


/* Remove user option.
   Can remove multiple options at a time. */
app.delete("/delete_user_options/:user_id", (req, res) => {
var data = {
    user_id: req.params.user_id,
    option_ids: req.body.option_ids,
    is_majors: req.body.is_majors
}

var i;
for (i = 0; i < data.option_ids.length; i++){
  var option_id = data.option_ids[i];
  var is_major = data.is_majors[i];
  var sql = 'DELETE FROM user_option WHERE user_id = ? AND option_id = ? AND is_major = ?'
  //var sql ='INSERT INTO user_option VALUES (?,?,?)'
  var params =[data.user_id, option_id, is_major]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
  })
}
res.json({response: "Deleted option(s) for user."});

});


/* Add a course.
app.put("/add_course", (req, res) => {
  var data = {
      course_no: req.body.course_no,
      course_name: req.body.course_name
  }
  var sql ='INSERT INTO course (course_no, course_name) VALUES (?,?)'
  var params =[data.course_no, data.course_name]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
      "message": "Added new user.",
      "data": data,
      "id" : this.lastID
    })
  })
});
*/

/* Add user course(s) for existing user.
   Users can add multiple courses at a time. */
app.put("/add_user_courses/:user_id", (req, res) => {
var data = {
    user_id: req.params.user_id,
    course_ids: req.body.course_ids
}

var i;
for (i = 0; i < data.course_ids.length; i++){
  var course_id = data.course_ids[i];
  var sql ='INSERT INTO student_course VALUES (?,?)'
  var params =[course_id, data.user_id]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
  })
}
res.json({response: "Added course(s) for user."});
});



/*
Get user courses. Returns a list of courses.
*/
app.get('/get_user_courses/:user_id', (req, res) => {
  var sql = "select * from student_course inner join course on user_id = ?"
  var params = [req.params.user_id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    
    // Convert rows into a list of courses. 
    var i;
    courses = [];
    for (i = 0; i < rows.length; i++){
      courses.push(rows[i].course_name)
    }
    res.json(courses);
    //res.json(rows)
  })
});


/* Remove user course
   Can remove multiple courses at a time. */
app.delete("/delete_user_courses/:user_id", (req, res) => {
var data = {
    user_id: req.params.user_id,
    course_ids: req.body.course_ids
}

var i;
var num_courses = data.course_ids.length
for (i = 0; i < num_courses; i++){
  var course_id = data.course_ids[i];
  var sql = 'DELETE FROM student_course WHERE user_id = ? AND course_id = ?'
  var params =[data.user_id, course_id]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
  })
}
res.json({response: `Deleted ${num_courses} course(s) for user.`});

});


/* Add instructor */


/* Remove instructor */






/* Update user in database given their user_id.
   user_id should be given in the body of the request. */




/* Get all users in the database. Returns profile information
   (exclusing topic interests). */
app.get('/get_all_users', (req, res) => {
    var sql = "select * from profile"
      var params = []
      db.all(sql, params, (err, rows) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.send(rows)
        });
});



/* END Quandary REST API */


// For this app, we only want to protect the route that returns the details of an event
app.get('/quandary/:id', checkJwt, (req, res) => {
  var sql = "select * from quandary where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(row)
      });
});

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

// listen on the port
app.listen(port);
