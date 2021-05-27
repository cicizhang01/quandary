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
            course_id INTEGER PRIMARY KEY,
            course_no TEXT NOT NULL,
            course_name TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO course
                (course_id, course_no, course_name)
                VALUES (?, ?, ?)`
                db.run(insert, [1, "121", "Databases"])
                db.run(insert, [2, "100", "Research in Aerospace"])

                db.run(insert, [3, "101C", "Fluid Mechanics"])
                db.run(insert, [4, "011", "Introduction to Matlab and Mathematica"])
                db.run(insert, [5, "095B", "Introductory Methods of Applied Mathematics for the Physical Sciences"])
                
                db.run(insert, [6, "079C", "Senior Thesis, Theoretical"])
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
                db.run(insert, ['CS', 1])
                db.run(insert, ['Ae', 2])
                db.run(insert, ['Ae', 3])
                db.run(insert, ['APh', 3])
                db.run(insert, ['CE', 3])
                db.run(insert, ['ME', 3])
                db.run(insert, ['ACM', 4])
                db.run(insert, ['ACM', 5])
                db.run(insert, ['APh', 6])
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
        // advisor_id is currently unused.
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
                db.run(insert, ["Joe","Shmo",1,2018,2022,1,0,0,0,"he/him"])
                db.run(insert, ["kee","kar",1,2019,2023,1,0,0,1,"she/her/hers"])
                db.run(insert, ["ree","rar",1,2021,2025,1,0,0,0,"she/her/hers"])
                db.run(insert, ["Sandy","Hamster",1,2018,2022,1,0,0,0,"she/her/hers"])
                db.run(insert, ["Hermila","Boling",2,2021,2024,1,0,0,1,"she/her"])
                db.run(insert, ["Abe","Tobin",3,2000,2006,0,1,1,0,"they/them"])
                db.run(insert, ["Shanelle","Heller",4,2015,2025,1,1,1,0,"she/her"])
                db.run(insert, ["Gregoria","Breaux",5,2019,2022,1,0,0,1,"she/her"])
                db.run(insert, ["Helaine","Devito",6,2009,2014,1,0,1,0,"he/him"])
                db.run(insert, ["Delsie","Oliphant",7,2018,2025,0,1,0,0,"she/her"])
                db.run(insert, ["Yolonda","Mcneal",8,2000,2005,0,1,1,0,"she/her"])
                db.run(insert, ["Carrol","Bonds",9,2020,2024,1,0,0,0,"he/him"])
                db.run(insert, ["Charlena","Hawes",10,2017,2021,1,0,1,1,"they/them"])
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
                db.run(insert, [1,2])
                db.run(insert, [1,3])
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

        // NEW
        db.run(`CREATE TABLE student_to_faculty (
            user_id INTEGER NOT NULL,
            division_id INTEGER NOT NULL,
            faculty_name TEXT NOT NULL,
            PRIMARY KEY(user_id, division_id, faculty_name),
            FOREIGN KEY(user_id) REFERENCES profile(user_id),
            FOREIGN KEY(division_id) REFERENCES faculty(division_id),
            FOREIGN KEY(faculty_name) REFERENCES faculty(faculty_name)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO student_to_faculty
                (user_id, division_id, faculty_name)
                VALUES (?,?,?)`
                
                db.run(insert, [1, 3, "Aaron Ames"])
                db.run(insert, [1, 3, "Animashree Anandkumar"])
                db.run(insert, [2, 1, "John M. Allman"])
                db.run(insert, [4, 2, "Geoffrey Blake"])
                db.run(insert, [6, 4, "Konstantin Batygin"])
                db.run(insert, [9, 5, "Marina Agranov"])
                db.run(insert, [10, 6, "Rana Adhikari"])
            }
        });
        

        db.run(`CREATE TABLE topic (
            topic_id INTEGER,
            topic_name TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }
            
            else{
                
                // Table just created, creating some rows
                var insert = `INSERT INTO topic VALUES (?,?)`
                /*
                db.run(insert, [1, 'Sports'])
                db.run(insert, [2, 'Tennis'])
                db.run(insert, [3, 'Soccer'])
                db.run(insert, [4, 'Basketball'])
                db.run(insert, [5, 'Cross Country'])
                db.run(insert, [6, 'Swim and Dive'])
                db.run(insert, [7, 'Track and Field'])
                db.run(insert, [8, 'Water Polo'])
                db.run(insert, [9, 'Volleyball'])
                db.run(insert, [10, 'Baseball'])
                db.run(insert, [11, 'Clubs'])
                db.run(insert, [12, 'Outdoor and Sports Clubs'])
                db.run(insert, [13, 'Caltech Alpine Club'])
                db.run(insert, [14, 'Archery Club'])
                db.run(insert, [15, 'Caltech Bike Lab'])
                db.run(insert, [16, 'Caltech Cricket Club'])
                db.run(insert, [17, 'Padding Club'])
                db.run(insert, [18, 'Ultimate Frisbee'])
                db.run(insert, [19, 'Caltech Fencing'])
                db.run(insert, [20, 'Caltech Badminton Club'])
                db.run(insert, [21, 'Caltech Ballroom Dance Club'])
                db.run(insert, [22, 'Caltech Tai Chi Club'])
                db.run(insert, [23, 'Caltech Tango'])
                db.run(insert, [24, 'Outreach and Service Clubs'])
                db.run(insert, [25, 'Caltech Effective Altruism'])
                db.run(insert, [26, 'Engineers Without Borders'])
                db.run(insert, [27, 'Caltech Letters'])
                db.run(insert, [28, 'Questbridge'])
                db.run(insert, [29, 'Techers For a Sustainable Future'])
                db.run(insert, [30, 'Techreach'])
                db.run(insert, [31, 'The Caltech Y'])
                db.run(insert, [32, 'Religion and Philosophy Clubs'])
                db.run(insert, [33, 'Catholic Small Faith Community'])
                db.run(insert, [34, 'Christians on Campus at Caltech'])
                db.run(insert, [35, 'Caltech Christian Fellowship'])
                db.run(insert, [36, 'Graduate Christian Fellowship'])
                db.run(insert, [37, 'Caltech Hillel'])
                db.run(insert, [38, 'Caltech Muslim Student Association'])
                db.run(insert, [39, 'Philosophy of Yoga'])
                db.run(insert, [40, 'Science Math Engineering Clubs'])
                db.run(insert, [41, 'Aerospace AIAA'])
                db.run(insert, [42, 'AICHE'])
                db.run(insert, [43, 'Biotech Club'])
                db.run(insert, [44, 'Chem Club'])
                db.run(insert, [45, 'Caltech Data Science Organization'])
                db.run(insert, [46, 'Hacktech'])
                db.run(insert, [47, 'Caltech Harvey Mudd Math Competition'])
                db.run(insert, [48, 'IEEE'])
                db.run(insert, [49, 'Math Club'])
                db.run(insert, [50, 'Neurotechers'])
                db.run(insert, [51, 'Physics Club'])
                db.run(insert, [52, 'Caltech Racing'])
                db.run(insert, [53, 'Caltech Robotics Team'])
                db.run(insert, [54, 'Rocketry Parsec'])
                db.run(insert, [55, 'Science Olympiad'])
                db.run(insert, [56, 'Student Investment Fund'])
                db.run(insert, [57, 'UAV Club'])
                db.run(insert, [58, 'Caltech Med Life'])
                db.run(insert, [59, 'Caltech Premedical Association'])
                db.run(insert, [60, 'Diversity Equity and Inclusion Clubs'])
                db.run(insert, [61, 'Black Scientists and Engineers of Caltech'])
                db.run(insert, [62, 'Caltech Disability Coalition'])
                db.run(insert, [63, 'Feminist Club'])
                db.run(insert, [64, 'Caltech Latino Association'])
                db.run(insert, [65, 'OASIS'])
                db.run(insert, [66, 'Prism LGBTQ'])
                db.run(insert, [67, 'Sage Council'])
                db.run(insert, [68, 'Socialists of Caltech'])
                db.run(insert, [69, 'SWE'])
                db.run(insert, [70, 'Arts and Culture Clubs'])
                db.run(insert, [71, 'Aarya'])
                db.run(insert, [72, 'Caltech Acapella'])
                db.run(insert, [73, 'Caltech Anime Society'])
                db.run(insert, [74, 'Caltech Canadian CLub'])
                db.run(insert, [75, 'Caltech Chamber Music'])
                db.run(insert, [76, 'Cheese Society'])
                db.run(insert, [77, 'Techlit Creative Writing'])
                db.run(insert, [78, 'Caltech Dhamaka'])
                db.run(insert, [79, 'Glee Club and Chamber Singers'])
                db.run(insert, [80, 'Intermission Orchestra'])
                db.run(insert, [81, 'Jazz Band and Improv'])
                db.run(insert, [82, 'Performing and Visual Arts'])
                db.run(insert, [83, 'Science Fiction and Fantasy Club'])
                db.run(insert, [84, 'Caltech Theater'])
                db.run(insert, [85, 'Totem Magazine'])
                db.run(insert, [86, 'Visual Arts'])
                db.run(insert, [87, 'Misc Clubs'])
                db.run(insert, [88, 'The Big T'])
                db.run(insert, [89, 'Bridge Club'])
                db.run(insert, [90, 'Chess Club'])
                db.run(insert, [91, 'Dance Dance Revolution Club'])
                db.run(insert, [92, 'Puzzle Club'])
                db.run(insert, [93, 'Quizbowl'])
                db.run(insert, [94, 'Caltech Sovereignty Club'])
                db.run(insert, [95, 'California Tech'])
                db.run(insert, [96, 'Caltech Toastmasters'])
                db.run(insert, [97, 'Caltech Vintage Computing Club'])
                db.run(insert, [98, 'Housing System'])
                db.run(insert, [99, 'Rotation'])
                db.run(insert, [100, 'Excomm'])
                db.run(insert, [101, 'Memberships'])
                db.run(insert, [102, 'ASCIT'])
                db.run(insert, [103, 'Culture'])
                db.run(insert, [104, 'Orchestra'])
                db.run(insert, [105, 'Music House'])
                db.run(insert, [106, 'Silk Screening'])
                db.run(insert, [107, 'Jobs/Internships'])
                db.run(insert, [108, 'Career Fair'])
                db.run(insert, [109, 'Resume'])
                db.run(insert, [110, 'Interviewing'])
                db.run(insert, [111, 'Networking'])
                db.run(insert, [112, 'Research'])
                db.run(insert, [113, 'SURF'])
                db.run(insert, [114, 'Labs'])
                db.run(insert, [115, 'Campus Resources'])
                db.run(insert, [116, 'Health Center'])
                db.run(insert, [117, 'Counseling Office'])
                db.run(insert, [118, 'Gym'])
                db.run(insert, [119, 'Tech Express'])
                db.run(insert, [120, 'Library'])
                db.run(insert, [121, 'Registrar'])
                db.run(insert, [122, 'Hixon'])
                db.run(insert, [123, 'Campus Info'])
                db.run(insert, [124, 'History'])
                db.run(insert, [125, 'Traditions'])
                db.run(insert, [126, 'Buildings'])
                db.run(insert, [127, 'Food'])
                db.run(insert, [128, 'Money'])
                db.run(insert, [129, 'Scholarships'])
                db.run(insert, [130, 'Financial Aid'])
                db.run(insert, [131, 'Work Study'])
                db.run(insert, [132, 'Tutoring and TA'])
                db.run(insert, [133, 'Classes'])
                db.run(insert, [134, 'Choosing Classes'])
                db.run(insert, [135, 'Class Gossip'])
                db.run(insert, [136, 'Majors and Minors'])
                db.run(insert, [137, 'Off Campus Activities'])
                db.run(insert, [138, 'Explore LA'])
                db.run(insert, [139, 'LGBTQ+'])
                */
               db.run(insert, [1, 'Sports'])
               db.run(insert, [2, 'Tennis'])
               db.run(insert, [3, 'Soccer'])
               db.run(insert, [4, 'Basketball'])
               db.run(insert, [5, 'Cross Country'])
               db.run(insert, [6, 'Swim and Dive'])
               db.run(insert, [7, 'Track and Field'])
               db.run(insert, [8, 'Water Polo'])
               db.run(insert, [9, 'Volleyball'])
               db.run(insert, [10, 'Baseball'])
               db.run(insert, [11, 'Housing System'])
               db.run(insert, [12, 'Rotation'])
               db.run(insert, [13, 'Excomm'])
               db.run(insert, [14, 'Memberships'])
               db.run(insert, [15, 'ASCIT'])
               db.run(insert, [16, 'Culture'])
               db.run(insert, [17, 'Orchestra'])
               db.run(insert, [18, 'Music House'])
               db.run(insert, [19, 'Silk Screening'])
               db.run(insert, [20, 'Jobs/Internships'])
               db.run(insert, [21, 'Career Fair'])
               db.run(insert, [22, 'Resume'])
               db.run(insert, [23, 'Interviewing'])
               db.run(insert, [24, 'Networking'])
               db.run(insert, [25, 'Research'])
               db.run(insert, [26, 'SURF'])
               db.run(insert, [27, 'Labs'])
               db.run(insert, [28, 'Campus Resources'])
               db.run(insert, [29, 'Health Center'])
               db.run(insert, [30, 'Counseling Office'])
               db.run(insert, [31, 'Gym'])
               db.run(insert, [32, 'Tech Express'])
               db.run(insert, [33, 'Library'])
               db.run(insert, [34, 'Registrar'])
               db.run(insert, [35, 'Hixon'])
               db.run(insert, [36, 'Campus Info'])
               db.run(insert, [37, 'History'])
               db.run(insert, [38, 'Traditions'])
               db.run(insert, [39, 'Buildings'])
               db.run(insert, [40, 'Food'])
               db.run(insert, [41, 'Money'])
               db.run(insert, [42, 'Scholarships'])
               db.run(insert, [43, 'Financial Aid'])
               db.run(insert, [44, 'Work Study'])
               db.run(insert, [45, 'Tutoring and TA'])
               db.run(insert, [46, 'Classes'])
               db.run(insert, [47, 'Choosing Classes'])
               db.run(insert, [48, 'Class Gossip'])
               db.run(insert, [49, 'Majors and Minors'])
               db.run(insert, [50, 'Off Campus Activities'])
               db.run(insert, [51, 'Explore LA'])
               db.run(insert, [52, 'LGBTQ+'])
               db.run(insert, [53, 'Clubs'])
               db.run(insert, [54, 'Outdoor and Sports Clubs'])
               db.run(insert, [55, 'Caltech Alpine Club'])
               db.run(insert, [56, 'Archery Club'])
               db.run(insert, [57, 'Caltech Bike Lab'])
               db.run(insert, [58, 'Caltech Cricket Club'])
               db.run(insert, [59, 'Padding Club'])
               db.run(insert, [60, 'Ultimate Frisbee'])
               db.run(insert, [61, 'Caltech Fencing'])
               db.run(insert, [62, 'Caltech Badminton Club'])
               db.run(insert, [63, 'Caltech Ballroom Dance Club'])
               db.run(insert, [64, 'Caltech Tai Chi Club'])
               db.run(insert, [65, 'Caltech Tango'])
               db.run(insert, [66, 'Outreach and Service Clubs'])
               db.run(insert, [67, 'Caltech Effective Altruism'])
               db.run(insert, [68, 'Engineers Without Borders'])
               db.run(insert, [69, 'Caltech Letters'])
               db.run(insert, [70, 'Questbridge'])
               db.run(insert, [71, 'Techers For a Sustainable Future'])
               db.run(insert, [72, 'Techreach'])
               db.run(insert, [73, 'The Caltech Y'])
               db.run(insert, [74, 'Religion and Philosophy Clubs'])
               db.run(insert, [75, 'Catholic Small Faith Community'])
               db.run(insert, [76, 'Christians on Campus at Caltech'])
               db.run(insert, [77, 'Caltech Christian Fellowship'])
               db.run(insert, [78, 'Graduate Christian Fellowship'])
               db.run(insert, [79, 'Caltech Hillel'])
               db.run(insert, [80, 'Caltech Muslim Student Association'])
               db.run(insert, [81, 'Philosophy of Yoga'])
               db.run(insert, [82, 'Science Math Engineering Clubs'])
               db.run(insert, [83, 'Aerospace AIAA'])
               db.run(insert, [84, 'AICHE'])
               db.run(insert, [85, 'Biotech Club'])
               db.run(insert, [86, 'Chem Club'])
               db.run(insert, [87, 'Caltech Data Science Organization'])
               db.run(insert, [88, 'Hacktech'])
               db.run(insert, [89, 'Caltech Harvey Mudd Math Competition'])
               db.run(insert, [90, 'IEEE'])
               db.run(insert, [91, 'Math Club'])
               db.run(insert, [92, 'Neurotechers'])
               db.run(insert, [93, 'Physics Club'])
               db.run(insert, [94, 'Caltech Racing'])
               db.run(insert, [95, 'Caltech Robotics Team'])
               db.run(insert, [96, 'Rocketry Parsec'])
               db.run(insert, [97, 'Science Olympiad'])
               db.run(insert, [98, 'Student Investment Fund'])
               db.run(insert, [99, 'UAV Club'])
               db.run(insert, [100, 'Caltech Med Life'])
               db.run(insert, [101, 'Caltech Premedical Association'])
               db.run(insert, [102, 'Diversity Equity and Inclusion Clubs'])
               db.run(insert, [103, 'Black Scientists and Engineers of Caltech'])
               db.run(insert, [104, 'Caltech Disability Coalition'])
               db.run(insert, [105, 'Feminist Club'])
               db.run(insert, [106, 'Caltech Latino Association'])
               db.run(insert, [107, 'OASIS'])
               db.run(insert, [108, 'Prism LGBTQ'])
               db.run(insert, [109, 'Sage Council'])
               db.run(insert, [110, 'Socialists of Caltech'])
               db.run(insert, [111, 'SWE'])
               db.run(insert, [112, 'Arts and Culture Clubs'])
               db.run(insert, [113, 'Aarya'])
               db.run(insert, [114, 'Caltech Acapella'])
               db.run(insert, [115, 'Caltech Anime Society'])
               db.run(insert, [116, 'Caltech Canadian CLub'])
               db.run(insert, [117, 'Caltech Chamber Music'])
               db.run(insert, [118, 'Cheese Society'])
               db.run(insert, [119, 'Techlit Creative Writing'])
               db.run(insert, [120, 'Caltech Dhamaka'])
               db.run(insert, [121, 'Glee Club and Chamber Singers'])
               db.run(insert, [122, 'Intermission Orchestra'])
               db.run(insert, [123, 'Jazz Band and Improv'])
               db.run(insert, [124, 'Performing and Visual Arts'])
               db.run(insert, [125, 'Science Fiction and Fantasy Club'])
               db.run(insert, [126, 'Caltech Theater'])
               db.run(insert, [127, 'Totem Magazine'])
               db.run(insert, [128, 'Visual Arts'])
               db.run(insert, [129, 'Misc Clubs'])
               db.run(insert, [130, 'The Big T'])
               db.run(insert, [131, 'Bridge Club'])
               db.run(insert, [132, 'Chess Club'])
               db.run(insert, [133, 'Dance Dance Revolution Club'])
               db.run(insert, [134, 'Puzzle Club'])
               db.run(insert, [135, 'Quizbowl'])
               db.run(insert, [136, 'Caltech Sovereignty Club'])
               db.run(insert, [137, 'California Tech'])
               db.run(insert, [138, 'Caltech Toastmasters'])
               db.run(insert, [139, 'Caltech Vintage Computing Club'])
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
                /*
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
                */
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
               db.run(insert, [11, 13])
               db.run(insert, [11, 14])
               db.run(insert, [11, 15])
               db.run(insert, [16, 17])
               db.run(insert, [16, 18])
               db.run(insert, [16, 19])
               db.run(insert, [20, 21])
               db.run(insert, [20, 22])
               db.run(insert, [20, 23])
               db.run(insert, [20, 24])
               db.run(insert, [25, 26])
               db.run(insert, [25, 27])
               db.run(insert, [28, 29])
               db.run(insert, [28, 30])
               db.run(insert, [28, 31])
               db.run(insert, [28, 32])
               db.run(insert, [28, 33])
               db.run(insert, [28, 34])
               db.run(insert, [28, 35])
               db.run(insert, [36, 37])
               db.run(insert, [36, 38])
               db.run(insert, [36, 39])
               db.run(insert, [36, 40])
               db.run(insert, [41, 42])
               db.run(insert, [41, 43])
               db.run(insert, [41, 44])
               db.run(insert, [41, 45])
               db.run(insert, [46, 47])
               db.run(insert, [46, 48])
               db.run(insert, [46, 49])
               db.run(insert, [50, 51])
               db.run(insert, [53, 54])
               db.run(insert, [53, 66])
               db.run(insert, [53, 74])
               db.run(insert, [53, 82])
               db.run(insert, [53, 102])
               db.run(insert, [53, 112])
               db.run(insert, [53, 129])
               db.run(insert, [54, 55])
               db.run(insert, [54, 56])
               db.run(insert, [54, 57])
               db.run(insert, [54, 58])
               db.run(insert, [54, 59])
               db.run(insert, [54, 60])
               db.run(insert, [54, 61])
               db.run(insert, [54, 62])
               db.run(insert, [54, 63])
               db.run(insert, [54, 64])
               db.run(insert, [54, 65])
               db.run(insert, [66, 67])
               db.run(insert, [66, 68])
               db.run(insert, [66, 69])
               db.run(insert, [66, 70])
               db.run(insert, [66, 71])
               db.run(insert, [66, 72])
               db.run(insert, [66, 73])
               db.run(insert, [74, 75])
               db.run(insert, [74, 76])
               db.run(insert, [74, 77])
               db.run(insert, [74, 78])
               db.run(insert, [74, 79])
               db.run(insert, [74, 80])
               db.run(insert, [74, 81])
               db.run(insert, [82, 83])
               db.run(insert, [82, 84])
               db.run(insert, [82, 85])
               db.run(insert, [82, 86])
               db.run(insert, [82, 87])
               db.run(insert, [82, 88])
               db.run(insert, [82, 89])
               db.run(insert, [82, 90])
               db.run(insert, [82, 91])
               db.run(insert, [82, 92])
               db.run(insert, [82, 93])
               db.run(insert, [82, 94])
               db.run(insert, [82, 95])
               db.run(insert, [82, 96])
               db.run(insert, [82, 97])
               db.run(insert, [82, 98])
               db.run(insert, [82, 99])
               db.run(insert, [82, 100])
               db.run(insert, [82, 101])
               db.run(insert, [102, 103])
               db.run(insert, [102, 104])
               db.run(insert, [102, 105])
               db.run(insert, [102, 106])
               db.run(insert, [102, 107])
               db.run(insert, [102, 108])
               db.run(insert, [102, 109])
               db.run(insert, [102, 110])
               db.run(insert, [102, 111])
               db.run(insert, [112, 113])
               db.run(insert, [112, 114])
               db.run(insert, [112, 115])
               db.run(insert, [112, 116])
               db.run(insert, [112, 117])
               db.run(insert, [112, 118])
               db.run(insert, [112, 119])
               db.run(insert, [112, 120])
               db.run(insert, [112, 121])
               db.run(insert, [112, 122])
               db.run(insert, [112, 123])
               db.run(insert, [112, 124])
               db.run(insert, [112, 125])
               db.run(insert, [112, 126])
               db.run(insert, [112, 127])
               db.run(insert, [112, 128])
               db.run(insert, [129, 130])
               db.run(insert, [129, 131])
               db.run(insert, [129, 132])
               db.run(insert, [129, 133])
               db.run(insert, [129, 134])
               db.run(insert, [129, 135])
               db.run(insert, [129, 136])
               db.run(insert, [129, 137])
               db.run(insert, [129, 138])
               db.run(insert, [129, 139])
            }
        });
        db.run(`CREATE TABLE question (
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_body TEXT NOT NULL,
            question_creator INTEGER NOT NULL,
            is_anon INTEGER NOT NULL,
            date_created REAL DEFAULT (datetime('now', 'localtime')),
            date_modified REAL DEFAULT (datetime('now', 'localtime')),
            question_upvotes INTEGER DEFAULT 0,
            FOREIGN KEY(question_creator) REFERENCES profile(user_id),
            CHECK (is_anon = 0 OR is_anon = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO question
                (question_id, question_body, question_creator, is_anon, question_upvotes)
                VALUES (?,?,?,?,?)`
                
                db.run(insert, [1, "Is there a joint BS + Masters for CS at Caltech?", 3, 1, 3])
                db.run(insert, [2, "How much funding does a club get?", 7, 0, 1])
                db.run(insert, [3, "How similar are houses to how they present themselves during rotation?", 6, 0, 0])
                db.run(insert, [4, "I'm looking for some work study advice. What kinds of opportunties best fit me? I prefer to work only during weekends.", 6, 1, 2])
                db.run(insert, [5, "For off-campus SURFs, what is the pay? How do I find opportunties near where I live?", 2, 1, 0])
                db.run(insert, [6, "Any suggestions for good Thai food in LA?", 1, 0, 0])
                db.run(insert, [7, "What are good humanities to take as a frosh?", 10, 1, 1])
                db.run(insert, [8, "What kinds of jobs should I apply for if I'm interested in classes like CS 121, CS 24, and CS 124?", 3, 1, 0])
                db.run(insert, [9, "What is the library policy on borrowing books?", 5, 0, 1])
                db.run(insert, [10, "What are some traditions in the houses? As well as pranks?", 9, 1, 4])
            }
        });
        db.run(`CREATE TABLE answer (
            answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer_body TEXT NOT NULL,
            answer_creator INTEGER NOT NULL,
            is_anon INTEGER NOT NULL,
            date_created REAL DEFAULT (datetime('now', 'localtime')),
            date_modified REAL DEFAULT (datetime('now', 'localtime')),
            answer_upvotes INTEGER DEFAULT 0,
            FOREIGN KEY(answer_creator) REFERENCES profile(user_id),
            CHECK (is_anon = 0 OR is_anon = 1)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO answer
<<<<<<< HEAD
                (answer_id, answer_body, answer_creator, is_anon, answer_upvotes)
                VALUES (?,?,?,?,?)`
                
                db.run(insert, [1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 1_1", 4, 0, 0])
                db.run(insert, [2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 1_2", 3, 1, 0])
                db.run(insert, [3, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 2_1", 2, 0, 0])
                db.run(insert, [4, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 3_1", 1, 0, 0])
                db.run(insert, [5, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 3_2", 3, 0, 0])
                db.run(insert, [6, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 3_3", 5, 1, 0])
                db.run(insert, [7, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 5_1", 6, 1, 0])
                db.run(insert, [8, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 8_1", 7, 1, 0])
                db.run(insert, [9, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 10_1", 4, 1, 0])
=======
                (answer_body, answer_creator, is_anon, answer_upvotes)
                VALUES (?,?,?,?)`
                db.run(insert, ['This is the answer', 1, 0, 1])
                db.run(insert, ['This is the second answer', 3, 0, 0])
>>>>>>> main
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

                db.run(insert, [1, 20])
                db.run(insert, [2, 53])
                db.run(insert, [3, 11])
                db.run(insert, [3, 12])
                db.run(insert, [4, 44])
                db.run(insert, [5, 26])
                db.run(insert, [6, 51])
                db.run(insert, [7, 47])
                db.run(insert, [8, 20])
                db.run(insert, [9, 28])
                db.run(insert, [9, 33])
                db.run(insert, [10, 11])
                db.run(insert, [10, 38])
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
                
                db.run(insert, [1, 1])
                db.run(insert, [2, 1])
                db.run(insert, [3, 2])
                db.run(insert, [4, 3])
                db.run(insert, [5, 3])
                db.run(insert, [6, 3])
                db.run(insert, [7, 5])
                db.run(insert, [8, 8])
                db.run(insert, [9, 10])
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
                
                db.run(insert, [1, 4])
                db.run(insert, [1, 2])
                db.run(insert, [1, 1])
                db.run(insert, [2, 6])
                db.run(insert, [4, 1])
                db.run(insert, [4, 2])
                db.run(insert, [7, 9])
                db.run(insert, [9, 4])
                db.run(insert, [10, 5])
                db.run(insert, [10, 6])
                db.run(insert, [10, 7])
                db.run(insert, [10, 3])
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
            FOREIGN KEY(user_id) REFERENCES profile(user_id) ON DELETE CASCADE,
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
                db.run(insert, [1, 1])
                db.run(insert, [1, 2])
                db.run(insert, [1, 6])
                db.run(insert, [1, 20])
                db.run(insert, [1, 21])
                db.run(insert, [1, 24])

                db.run(insert, [2, 25])
                db.run(insert, [2, 26])
                db.run(insert, [2, 27])

                db.run(insert, [3, 1])
                db.run(insert, [3, 3])
                db.run(insert, [3, 16])
                db.run(insert, [3, 18])

                db.run(insert, [5, 28])
                db.run(insert, [5, 29])
                db.run(insert, [5, 31])
                db.run(insert, [5, 33])
                db.run(insert, [5, 35])

                db.run(insert, [6, 36])
                db.run(insert, [6, 37])
                db.run(insert, [6, 38])
                db.run(insert, [6, 41])
                db.run(insert, [6, 42])
                db.run(insert, [6, 43])
                db.run(insert, [6, 44])

                db.run(insert, [7, 53])
                db.run(insert, [7, 65])
                db.run(insert, [7, 71])
                db.run(insert, [7, 73])
                db.run(insert, [7, 111])

                db.run(insert, [8, 53])
                db.run(insert, [8, 91])
                db.run(insert, [8, 95])
                db.run(insert, [8, 108])

                db.run(insert, [9, 53])
                db.run(insert, [9, 114])

                db.run(insert, [10, 53])
                db.run(insert, [10, 132])
                db.run(insert, [10, 135])
                db.run(insert, [10, 137])
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
          
                db.run(insert, ["Lloyd", 1, 1])
                db.run(insert, ["Fleming", 2, 1])
                db.run(insert, ["Ruddock", 3, 1])
                db.run(insert, ["Ricketts", 4, 1])
                db.run(insert, ["Blacker", 5, 1])
                db.run(insert, ["Rudock", 5, 0])
                db.run(insert, ["Avery", 6, 1])
                db.run(insert, ["Avery", 7, 1])
                db.run(insert, ["Fleming", 8, 1])
                db.run(insert, ["Page", 8, 0])
                db.run(insert, ["Lloyd", 9, 1])
                db.run(insert, ["Dabney", 10, 1])
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
                db.run(insert, ['Biology',1,1])
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
                var insert = `INSERT INTO user_option
                (user_id, option, is_major)
                VALUES (?,?,?)`
               
                db.run(insert, [1, "Applied Physics", 1])
                db.run(insert, [1, "Astrophysics", 0])
                db.run(insert, [2, "Chemical Engineering", 1])
                db.run(insert, [3, "CS", 1])
                db.run(insert, [3, "Information and Data Sciences", 0])
                db.run(insert, [4, "Mechanical Engineering", 1])
                db.run(insert, [5, "Materials Science", 1])
                db.run(insert, [6, "CS", 1])
                db.run(insert, [7, "Electrical Engineering", 1])
                db.run(insert, [7, "CS", 0])
                db.run(insert, [8, "Bioengineering", 1])
                db.run(insert, [9, "CS", 1])
                db.run(insert, [9, "Biology", 1])
                db.run(insert, [10, "Information and Data Sciences", 1])
            }
        });
        
        db.run(`CREATE TABLE division (
            division_id INTEGER PRIMARY KEY,
            division_name TEXT NOT NULL
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO division
                VALUES (?,?)`
                db.run(insert, [1, 'Biology and Biological Engineering'])
                db.run(insert, [2, 'Chemistry and Chemical Engineering'])
                db.run(insert, [3, 'Engineering and Applied Science'])
                db.run(insert, [4, 'Geological and Planetary Sciences'])
                db.run(insert, [5, 'Humanities and Social Sciences'])
                db.run(insert, [6, 'Physics, Mathematics, and Astronomy'])
            }
        });
        
        db.run(`CREATE TABLE faculty (
            division_id INTEGER,
            faculty_name TEXT,
            PRIMARY KEY(division_id, faculty_name),
            FOREIGN KEY(division_id) REFERENCES division(division_id)
        )`,

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO faculty
                (division_id, faculty_name)
                VALUES (?,?)`
                db.run(insert, [1, 'Ralph Adolphs'])
                db.run(insert, [1, 'John M. Allman'])
                db.run(insert, [1, 'Richard A. Andersen'])
                db.run(insert, [1, 'David J. Anderson'])

                db.run(insert, [2, 'Theodor Agapie'])
                db.run(insert, [2, 'Francis H. Arnold'])
                db.run(insert, [2, 'Jacqueline K. Barton'])
                db.run(insert, [2, 'Geoffrey Blake'])

                db.run(insert, [3, 'Yaser S. Abu-Mostafa'])
                db.run(insert, [3, 'Jess F. Adkins'])
                db.run(insert, [3, 'Aaron Ames'])
                db.run(insert, [3, 'Animashree Anandkumar'])

                db.run(insert, [4, 'Paul D. Asimow'])
                db.run(insert, [4, 'Jean-Philippe Avouac'])
                db.run(insert, [4, 'Konstantin Batygin'])
                db.run(insert, [4, 'Geoffrey A. (Geoff) Blake'])

                db.run(insert, [5, 'Marina Agranov'])
                db.run(insert, [5, 'Warren C. Brown'])
                db.run(insert, [5, 'Jed Z. Buchwald'])
                db.run(insert, [5, 'Colin F. Camerer'])

                db.run(insert, [6, 'Rana Adhikari'])
                db.run(insert, [6, 'Jason F. Alicea'])
                db.run(insert, [6, 'Fernando Brandao'])
                db.run(insert, [6, 'Katerina Chatziioannou'])
            }
        });
    }
});


module.exports = db
