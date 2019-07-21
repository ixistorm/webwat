var express = require("express");
var router = express.Router();
import connection from "../config/database";

/* GET home page. */
router.get("/index", function (req, res, next) {
  const sql = `SELECT banners.id, users.id AS user_id,
                users.name AS banner_name,
                banners.title, banners.path, banners.status
              FROM 
                banners 
              INNER JOIN 
                users ON banners.user_id = users.id
              WHERE banners.status = 1
              ORDER BY 
                banners.id DESC;
              SELECT news.id, news.title,
                news.thumbnail,
                users.id AS user_id,
                users.name AS users_name,
                categories.id AS category_id,
                categories.name AS category_name,
                news.created_at, news.updated_at
              FROM
                news 
              INNER JOIN users ON news.user_id = users.id
              INNER JOIN categories ON news.category_id = categories.id
              WHERE categories.id = 1
              ORDER BY news.id DESC LIMIT 5;
              SELECT news.id, news.title,
                news.thumbnail,
                users.id AS user_id,
                users.name AS users_name,
                categories.id AS category_id,
                categories.name AS category_name,
                news.created_at, news.updated_at
              FROM
                news 
              INNER JOIN users ON news.user_id = users.id
              INNER JOIN categories ON news.category_id = categories.id
              WHERE categories.id = 2 
              ORDER BY news.id DESC LIMIT 5;
              SELECT news.id, news.title,
                news.thumbnail,
                users.id AS user_id,
                users.name AS users_name,
                categories.id AS category_id,
                categories.name AS category_name,
                news.created_at, news.updated_at
              FROM
                news 
              INNER JOIN users ON news.user_id = users.id
              INNER JOIN categories ON news.category_id = categories.id
              ORDER BY news.id DESC LIMIT 3;
              `;
  connection.query(sql, (error, result) => {
    if (error) return res.send(error.message)

    res.render("index", { banners: result[0], publics: result[1], activities: result[2], features: result[3] });
  })
});

router.get('/show', (req, res) => {
  res.render("show");
})

router.get('/', (req, res) => {
  res.render("popindex");
})

router.get('/historywat', (req, res) => {
  res.render("historywat");
})

router.get('/creator', (req, res) => {
  res.render("creator");
})

router.get('/phrasing', (req, res) => {
  res.render("phrasing");
})


router.get('/new', (req, res) => {
  res.render("new");
})

router.get("/news/:id", (req, res, news) => {
  const { id } = req.params;
  const sql = `SELECT 
                news.id, news.title,
                news.thumbnail, news.detail,
                news.created_at, news.updated_at,
                categories.id AS category_id,
                categories.name AS category_name,
                users.id AS users_id,
                users.name AS user_name
              FROM news 
              INNER JOIN categories ON news.category_id = categories.id
              INNER JOIN users ON news.user_id = users.id
              WHERE news.id = ?`;
  connection.query(sql, [id], (error, result) => {
    if (error) return res.send(error.message);
    res.json(result);
  });
});

module.exports = router;
