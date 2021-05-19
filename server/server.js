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
  // Provide a signing key based on the key identifier in the header and 
  // the signing keys provided by your Auth0 JWKS endpoint.
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


/* USER PUT METHODS */

/* Insert new user into database (mini profile version). 
   For debugging purposes. 
   Returns JSON object put into the database. */
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


/* Insert new user into database (full profile version).
   Returns JSON object put into the database. */
app.put("/add_full_user", (req, res) => { 
  var data = {
      // profile table
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      advisor_id: req.body.advisor_id,
      incoming_year: req.body.incoming_year,
      grad_year: req.body.grad_year,
      is_undergrad: req.body.is_undergrad,
      is_grad: req.body.is_grad,
      is_alum: req.body.is_alum,
      is_transfer: req.body.is_transfer,
      pronouns: req.body.pronouns,

      // user_topics table
      topic_ids: req.body.topic_ids,

      // student_to_faculty table
      division_ids: req.body.division_ids,
      faculty_names: req.body.faculty_names,

      // house_memberships table
      houses: req.body.houses,
      is_fulls: req.body.is_fulls,

      // user_option table
      options: req.body.options,
      is_majors: req.body.is_majors,

      // student_course table
      course_ids: req.body.course_ids
  }

  // profile
  var user_id;
  var sql_profile ='INSERT INTO profile (first_name, last_name, advisor_id, \
    incoming_year, grad_year, is_undergrad, is_grad, is_alum, \
    is_transfer, pronouns) VALUES (?,?,?,?,?,?,?,?,?,?)'
  
  var params =[data.first_name, data.last_name, data.advisor_id,
    data.incoming_year, data.grad_year, data.is_undergrad, 
    data.is_grad, data.is_alum, data.is_transfer, data.pronouns]
  
  db.run(sql_profile, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      user_id = this.lastID;

      // topics
      console.log("Adding user topics.")
      var i;
      for (i = 0; i < data.topic_ids.length; i++){
        var topic_id = data.topic_ids[i];
        console.log(topic_id)
        var sql_topics ='INSERT INTO user_topics VALUES (?,?)'
        var params_topics =[user_id, topic_id]

        db.run(sql_topics, params_topics, function (err, result) {
          if (err){
              console.log("error in sql function" + err)
              res.status(400).json({"error": err.message})
              return;
          }
        })
      }

      // faculty connections
      console.log("Adding user faculty connections.")
      var i;
      for (i = 0; i < data.faculty_names.length; i++){
        var division_id = data.division_ids[i];
        var faculty_name = data.faculty_names[i];
        var sql_faculty ='INSERT INTO student_to_faculty VALUES (?,?,?)'
        var params_faculty =[user_id, division_id, faculty_name]

        db.run(sql_faculty, params_faculty, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
        })
      }

      // house memberships
      console.log("Adding user houses.")
      var i;
      for (i = 0; i < data.houses.length; i++){
        var house = data.houses[i];
        var is_full = data.is_fulls[i];
        var sql_houses ='INSERT INTO house_memberships VALUES (?,?,?)'
        var params_houses =[house, user_id, is_full]

        db.run(sql_houses, params_houses, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
        })
      }

    
      // options
      console.log("Adding user options")
      var i;
      for (i = 0; i < data.options.length; i++){
        var option = data.options[i];
        var is_major = data.is_majors[i];
        var sql_options ='INSERT INTO user_option VALUES (?,?,?)'
        var params_options =[user_id, option, is_major]

        db.run(sql_options, params_options, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
        })
      }

      // courses
      console.log("Adding user courses")
      var i;
      let unique_course_ids = [...new Set(data.course_ids)];
      //console.log("unique course ids")
      //console.log(unique_course_ids)
      for (i = 0; i < unique_course_ids.length; i++){
        var course_id = unique_course_ids[i];
        var sql_courses ='INSERT INTO student_course VALUES (?,?)'
        var params_courses =[course_id, user_id]

        db.run(sql_courses, params_courses, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
        })
      }

  });
  
  res.json({
    "message": "Added new user.",
    "data": data
  })

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


