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
       
        db.run(`CREATE TABLE course (
            course_id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_no INTEGER NOT NULL,
            course_name TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO course
                (course_no, course_name)
                VALUES (?, ?)`
                db.run(insert, [121, "Databases"])
            }
        });
        db.run(`CREATE TABLE dept_course (
            dept TEXT NOT NULL,
            course_id INTEGER NOT NULL,
            PRIMARY KEY(dept, course_id),
            FOREIGN KEY(course_id) REFERENCES course(course_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO dept_course
                (dept, course_id)
                VALUES (?, ?)`
                db.run(insert, ['Comp Sci', 1])
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
                var insert = `INSERT INTO instructor
                (name)
                VALUES (?)`
                db.run(insert, ['Hovik'])
            }
        });
        db.run(`CREATE TABLE instructor_course (
            course_id INTEGER NOT NULL,
            instructor_id INTEGER NOT NULL,
            PRIMARY KEY(course_id, instructor_id),
            FOREIGN KEY(course_id) REFERENCES course(course_id),
            FOREIGN KEY(instructor_id) REFERENCES instructor(instructor_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO instructor_course
                (course_id, instructor_id)
                VALUES (?,?)`
                db.run(insert, [1, 1])
            }
        });
        db.run(`CREATE TABLE advisor (
            advisor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            dept TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO advisor
                (name, dept)
                VALUES (?, ?)`
                db.run(insert, ['Blank', 'Comp Sci'])
            }
        });
        db.run(`CREATE TABLE profile (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
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
                var insert = `INSERT INTO profile
                (first_name, last_name, advisor_id, incoming_year, grad_year, is_undergrad, is_grad, is_alum, is_transfer, pronouns)
                VALUES (?,?,?,?,?,?,?,?,?,?)`
                db.run(insert, ['Joe','Shmo', 1, 2018, 2022, 1, 0, 0, 0, 'he/him'])
            }
        });
        db.run(`CREATE TABLE student_course (
            course_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY(course_id, user_id),
            FOREIGN KEY(course_id) REFERENCES course(course_id),
            FOREIGN KEY(user_id) REFERENCES profile(user_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO student_course
                (course_id, user_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
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
                var insert = `INSERT INTO labs
                (name, pi)
                VALUES (?,?)`
                db.run(insert, ['Lab Lab', 'Doctor Doctor'])
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
                var insert = `INSERT INTO dept_lab
                (dept, lab_id)
                VALUES (?,?)`
                db.run(insert, ['Comp Sci', 1])
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
                var insert = `INSERT INTO student_to_lab
                (user_id, lab_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
            }
        });
        db.run(`CREATE TABLE topic (
            topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_name TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO topic
                (topic_name)
                VALUES (?)`
                db.run(insert, ['Sports'])
                db.run(insert, ['Tennis'])
                db.run(insert, ['Soccer'])
                db.run(insert, ['Basketball'])
                db.run(insert, ['Cross Country'])
                db.run(insert, ['Swim and Dive'])
                db.run(insert, ['Track and Field'])
                db.run(insert, ['Water Polo'])
                db.run(insert, ['Volleyball'])
                db.run(insert, ['Baseball'])
                db.run(insert, ['Clubs'])
                db.run(insert, ['Outdoor and Sports Clubs'])
                db.run(insert, ['Caltech Alpine Club'])
                db.run(insert, ['Archery Club'])
                db.run(insert, ['Caltech Bike Lab'])
                db.run(insert, ['Caltech Cricket Club'])
                db.run(insert, ['Padding Club'])
                db.run(insert, ['Ultimate Frisbee'])
                db.run(insert, ['Caltech Fencing'])
                db.run(insert, ['Caltech Badminton Club'])
                db.run(insert, ['Caltech Ballroom Dance Club'])
                db.run(insert, ['Caltech Tai Chi Club'])
                db.run(insert, ['Caltech Tango'])
                db.run(insert, ['Outreach and Service Clubs'])
                db.run(insert, ['Caltech Effective Altruism'])
                db.run(insert, ['Engineers Without Borders'])
                db.run(insert, ['Caltech Letters'])
                db.run(insert, ['Questbridge'])
                db.run(insert, ['Techers For a Sustainable Future'])
                db.run(insert, ['Techreach'])
                db.run(insert, ['The Caltech Y'])
                db.run(insert, ['Religion and Philosophy Clubs'])
                db.run(insert, ['Catholic Small Faith Community'])
                db.run(insert, ['Christians on Campus at Caltech'])
                db.run(insert, ['Caltech Christian Fellowship'])
                db.run(insert, ['Graduate Christian Fellowship'])
                db.run(insert, ['Caltech Hillel'])
                db.run(insert, ['Caltech Muslim Student Association'])
                db.run(insert, ['Philosophy of Yoga'])
                db.run(insert, ['Science, Math, Engineering Clubs'])
                db.run(insert, ['Aerospace AIAA'])
                db.run(insert, ['AICHE'])
                db.run(insert, ['Biotech Club'])
                db.run(insert, ['Chem Club'])
                db.run(insert, ['Caltech Data Science Organization'])
                db.run(insert, ['Hacktech'])
                db.run(insert, ['Caltech Harvey Mudd Math Competition'])
                db.run(insert, ['IEEE'])
                db.run(insert, ['Math Club'])
                db.run(insert, ['Neurotechers'])
                db.run(insert, ['Physics Club'])
                db.run(insert, ['Caltech Racing'])
                db.run(insert, ['Caltech Robotics Team'])
                db.run(insert, ['Rocketry Parsec'])
                db.run(insert, ['Science Olympiad'])
                db.run(insert, ['Student Investment Fund'])
                db.run(insert, ['UAV Club'])
                db.run(insert, ['Caltech Med Life'])
                db.run(insert, ['Caltech Premedical Association'])
                db.run(insert, ['Diversity Equity and Inclusion Clubs'])
                db.run(insert, ['Black Scientists and Engineers of Caltech'])
                db.run(insert, ['Caltech Disability Coalition'])
                db.run(insert, ['Feminist Club'])
                db.run(insert, ['Caltech Latino Association'])
                db.run(insert, ['OASIS'])
                db.run(insert, ['Prism LGBTQ'])
                db.run(insert, ['Sage Council'])
                db.run(insert, ['Socialists of Caltech'])
                db.run(insert, ['SWE'])
                db.run(insert, ['Arts and Culture Clubs'])
                db.run(insert, ['Aarya'])
                db.run(insert, ['Caltech Acapella'])
                db.run(insert, ['Caltech Anime Society'])
                db.run(insert, ['Caltech Canadian CLub'])
                db.run(insert, ['Caltech Chamber Music'])
                db.run(insert, ['Cheese Society'])
                db.run(insert, ['Techlit Creative Writing'])
                db.run(insert, ['Caltech Dhamaka'])
                db.run(insert, ['Glee Club and Chamber Singers'])
                db.run(insert, ['Intermission Orchestra'])
                db.run(insert, ['Jazz Band and Improv'])
                db.run(insert, ['Performing and Visual Arts'])
                db.run(insert, ['Science Fiction and Fantasy Club'])
                db.run(insert, ['Caltech Theater'])
                db.run(insert, ['Totem Magazine'])
                db.run(insert, ['Visual Arts'])
                db.run(insert, ['Misc Clubs'])
                db.run(insert, ['The Big T'])
                db.run(insert, ['Bridge Club'])
                db.run(insert, ['Chess Club'])
                db.run(insert, ['Dance Dance Revolution Club'])
                db.run(insert, ['Puzzle Club'])
                db.run(insert, ['Quizbowl'])
                db.run(insert, ['Caltech Sovereignty Club'])
                db.run(insert, ['California Tech'])
                db.run(insert, ['Caltech Toastmasters'])
                db.run(insert, ['Caltech Vintage Computing Club'])
                db.run(insert, ['Housing System'])
                db.run(insert, ['Rotation'])
                db.run(insert, ['Excomm'])
                db.run(insert, ['Memberships'])
                db.run(insert, ['ASCIT'])
                db.run(insert, ['Culture'])
                db.run(insert, ['Orchestra'])
                db.run(insert, ['Music House'])
                db.run(insert, ['Silk Screening'])
                db.run(insert, ['Jobs/Internships'])
                db.run(insert, ['Career Fair'])
                db.run(insert, ['Resume'])
                db.run(insert, ['Interviewing'])
                db.run(insert, ['Networking'])
                db.run(insert, ['Research'])
                db.run(insert, ['SURF'])
                db.run(insert, ['Labs'])
                db.run(insert, ['Campus Resources'])
                db.run(insert, ['Health Center'])
                db.run(insert, ['Counseling Office'])
                db.run(insert, ['Gym'])
                db.run(insert, ['Tech Express'])
                db.run(insert, ['Library'])
                db.run(insert, ['Registrar'])
                db.run(insert, ['Hixon'])
                db.run(insert, ['Campus Info'])
                db.run(insert, ['History'])
                db.run(insert, ['Traditions'])
                db.run(insert, ['Buildings'])
                db.run(insert, ['Food'])
                db.run(insert, ['Money'])
                db.run(insert, ['Scholarships'])
                db.run(insert, ['Financial Aid'])
                db.run(insert, ['Work Study'])
                db.run(insert, ['Tutoring and TA'])
                db.run(insert, ['Classes'])
                db.run(insert, ['Choosing Classes'])
                db.run(insert, ['Class Gossip'])
                db.run(insert, ['Majors and Minors'])
                db.run(insert, ['Off Campus Activities'])
                db.run(insert, ['Explore LA'])
                db.run(insert, ['LGBTQ+'])
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
                var insert = `INSERT INTO topic_tree
                (parent, child)
                VALUES (?, ?)`
                db.run(insert, [1, 2])
                db.run(insert, [1, 3])
                db.run(insert, [1, 4])
                db.run(insert, [1, 5])
                db.run(insert, [1, 6])
                db.run(insert, [1, 7])
                db.run(insert, [1, 8])
                db.run(insert, [1, 9])
                db.run(insert, [1, 10])
                db.run(insert, [11, 12])
                db.run(insert, [11, 24])
                db.run(insert, [11, 32])
                db.run(insert, [11, 40])
                db.run(insert, [11, 60])
                db.run(insert, [11, 70])
                db.run(insert, [11, 87])
                db.run(insert, [12, 13])
                db.run(insert, [12, 14])
                db.run(insert, [12, 15])
                db.run(insert, [12, 16])
                db.run(insert, [12, 17])
                db.run(insert, [12, 18])
                db.run(insert, [12, 19])
                db.run(insert, [12, 20])
                db.run(insert, [12, 21])
                db.run(insert, [12, 22])
                db.run(insert, [12, 23])
                db.run(insert, [24, 25])
                db.run(insert, [24, 26])
                db.run(insert, [24, 27])
                db.run(insert, [24, 28])
                db.run(insert, [24, 29])
                db.run(insert, [24, 30])
                db.run(insert, [24, 31])
                db.run(insert, [32, 33])
                db.run(insert, [32, 34])
                db.run(insert, [32, 35])
                db.run(insert, [32, 36])
                db.run(insert, [32, 37])
                db.run(insert, [32, 38])
                db.run(insert, [32, 39])
                db.run(insert, [40, 41])
                db.run(insert, [40, 42])
                db.run(insert, [40, 43])
                db.run(insert, [40, 44])
                db.run(insert, [40, 45])
                db.run(insert, [40, 46])
                db.run(insert, [40, 47])
                db.run(insert, [40, 48])
                db.run(insert, [40, 49])
                db.run(insert, [40, 50])
                db.run(insert, [40, 51])
                db.run(insert, [40, 52])
                db.run(insert, [40, 53])
                db.run(insert, [40, 54])
                db.run(insert, [40, 55])
                db.run(insert, [40, 56])
                db.run(insert, [40, 57])
                db.run(insert, [40, 58])
                db.run(insert, [40, 59])
                db.run(insert, [60, 61])
                db.run(insert, [60, 62])
                db.run(insert, [60, 63])
                db.run(insert, [60, 64])
                db.run(insert, [60, 65])
                db.run(insert, [60, 66])
                db.run(insert, [60, 67])
                db.run(insert, [60, 68])
                db.run(insert, [60, 69])
                db.run(insert, [70, 71])
                db.run(insert, [70, 72])
                db.run(insert, [70, 73])
                db.run(insert, [70, 74])
                db.run(insert, [70, 75])
                db.run(insert, [70, 76])
                db.run(insert, [70, 77])
                db.run(insert, [70, 78])
                db.run(insert, [70, 79])
                db.run(insert, [70, 80])
                db.run(insert, [70, 81])
                db.run(insert, [70, 82])
                db.run(insert, [70, 83])
                db.run(insert, [70, 84])
                db.run(insert, [70, 85])
                db.run(insert, [70, 86])
                db.run(insert, [87, 88])
                db.run(insert, [87, 89])
                db.run(insert, [87, 90])
                db.run(insert, [87, 91])
                db.run(insert, [87, 92])
                db.run(insert, [87, 93])
                db.run(insert, [87, 94])
                db.run(insert, [87, 95])
                db.run(insert, [87, 96])
                db.run(insert, [87, 97])
                db.run(insert, [98, 99])
                db.run(insert, [98, 100])
                db.run(insert, [98, 101])
                db.run(insert, [98, 102])
                db.run(insert, [103, 104])
                db.run(insert, [103, 105])
                db.run(insert, [103, 106])
                db.run(insert, [107, 108])
                db.run(insert, [107, 109])
                db.run(insert, [107, 110])
                db.run(insert, [107, 111])
                db.run(insert, [112, 113])
                db.run(insert, [112, 114])
                db.run(insert, [115, 116])
                db.run(insert, [115, 117])
                db.run(insert, [115, 118])
                db.run(insert, [115, 119])
                db.run(insert, [115, 120])
                db.run(insert, [115, 121])
                db.run(insert, [115, 122])
                db.run(insert, [123, 124])
                db.run(insert, [123, 125])
                db.run(insert, [123, 126])
                db.run(insert, [123, 127])
                db.run(insert, [128, 129])
                db.run(insert, [128, 130])
                db.run(insert, [128, 131])
                db.run(insert, [128, 132])
                db.run(insert, [133, 134])
                db.run(insert, [133, 135])
                db.run(insert, [133, 136])
                db.run(insert, [137, 138])
            }
        });
        db.run(`CREATE TABLE question (
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_body TEXT NOT NULL,
            date_created REAL DEFAULT (datetime('now', 'localtime')),
            date_modified REAL DEFAULT (datetime('now', 'localtime')),
            count INTEGER DEFAULT 0
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO question
                (question_body)
                VALUES (?)`
                db.run(insert, ['What is the question?'])
            }
        });
        db.run(`CREATE TABLE answer (
            answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer_body TEXT NOT NULL,
            date_created REAL DEFAULT (datetime('now', 'localtime')),
            date_modified REAL DEFAULT (datetime('now', 'localtime')),
            count INTEGER DEFAULT 0
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO answer
                (answer_body)
                VALUES (?)`
                db.run(insert, ['This is the answer'])
            }
        });
        db.run(`CREATE TABLE question_topic (
            question_id INTEGER NOT NULL,
            topic_id INTEGER NOT NULL,
            PRIMARY KEY(question_id, topic_id),
            FOREIGN KEY(question_id) REFERENCES question(question_id),
            FOREIGN KEY(topic_id) REFERENCES topic(topic_name)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO question_topic
                (question_id, topic_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
            }
        });
        db.run(`CREATE TABLE qna (
            answer_id INTEGER PRIMARY KEY NOT NULL,
            question_id INTEGER NOT NULL,
            FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
            FOREIGN KEY(question_id) REFERENCES question(question_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO qna
                (answer_id, question_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
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
                var insert = `INSERT INTO user_upvotes_question
                (question_id, user_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
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
                var insert = `INSERT INTO user_upvotes_answer
                (answer_id, user_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
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
                var insert = `INSERT INTO user_topics
                (user_id, topic_id)
                VALUES (?,?)`
                db.run(insert, [1,1])
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
                var insert = `INSERT INTO house_memberships
                (house, user_id, is_full)
                VALUES (?,?,?)`
                db.run(insert, ['Lloyd',1,1])
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
                var insert = `INSERT INTO options
                (option, has_major, has_minor)
                VALUES (?,?,?)`
                db.run(insert, ['Comp Sci', 1,1])
                db.run(insert, ['ACM',1,0])
                db.run(insert, ['Applied Physics',1,0])
                db.run(insert, ['Astrophysics',1,1])
                db.run(insert, ['Bioengineering',1,0])
                db.run(insert, ['Biology',1,0])
                db.run(insert, ['Business, Economics & Management',1,0])
                db.run(insert, ['Chemical Engineering',1,0])
                db.run(insert, ['Chemistry',1,1])
                db.run(insert, ['Computational and Neural Systems',1,0])
                db.run(insert, ['Computer Science',1,1])
                db.run(insert, ['Control and Dynamical Systems',0,1])
                db.run(insert, ['Economics',1,0])
                db.run(insert, ['Electrical Engineering',1,0])
                db.run(insert, ['Engineering and Applied Science',1,0])
                db.run(insert, ['English',1,1])
                db.run(insert, ['Environmental Science and Engineering',0,1])
                db.run(insert, ['Geobiology',1,0])
                db.run(insert, ['Geochemistry',1,0])
                db.run(insert, ['Geology',1,0])
                db.run(insert, ['Geological and Planetary Systems',0,1])
                db.run(insert, ['Geophysics',1,0])
                db.run(insert, ['History',1,1])
                db.run(insert, ['History and Philosophy of Science',1,1])
                db.run(insert, ['Information and Data Sciences',1,1])
                db.run(insert, ['Materials Science',1,0])
                db.run(insert, ['Mathematics',1,0])
                db.run(insert, ['Mechanical Engineering',1,0])
                db.run(insert, ['Philosophy',1,1])
                db.run(insert, ['Physics',1,0])
                db.run(insert, ['Planetary Science',1,0])
                db.run(insert, ['Political Science',1,0])
                db.run(insert, ['Structural Mechanics',0,1])
            }
        });
        db.run(`CREATE TABLE user_option (
            user_id INTEGER NOT NULL,
            option_id INTEGER NOT NULL,
            is_major INTEGER NOT NULL,
            PRIMARY KEY(user_id, option_id),
            FOREIGN KEY(option_id) REFERENCES options(option_id),
            CHECK (is_major = 0 OR is_major = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO user_option
                (user_id, option_id, is_major)
                VALUES (?,?,?)`
                db.run(insert, [1,1,1])
            }
        });
    }
});


module.exports = db
