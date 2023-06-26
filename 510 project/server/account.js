const express = require('express');
var router = express.Router();
var { exec, sql, transaction } = require("./connect-db");
var msg = require("./message");
const fs = require('fs');

var uid = '';
var courseIds = [];
router.all('*', async (req, res, next) => {
    // console.log(req.headers['token']);
    let result = await exec(sql.table('user').where({ token: req.headers['token'] }).select());
    if (result.length === 0) {
        res.send(msg.error('Invalid token！'));
        return;
    }
    uid = result[0].id;
    courseIds = JSON.parse(result[0].courseIds || '[]');
    res.status(200);
    next();
});

router.post('/events', async (req, res) => {
    try {
        let result = await exec(sql.table('events').select());
        let record = [];
        if (result.length > 0 && req.body.datas.length > 0) {
            req.body.datas.forEach((ref) => {
                let status = false;
                result.forEach(item => {
                    if (item.academic_session == ref.academic_session && item.course == ref.course && item.type == ref.type && item.date == ref.date
                        && item.time == ref.time && item.location == ref.location) {
                        status = true;
                    }
                })
                if (!status) record.push(ref);
            });
        }
        if (record.length > 0) {
            let data = await exec(sql.table('events').data(record).insert());
            if (data) {
                res.send(msg.success({}, 'Created successfully！'));
            }
        } else {
            res.send(msg.error('Record already exists!'));
        }
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.post('/delete/events', async (req, res) => {
    try {
        req.body.ids.map(async (item) => {
            await exec(sql.table('events').where(
                { id: item }
            ).delet());
        });
        res.send(msg.success({}, 'Delete successfully！'));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.post('/export/events', async (req, res) => {
    try {
        let data = await exec(sql.table('events').select());
        res.send(msg.success(data, 'Export successfully！'));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/academicSessionList', async (req, res) => {
    try {
        let result = await exec(sql.table('academic_session').select());
        let data = await exec(sql.table('academic_session').page(req.query.pageIndex, 10).select());
        res.send(msg.success({ list: data, total: result.length }));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.post('/delete/academicSession', async (req, res) => {
    try {
        let data = await exec(sql.table('academic_session').where({ id: req.body.id }).delet());
        res.send(msg.success('Delete successfully！'));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.post('/add/academicSession', async (req, res) => {
    try {
        let data = await exec(sql.table('academic_session').data({ academicSession: req.body.academicSession }).insert());
        res.send(msg.success('Add successfully！'));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.post('/addCourse', async (req, res) => {
    try {
        courseIds.push(req.body.courseId);
        if (req.body.coverId) {
            courseIds = courseIds.filter((id) => (id != req.body.coverId));
        }
        let data = await exec(sql.table('user').data({ courseIds: JSON.stringify(courseIds) }).where({ id: uid }).update());
        res.send(msg.success(data, 'Add course successfully！'));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.post('/deleteCourse', async (req, res) => {
    try {
        let data = await exec(sql.table('user').data({ courseIds: JSON.stringify(courseIds.filter(item => (item != req.body.courseId))) }).where({ id: uid }).update());
        res.send(msg.success(data, 'Delete course successfully！'));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/courseIds', async (req, res) => {
    try {
        res.send(msg.success(courseIds));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/courseList', async (req, res) => {
    try {
        if (courseIds.length > 0) {
            let result = await exec(sql.table('events').where(courseIds.map((item) => ({ id: item, course: { like: `%${req.query.course || ''}%` }, academic_session: { like: `%${req.query.academicSession || ''}%` }, _nexttype: 'or' }))).select());
            let datas = await exec(sql.table('events').where(courseIds.map((item) => ({ id: item, course: { like: `%${req.query.course || ''}%` }, academic_session: { like: `%${req.query.academicSession || ''}%` }, _nexttype: 'or' }))).page(Number(req.query.pageIndex), 10).select());
            res.send(msg.success({ list: datas, total: result.length }));
        } else {
            res.send(msg.success([]));
        }
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/allCourseList', async (req, res) => {
    try {
        if (courseIds.length > 0) {
            let result = await exec(sql.table('events').where(courseIds.map((item) => ({ id: item, _nexttype: 'or' }))).select());
            res.send(msg.success({ list: result }));
        } else {
            res.send(msg.success([]));
        }
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/events', async (req, res) => {
    try {
        let searchValue = [
            {
                course: { like: `%${req.query.searchValue || ''}%` },
                _nexttype: 'or'
            }, {
                location: { like: `%${req.query.searchValue || ''}%` },
                _nexttype: 'or'
            },
            {
                type: { like: `%${req.query.searchValue || ''}%` },
                _nexttype: 'or'
            },
            {
                date: { like: `%${req.query.searchValue || ''}%` },
                _nexttype: 'or'
            },
            {
                academic_session: { like: `%${req.query.searchValue || ''}%` },
                _nexttype: 'or'
            }

        ];
        let datas = await exec(sql.table('events').where(searchValue).select());
        let data = await exec(sql.table('events').where(searchValue).page(Number(req.query.pageIndex), 10).select());
        res.send(msg.success({ list: data, total: datas.length }));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/academicSession', async (req, res) => {
    try {
        let data = await exec(sql.table('academic_session').select());
        res.send(msg.success(data || []));
    } catch (e) {
        res.send(msg.error(e));
    }
});

router.get('/allWeek', async (req, res) => {
    try {
        let data = await exec(sql.table('events').select());
        let arr = data.map((item)=> (item.date));
        let weeks = [...new Set(arr)];
        res.send(msg.success(weeks || []));
    } catch (e) {
        res.send(msg.error(e));
    }
});

module.exports = router;