/* Add labs for an existing user. 
   Accepts a list of lab_id's to be added for user_id in the
   url parameters. */
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


/* Add user option(s) for existing user.
   Users can add multiple options at a time.
   Accepts a list of option's and their respective
   is_major values in separate lists. Note, options[i]
   corresponds to is_majors[i]. */
app.put("/add_user_options/:user_id", (req, res) => {
  var data = {
      user_id: req.params.user_id,
      options: req.body.options,
      is_majors: req.body.is_majors
  }

  var i;
  for (i = 0; i < data.options.length; i++){
    var option = data.options[i];
    var is_major = data.is_majors[i];
    var sql ='INSERT INTO user_option VALUES (?,?,?)'
    var params =[data.user_id, option, is_major]

    db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
    })
  }
  res.json({response: "Added option(s) for user."});
});


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


/* Add an answer to a question, given the answer and question_id.
   Does not deal with upvotes.
   
   Inserts into answer the new answer_body and answer_creator
   Inserts into qna question_id and the new answer_id
   */
app.put('/add_answer/:user_id/:question_id', (req, res) => {
  // answer table
  var sql_answer = "insert into answer(answer_body, answer_creator, is_anon) \
             values (?,?,?)"
  var params_answer = [req.body.answer_body, req.params.user_id, req.body.is_anon]
  db.all(sql_answer, params_answer, (err, rows_answer) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    
    // qna table
    var sql_qna = "insert into qna (answer_id, question_id) \
      values (?,?)"
    var params_qna = [this.lastID, req.params.question_id]
    db.all(sql_qna, params_qna, (err, rows_qna) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }

    console.log(rows_answer)
    console.log(rows_qna)
    res.send("Added new answer.")
    });
  });
});


/* Update upvote to an answer. 
   If user has upvoted, removes their upvote, otherwise adds their upvote. */
app.put('/update_answer_upvote/:answer_id/:user_id', (req, res) => {
  // Check if user has upvoted the answer.
  var sql_check = "select count(*) as count from user_upvotes_answer \
    where answer_id = ? and user_id = ?"
  var params_check = [req.params.answer_id, req.params.user_id]

  db.all(sql_check, params_check, (err, rows_check) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    
    var sql1;
    var sql2;
    if (rows_check[0].count == 1){
      // for user_votes_answer table
      sql1 = "delete from user_upvotes_answer where answer_id = ? and user_id = ?"
      // for answer table
      sql2 = "update answer set answer_upvotes = answer_upvotes - 1 \
        where answer_id = ?";
    }
    else {
      // for user_votes_answer table
      var sql1 = "insert into user_upvotes_answer(answer_id, user_id) values (?, ?)"
      // for answer table
      var sql2 = "update answer set answer_upvotes = answer_upvotes + 1 \
        where answer_id = ?";
    }

    // run db commands
    var params1 = [req.params.answer_id, req.params.user_id]
    var params2 = [req.params.answer_id];

    // update user_votes_answer table
    db.all(sql1, params1, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      // update answer table
      db.all(sql2, params2, (err, rows2) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send("Updated answer upvote count.")
      });
    }); 
  });
});


/* Update upvote to a question. 
   If user has upvoted, removes their upvote, otherwise adds their upvote. */
app.put('/update_question_upvote/:question_id/:user_id', (req, res) => {
  // Check if user has upvoted the question.
  var sql_check = "select count(*) as count from user_upvotes_question \
    where question_id = ? and user_id = ?"
  var params_check = [req.params.question_id, req.params.user_id]

  db.all(sql_check, params_check, (err, rows_check) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    
    var sql1;
    var sql2;
    if (rows_check[0].count == 1){
      // for user_votes_question table
      sql1 = "delete from user_upvotes_question where question_id = ? and user_id = ?"
      // for question table
      sql2 = "update question set question_upvotes = question_upvotes - 1 \
        where question_id = ?";
    }
    else {
      // for user_votes_question table
      var sql1 = "insert into user_upvotes_question(question_id, user_id) values (?, ?)"
      // for question table
      var sql2 = "update question set question_upvotes = question_upvotes + 1 \
        where question_id = ?";
    }

    // run db commands
    var params1 = [req.params.question_id, req.params.user_id]
    var params2 = [req.params.question_id];

    // update user_votes_question table
    db.all(sql1, params1, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      // update question table
      db.all(sql2, params2, (err, rows2) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send("Updated question upvote count.")
      });
    }); 
  });
});



