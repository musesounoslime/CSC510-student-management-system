# CSC510-student-management-system
NCSU CSC510 final project, Angular + Node.js:
1. Admin can add semester and course.
2. Student can enroll courses, courses will be shown at the right of enroll page, which is similar with NCSU wolfpack.
3. Implemented unit test.

Steps:
1. Run "npm i" in the gui folder.
2. Run "npm i" in the server folder.
3. Use a MySQL GUI tool MySQL Workbench, create a new table "timetabler", coding use utf-8, then run "timetaber.sql" at "server" folder
4. Change /server/connect-db.js line 5 and line 6 to your local MySQL's user and password.
5. run "ng serve --open" in the gui folder.
6. run "npm run start" in the server folder.
7. Name and Password "admin" "admin" is administrator user.
8. Student user can be signed up manually at the gui, user Name: "student" Password: "student" in the database.
