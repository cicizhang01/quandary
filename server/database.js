var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE quandary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            category text,
            description text,
            featuredImage text,
            image text,
            location text,
            data text,
            time text
          )`, // NOTE: list in col would require something like pickle
              // data and time don't have special datatypes

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert_old = `INSERT INTO quandary
                (name, category, description, featuredImage, image, location, data, time)
                VALUES (?,?,?,?,?,?,?,?)`
                db.run(insert_old,
                    ['Charity Ball',
                    'Fundraising',
                    'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
                    'https://placekitten.com/500/500',
                    'https://placekitten.com/500/500',
                    '1234 Fancy Ave',
                    '12-25-2019',
                    '11:30'
                  ])
                db.run(insert_old,
                    ['Rescue Center Goods Drive',
                    'Adoptions',
                    'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
                    'https://placekitten.com/500/500',
                    'https://placekitten.com/500/500',
                    '1234 Dog Alley',
                    '11-21-2019',
                    '12:00'
                  ])
            }
        });

        db.run(`CREATE TABLE course (
            course_id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_no INTEGER NOT NULL,
            course_name NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE dept_course (
            dept NOT NULL TEXT,
            course_id NOT NULL INTEGER,
            PRIMARY KEY(dept, course_id),
            FOREIGN KEY(course_id) REFERENCES course(course_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE instructor (
            instructor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE instructor_course (
            course_id INTEGER NOT NULL,
            instructor_id INTEGER NOT NULL,
            PRIMARY KEY(course_id, instructor_id),
            FOREIGN KEY(course_id) REFERENCES course(course_id),
            FOREIGN KEY(insructor_id) REFERENCES instructor(instructor_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE advisor (
            advisor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            dept TEXT NOT NULL,
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE profile (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            year INTEGER NOT NULL,
            advisor_id INTEGER,
            incoming_year INTEGER NOT NULL,
            grad_year INTEGER NOT NULL,
            is_undergrad INTEGER NOT NULL,
            is_grad INTEGER NOT NULL,
            is_alum INTEGER NOT NULL,
            is_transfer INTEGER NOT NULL,
            pronouns TEXT NOT NULL,
            FOREIGN KEY(advisor_id) REFERENCES advisor(advisor_id),
            CHECK (is_undergrad = 0 OR is_undergrad = 1),
            CHECK (is_grad = 0 OR is_grad = 1),
            CHECK (is_alum = 0 OR is_alum = 1),
            CHECK (is_transfer = 0 OR is_transfer = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE student_course (
            course_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY(course_id, student_id),
            FOREIGN KEY(course_id) REFERENCES course(course_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE labs (
            lab_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            pi TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE dept_lab (
            dept TEXT NOT NULL,
            lab_id INTEGER NOT NULL,
            PRIMARY KEY(dept, lab_id),
            FOREIGN KEY(lab_id) REFERENCES labs(lab_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE student_to_lab (
            user_id INTEGER NOT NULL,
            lab_id INTEGER NOT NULL,
            PRIMARY KEY(user_id, lab_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id),
            FOREIGN KEY(lab_id) REFERENCES labs(lab_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE topic (
            topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_name TEXT NOT NULL,
            PRIMARY KEY (topic_id, topic_name)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO topic_tree
                (parent, child)
                VALUES (?,?)`
                db.run(insert, ['Sports', 'Tennis'])
                db.run(insert, ['Sports', 'Soccer'])
                db.run(insert, ['Sports', 'Basketball'])
                db.run(insert, ['Sports', 'Cross Country'])
                db.run(insert, ['Sports', 'Swim and Dive'])
                db.run(insert, ['Sports', 'Track and Field'])
                db.run(insert, ['Sports', 'Water Polo'])
                db.run(insert, ['Sports', 'Volleyball'])
                db.run(insert, ['Sports', 'Baseball'])
                db.run(insert, ['Housing System', 'Rotation'])
                db.run(insert, ['Housing System', 'Excomm'])
                db.run(insert, ['Housing System', 'Memberships'])
                db.run(insert, ['Housing System', 'ASCIT'])
                db.run(insert, ['Housing System', 'Culture'])
                db.run(insert, ['Clubs', ''])
                db.run(insert, ['Arts', 'Orchestra'])
                db.run(insert, ['Arts', 'Music House'])
                db.run(insert, ['Arts', 'Silk Screening'])
                db.run(insert, ['Jobs/Internships', 'Career Fair'])
                db.run(insert, ['Jobs/Internships', 'Resume'])
                db.run(insert, ['Jobs/Internships', 'Interviewing'])
                db.run(insert, ['Jobs/Internships', 'Networking'])
                db.run(insert, ['Research', 'Labs'])
                db.run(insert, ['Research', 'SURF'])
                db.run(insert, ['Campus Resources', 'Health Center'])
                db.run(insert, ['Campus Resources', 'Counseling Office'])
                db.run(insert, ['Campus Resources', 'Gym'])
                db.run(insert, ['Campus Resources', 'Tech Express'])
                db.run(insert, ['Campus Resources', 'Registrar'])
                db.run(insert, ['Campus Resources', 'Hixon'])
                db.run(insert, ['Campus Info', 'History'])
                db.run(insert, ['Campus Info', 'Traditions'])
                db.run(insert, ['Campus Info', 'Buildings'])
                db.run(insert, ['Campus Info', 'Food'])
                db.run(insert, ['Money', 'Scholarships'])
                db.run(insert, ['Money', 'Financial Aid'])
                db.run(insert, ['Money', 'Work Study'])
                db.run(insert, ['Money', 'Tutoring + TA'])
                db.run(insert, ['Classes', 'Choosing Classes'])
                db.run(insert, ['Classes', 'Class Gossip'])
                db.run(insert, ['Classes', 'Majors and Minors'])
                db.run(insert, ['Off Campus Activities', 'Explore LA'])
                db.run(insert, ['LGBTQ+', ''])
            }
        });
        db.run(`CREATE TABLE topic_tree (
            parent INTEGER NOT NULL,
            child INTEGER NOT NULL,
            PRIMARY KEY(parent, child),
            FOREIGN KEY(parent) REFERENCES topic(topic_id),
            FOREIGN KEY(child) REFERENCES topic(topic_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE question (
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_body TEXT NOT NULL,
            date_created REAL DEFAULT (datetime('now', 'localtime')),
            date_modified REAL DEFAULT (datetime('now', 'localtime')), // data and time don't have special datatypes
            count INTEGER DEFAULT 0
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE answer (
            answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer_body TEXT NOT NULL,
            date_created REAL DEFAULT (datetime('now', 'localtime')),
            date_modified REAL DEFAULT (datetime('now', 'localtime')), // data and time don't have special datatypes
            count INTEGER DEFAULT 0
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE question_topic (
            question_id,
            topic_id,
            PRIMARY KEY(question_id, topic_id),
            FOREIGN KEY(question_id) REFERENCES question(question_id),
            FOREIGN KEY(topic_id) REFERENCES topic(topic_name)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE qna (
            answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
            FOREIGN KEY(question_id) REFERENCES question(question_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE user_upvotes_question (
            question_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY(question_id, user_id),
            FOREIGN KEY(question_id) REFERENCES question(question_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE user_upvotes_answer (
            answer_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY(answer_id, user_id),
            FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE user_topics (
            user_id INTEGER NOT NULL,
            topic_id INTEGER NOT NULL,
            PRIMARY KEY(user_id, topic_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id),
            FOREIGN KEY(topic_id) REFERENCES topic(topic_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE house_memberships (
            house TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            is_full INTEGER NOT NULL,
            PRIMARY KEY(house, user_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id),
            CHECK (is_full = 0 OR is_full = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE options (
            option TEXT NOT NULL PRIMARY KEY,
            has_major INTEGER NOT NULL,
            has_minor INTEGER NOT NULL,
            CHECK (has_major = 0 OR has_major = 1),
            CHECK (has_minor = 0 OR has_minor = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
        db.run(`CREATE TABLE user_option (
            user_id INTEGER NOT NULL,
            option TEXT NOT NULL,
            is_major INTEGER NOT NULL,
            PRIMARY KEY(user_id, option),
            FOREIGN KEY(option) REFERENCES options(option),
            CHECK (is_major = 0 OR is_major = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows

            }
        });
    }
});


module.exports = db