/* Update a question. Can modify the question_body, is_anon, date_modified.
*/
app.put('/update_question/:user_id/:question_id', (req, res) => {
  // Check if user_id created the question.
  var sql_check = "select count(*) as count from question \
    where question_creator = ? and question_id = ?"
  var params_check = [req.params.user_id, req.params.question_id]

  db.all(sql_check, params_check, (err, rows_check) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    else if (rows_check[0].count == 0){
      console.log("correct if")
      res.status(400).json({"error":"You are not the creator of this question."});
      return;
    }
    else if (rows_check[0].count == 1){
      console.log("wrong if")
      var sql = "update question set question_body = ?, \
        is_anon = ?, date_modified = ? \
        where question_id = ?";
      var params = [req.body.question_body, req.body.is_anon, req.body.date_modified, req.params.question_id]

      db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
        res.send({
          "msg" : "Question updated."
        })
      });
    }
  });
});


/* Update an answer. Can modify the answer_body, is_anon, date_modified.
*/
app.put('/update_answer/:user_id/:answer_id', (req, res) => {
  // Check if user_id created the answer.
  var sql_check = "select count(*) as count from answer \
    where answer_creator = ? and answer_id = ?"
  var params_check = [req.params.user_id, req.params.answer_id]

  db.all(sql_check, params_check, (err, rows_check) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    else if (rows_check[0].count == 0){
      res.status(400).json({"error":"You are not the creator of this answer."});
      return;
    }
    else if (rows_check[0].count == 1){
      var sql = "update answer set answer_body = ?, \
        is_anon = ?, date_modified = ? \
        where answer_id = ?";
      var params = [req.body.answer_body, req.body.is_anon, req.body.date_modified, req.params.answer_id]

      db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
        res.send({
          "msg" : "Answer updated."
        })
      });
    }
  });
});


/* Add a question. Accepts question_body, user_id, is_anon, date_created.
   Does not deal with upvotes.
   Inserts into question the new question_body and question_creator.
*/
app.put('/add_question/:user_id', (req, res) => {
  var sql = "insert into question(question_body, question_creator, is_anon, date_created) \
             values (?,?,?,?)"
  var params = [req.body.question_body, req.params.user_id, req.body.is_anon, req.body.date_created]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }   
    res.send({
      "data": rows,
      "last id": this.lastID
    })
  });
});


/* USER DELETE METHODS */

/* Delete user from database given the user_id.
   user_id should be passed in url parameters. 
   DISCLAIMER: cascading deletes still need to be figured out. Right now,
   only profile table is affected. */
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


/* Delete all users from the database.
   DISCLAIMER: cascading deletes still need to be figured out. Right now,
   only profile table is affected. */
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


/* Remove user courses.
   Can remove multiple courses at a time. 
   Accepts a list of lab_id's for the user_id in the url parameters. */
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


/* Remove certain topics for existing user. 
   Accepts a list of topic_id's to be deleted for user_id in
   the url parameters. 
   Returns a success/failure message. */
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


/* Remove all topics for an existing user.
   Returns a success/failure message. */
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


/* Remove user option.
   Can remove multiple options at a time. */
app.delete("/delete_user_options/:user_id", (req, res) => {
var data = {
    user_id: req.params.user_id,
    options: req.body.options,
    is_majors: req.body.is_majors
}

var i;
for (i = 0; i < data.options.length; i++){
  var option = data.options[i];
  var is_major = data.is_majors[i];
  var sql = 'DELETE FROM user_option WHERE user_id = ? AND option = ? AND is_major = ?'
  //var sql ='INSERT INTO user_option VALUES (?,?,?)'
  var params =[data.user_id, option, is_major]

  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
  })
}
res.json({response: "Deleted option(s) for user."});

});



/* USER GET METHODS */

/* Get topic interests for a user. Returns a list of topic_name's. */
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
        console.log(topic_names)
        res.send(topic_names)
      });
});


/* Get topics for all users (for debugging purposes). 
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
        console.log(rows)
        res.send(rows)
      });
});


/*
Get user courses. Returns a JSON list of course_dept, course_no, and course_name.
*/
app.get('/get_user_courses/:user_id', (req, res) => {
  var sql = "select * from student_course natural join \
    course natural join dept_course\
    where user_id = ?"
  var params = [req.params.user_id]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    
    //Convert rows into a list of courses. 
    var i;
    courses = [];
    for (i = 0; i < rows.length; i++){
      // Check if the course is cross-listed. If so,
      // combine the department titles.
      var cross_list_cnt = 0;
      cross_list_dept_name = rows[i].dept
      var j;
      for (j = i+1; j < rows.length - i; j++){
        if (rows[j].course_id == rows[i].course_id){
          cross_list_cnt++;
          cross_list_dept_name = cross_list_dept_name + "/" + rows[j].dept
        }
      }
      courses.push(cross_list_dept_name + " " + rows[i].course_no + ": " + rows[i].course_name)
      
      // Adjust index if there were cross-listings.
      if (cross_list_cnt > 0){
        i += cross_list_cnt
      }
    }
    // Return list of courses
    res.json(courses);

    //res.json(rows)
  })
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
        options.push(rows[i].option + " " + "Minor")
      }
      else{
        options.push(rows[i].option + " " + "Major")
      }
    }
    res.json(options);
  })
});


/* Get a list of question_ids upvoted by the user_id. */
app.get('/get_upvoted_questions/:user_id', (req, res) => {
  var sql = "select distinct question_id from user_upvotes_question \
    where user_id = ?"
    var params = [req.params.user_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        /* Convert rows into a list of question_ids. */
        var i;
        questions = [];
        for (i = 0; i < rows.length; i++){
          questions.push(rows[i].question_id)
        }
        res.send(questions);
      });
});


/* Return true if question_id is upvoted by user_id, false otherwise. */
app.get('/is_question_upvoted/:user_id/:question_id', (req, res) => {
  var sql = "select count(*) as count from user_upvotes_question \
    where user_id = ? and question_id = ?"
    var params = [req.params.user_id, req.params.question_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(Boolean(rows[0].count));
      })
});


/* Get a list of answer_ids upvoted by the user_id. */
app.get('/get_upvoted_answers/:user_id', (req, res) => {
  var sql = "select distinct answer_id from user_upvotes_answer \
    where user_id = ?"
    var params = [req.params.user_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        /* Convert rows into a list of answer_ids. */
        var i;
        answers = [];
        for (i = 0; i < rows.length; i++){
          answers.push(rows[i].answer_id)
        }
        res.send(answers);
        });
});

/* Return true if answer_id is upvoted by user_id, false otherwise. */
app.get('/is_answer_upvoted/:user_id/:answer_id', (req, res) => {
  var sql = "select count(*) as count from user_upvotes_answer \
    where user_id = ? and answer_id = ?"
    var params = [req.params.user_id, req.params.answer_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(Boolean(rows[0].count));
      })
});


/* DATABASE-GENERAL PUT METHODS */

/* Add a lab (one at a time). 
   Returns a JSON object of data that was inserted. */
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
      "message": "Added new lab.",
      "data": data,
      "id" : this.lastID
    })
  })
});


/* DATABASE-GENERAL DELETE METHODS */

/* Remove a lab (one at a time). 
   lab_id should be in the url_params. */
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


/* Delete a question.
*/
app.delete('/delete_question/:user_id/:question_id', (req, res) => {
  // Check if user_id created the question.
  var sql_check = "select count(*) as count from question \
    where question_creator = ? and question_id = ?"
  var params_check = [req.params.user_id, req.params.question_id]

  db.all(sql_check, params_check, (err, rows_check) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    else if (rows_check[0].count == 0){
      res.status(400).json({"error":"You are not the creator of this question."});
      return;
    }
    else if (rows_check[0].count == 1){
      // Delete from qna
      var sql_qna = "delete from qna where question_id = ?"
      var params = [req.params.question_id]

      // Delete from user_upvotes_question
      var sql_upvotes = "delete from user_upvotes_question \
        where question_id = ?"
      
      // Delete from question
      var sql_question = "delete from question \
        where question_id = ?"


      db.all(sql_qna, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
      });

      db.all(sql_upvotes, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
      });

      db.all(sql_question, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
      });

      res.send({
        "msg" : "Question deleted."
      })
    }
  });
});


/* Delete an answer.
*/
app.delete('/delete_answer/:user_id/:answer_id', (req, res) => {
  // Check if user_id created the answer .
  var sql_check = "select count(*) as count from answer \
    where answer_creator = ? and answer_id = ?"
  var params_check = [req.params.user_id, req.params.answer_id]

  db.all(sql_check, params_check, (err, rows_check) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    else if (rows_check[0].count == 0){
      res.status(400).json({"error":"You are not the creator of this answer."});
      return;
    }
    else if (rows_check[0].count == 1){
      // Delete from qna
      var sql_qna = "delete from qna where answer_id = ?"
      var params = [req.params.answer_id]

      // Delete from user_upvotes_answer
      var sql_upvotes = "delete from user_upvotes_answer \
        where answer_id = ?"
      
      // Delete from answer
      var sql_answer = "delete from answer \
        where answer_id = ?"


      db.all(sql_qna, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
      });

      db.all(sql_upvotes, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
      });

      db.all(sql_answer, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }   
      });

      res.send({
        "msg" : "Answer deleted."
      })
    }
  });
});




/* DATABASE-GENERAL GET METHODS */

/* Get all users in the database. Returns profile information
   (excludes topic interests, labs, houses, courses) as a
   JSON object. */
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


/* Get all topics.
   Returns list of JSON objects each having topic_id and topic_name. */
app.get('/get_all_topics', (req, res) => {
  var sql = "select * from topic"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Get all labs.
   Returns list of JSON objects each having lab_id, lab name, and lab pi. */
app.get('/get_all_labs', (req, res) => {
  var sql = "select * from labs"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Get all faculty.
   Returns list of JSON objects each having division_id, division_name 
   and faculty_name. */
   app.get('/get_all_faculty', (req, res) => {
    var sql = "select * from faculty natural join division"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.send(rows)
    });
  });


/* Get all faculty by division_id.
  Returns list of JSON objects each having division_id, division_name 
  and faculty_name. */
app.get('/get_faculty_by_division/:division_id', (req, res) => {
  var sql = "select * from faculty natural join division where division_id=?"
  var params = [req.params.division_id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});



/* Get all courses.
   Returns list of JSON objects each having course_id, course_no,
   course_name, and dept. */
app.get('/get_all_courses', (req, res) => {
  var sql = "select * from course natural join dept_course"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Get courses by department.
   Returns list of JSON objects each having course_id, course_no,
   course_name, and dept. */
app.get('/get_courses_by_dept/:dept', (req, res) => {
  var sql = "select * from course natural join dept_course where dept = ?"
  var params = [req.params.dept]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Get all departments.
   Returns a list of department names. */
app.get('/get_all_departments', (req, res) => {
  var sql = "select distinct dept from dept_course"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }

    /* Convert rows into a list of departments. */
    var i;
    depts = [];
    for (i = 0; i < rows.length; i++){
      depts.push(rows[i].dept)
    }
    res.json(depts);
  });
});


/* Get full topic_tree.
   Returns list of JSON objects each having parent topic_id and 
   child topic_id. */
app.get('/get_topic_tree', (req, res) => {
  var sql = "select * from topic_tree"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Get root topics in the topic tree.
   Returns a list of JSON objects each having topic_id and topic_name.
*/
app.get('/get_topic_tree_root', (req, res) => {
  
  var sql = "select * from topic natural join \
  (select distinct parent as topic_id \
    from topic_tree where parent not in (select child from topic_tree))"

  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/*
Get topic_id and topic_name under a given parent topic_id.
Returns list of JSON objects each having topic_id and topic_name.
parent topic_id should be in the uri params.
*/
app.get('/get_topic_subtree/:parent', (req, res) => {
  var sql = "select * from topic natural join \
  (select child AS topic_id from topic_tree where parent = ?)"
  var params = [req.params.parent]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Given a question_id, return its question_body, date_modified, and upvote count" */
app.get('/get_question/:question_id', (req, res) => {
  var sql = "select * from question \
    cross join profile \
    where question.question_creator = profile.user_id and question_id = ?";

  var params = [req.params.question_id]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Given a question_id, returns list of associated 
   answer_body, date_modified, and upvote count" */
app.get('/get_question_answers/:question_id', (req, res) => {
  var sql = "select answer_id, answer_body, \
              user_id, first_name, last_name, is_anon, \
              date_modified, date_created, answer_upvotes \
              from answer natural join qna \
              inner join profile on answer.answer_creator = profile.user_id \
              where question_id = ?"
  var params = [req.params.question_id]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Get all questions. */
app.get('/get_all_questions', (req, res) => {
  var sql = "select * \
              from question \
              inner join profile on question.question_creator = profile.user_id \
              order by question_id DESC"
    var params = []
    
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(rows)
        res.send(rows)
    });
});


/* Get num_questions number of questions sorted by descending date modified.
   num_questions should be in uri parameters. */
app.get('/get_recent_questions/:num_questions', (req, res) => {
  var sql = "select * \
              from question \
              inner join profile on question.question_creator = profile.user_id \
              order by question_id DESC limit ?"
    var params = [req.params.num_questions]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(rows)
        res.send(rows)
      });
});


/* Gets all questions, given a topic_id. TBD */
app.get('/get_all_questions_by_topic/:topic_id', (req, res) => {
  var sql = "select * \
              from question \
              inner join profile on question.question_creator = profile.user_id \
              natural join question_topic where topic_id = ? \
              order by question_id DESC"
    var params = [req.params.topic_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(rows)
        res.send(rows)
      });
});


/* METHODS FOR DEBUGGING */
// PLAIN - get all question table (for debugging)
app.get('/get_question_table', (req, res) => {
  //var sql = "select * from question left join qna on question.question_id = qna.question_id"
  var sql = "select * from question natural left outer join qna"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(rows)
        res.send(rows)
      });
});

/* Get all answers (for debugging). */
app.get('/get_all_answers', (req, res) => {
  var sql = "select distinct * \
  from question natural left outer join qna "


  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send(rows)
  });
});


/* Check if user has upvoted question_id already (for debugging).
   Returns a list containing true (boolean) if there is an upvote, false otherwise. */
app.get('/user_upvoted_question/:question_id/:user_id', (req, res) => {
  var sql = "select count(*) as count from user_upvotes_question \
    where question_id = ? and user_id = ?"
  var params = [req.params.question_id, req.params.user_id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send([rows[0].count == 1])
  });
});
  
  
/* Check if user has upvoted answer_id already (for debugging). */
app.get('/user_upvoted_answer/:answer_id/:user_id', (req, res) => {
  var sql = "select count(*) as count from user_upvotes_answer \
    where answer_id = ? and user_id = ?"
  var params = [req.params.answer_id, req.params.user_id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.send([rows[0].count == 1])
  });
});


/* Get all faculty_to_student information. */
app.get('/get_all_student_to_faculty', (req, res) => {
  var sql = "select * from student_to_faculty\
             natural join division"
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
