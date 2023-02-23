let now = new Date();
const nowtime = `${now.getFullYear()}.${
  now.getMonth() + 1
}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;
const express = require("express");
const app = express();
const path = require("path");
var file = [];
var child_process = require("child_process");
let fs = require("fs");
const shell = require("shelljs");
var mysql = require("mysql2");
const { Console } = require("console");
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
var MySQLStore = require("express-mysql-session")(session);
app.use(cookieParser("asdfasffdas"));

var options = {
  host: "10.0.20.120",
  port: 3306,
  user: "manager",
  password: "pw123",
  database: "AlgoDB"
};
var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "asdfasffdas",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  })
);

var connection = mysql.createConnection({
  host: "10.0.20.120",
  user: "manager",
  password: "pw123",
  database: "AlgoDB"
});

connection.connect();
app.listen(8080, function () {
  console.log("listening on 8080");
});

app.use(express.json());
var cors = require("cors");
const { writeFile } = require("fs");
const { Session } = require("express-session");
const { request } = require("http");
app.use(cors());

app.use(express.static(path.join(__dirname, "../app/build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "../app/build/index.html"));
});

app.post("/code", function (request, response) {
  const uid = request.session.uid;
  var newFile = {
    text: request.body.code1,
    option: request.body.selectedOption,
    quizId: request.body.quizId
  };
  let data = newFile.text;
  let filename = "Main";
  let lang = "";
  let username = uid;
  let quiznum = newFile.quizId;
  console.log(quiznum);
  let timelimit = "5";
  let time = "";
  let now = new Date();
  console.log(newFile)
  const nowtime = `${now.getFullYear()}.${
    now.getMonth() + 1
  }.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;
  // let memlimit = ""
  if (newFile.option === "python") {
    lang = "py";
    time = `# ${Date.now()}\n`;
  } else if (newFile.option === "java") {
    lang = "java";
    time = `// ${Date.now()}\n`;
  } else {
    lang = "cpp";
    time = `// ${Date.now()}\n`;
  }
  fs.writeFileSync(
    `./codefile/${newFile.option}_pipeline/${filename}.${lang}`,
    time,
    "utf-8"
  );
  fs.appendFileSync(
    `./codefile/${newFile.option}_pipeline/${filename}.${lang}`,
    data,
    "utf-8"
  );
  file.push(newFile);
  console.log(file);
  shell.exec(`./autopush.sh ${newFile.option} ${quiznum} ${username} ${timelimit}`);
  connection.query(
    `INSERT into solve(questionnum, submitter, language, submissiontime, code) VALUES(${quiznum},"${username}","${newFile.option}","${nowtime}",'${data}') on duplicate key update code='${data}', language="${newFile.option}", submissiontime="${nowtime}", result=""`,
    function (error, results) {
      if (error) throw error;
    }
  );
});

//manger 출제문제 받아오기
app.get("/manager/sel", (req, res) => {
  console.log(req.session.uid);
  connection.query(
    `SELECT * from question where presenter="${req.session.uid}"`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
// managerM 에서 db 정보 받아오기
app.get("/manager/modi", (req, res) => {
  connection.query(
    `SELECT * from question where questionnum=${req.query.questionnum}`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
//managerN 작성 완료 후 추가
app.get("/manager/insert", async (req, res) => {
  let [results] = await connection.promise().query(`INSERT INTO question(
    title, trynum, correctnum, timelimit, memlimit, explanation, creationtime, presenter,input,output, groupName)
  VALUES ("${req.query.title}","0","0","${req.query.timelimit}","${req.query.memlimit}",'${req.query.explanation}',"${nowtime}","${req.session.uid}",'${req.query.input}','${req.query.output}','${req.query.groupName}');
    `);
  //   , function (error, results, fields) {
  //   if (error) throw error;
  // });

  //  connection.query(`SELECT questionnum from question where title="${req.query.title}" ORDER BY creationtime DESC LIMIT 1`
  //     ,function (error, results, fields) {
  //     if (error) throw error;
  //     console.log(results)
  //     shell.exec(`./mkdir.sh ${results.questionnum}`);
  //  });

  connection.query(
    `SELECT input,output from question where title="${req.query.title}" order by creationtime desc limit 1`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      console.log(results[0].input);
      // fs.writeFileSync(`../../../case/test/in1.txt`, results.in, "utf-8");
    }
  );
});
app.get("/manager/tc", (req, res) => {
  console.log(req.query.title);
  connection.query(
    `SELECT questionnum,input,output from question where title="${req.query.title}" order by creationtime desc limit 1`,
    function (error, results, fields) {
      if (error) throw error;
      shell.exec(`./mkdir.sh ${results[0].questionnum}`);
      fs.writeFileSync(
        `../../../case/${results[0].questionnum}/in1.txt`,
        results[0].input,
        "utf-8"
      );
      fs.writeFileSync(
        `../../../case/${results[0].questionnum}/out1.txt`,
        results[0].output,
        "utf-8"
      );
      fs.writeFileSync(
        `../../../case/${results[0].questionnum}/result1.txt`,
        "",
        "utf-8"
      );
    }
  );
});
//managerM 수정완료후 db update
//수정후 테스크 케이스 1번 추가해야댐
app.get("/manager/modi/run", (req, res) => {
  connection.query(
    `UPDATE question SET title="${req.query.title}", timelimit="${req.query.timelimit}", memlimit="${req.query.memlimit}", input='${req.query.input}', output='${req.query.output}', explanation='${req.query.explanation}' WHERE questionnum = ${req.query.questionnum};`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      fs.writeFileSync(
        `../../../case/${req.query.questionnum}/in1.txt`,
        req.query.input,
        "utf-8"
      );
      fs.writeFileSync(
        `../../../case/${req.query.questionnum}/out1.txt`,
        req.query.output,
        "utf-8"
      );
    }
  );
});
//manager 해당 데이터 삭제
// 테스트케이스도 삭제하는 행 추가해야됌
app.get("/manager/del", (req, res) => {
  connection.query(
    `DELETE FROM question WHERE questionnum = ${req.query.questionnum};`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
  // fs.rmdirSync(`../../../case/${req.query.questionnum}`, {recursive : true});
});

app.get("/testcase/add", (req, res) => {
  dir = `../../../case/${req.query.questionnum}`;
  fs.readdir(dir, (err, files) => {
    const filenum = parseInt(files.length / 3) + 1;
    fs.writeFileSync(`${dir}/in${filenum}.txt`, req.query.input, "utf-8");
    fs.writeFileSync(`${dir}/out${filenum}.txt`, req.query.output, "utf-8");
    fs.writeFileSync(`${dir}/result${filenum}.txt`, "", "utf-8");
    //파일 이름`in${files.length/3+2}` 내용 req.query.input
    //파일 이름`out${files.length/3+2}` 내용 req.query.output
    //파일 이름`result${files.length/3+2}` 내용 ""
  });
});
//파일 읽어오기
app.get("/testcase/read", (req, res) => {
  filePath = `../../../case/${req.query.questionnum}`;
  const response = { input: "", output: "" };
  let data1 = fs.readFileSync(`${filePath}/in${req.query.num}.txt`, "utf-8");
  let data2 = fs.readFileSync(`${filePath}/out${req.query.num}.txt`, "utf-8");
  response.input = data1;
  response.output = data2;
  res.json(response);
});
//파일 수정
app.get("/testcase/modi", (req, res) => {
  fs.writeFileSync(
    `../../../case/${req.query.questionnum}/in${req.query.num}.txt`,
    req.query.input,
    "utf-8"
  );
  fs.writeFileSync(
    `../../../case/${req.query.questionnum}/out${req.query.num}.txt`,
    req.query.output,
    "utf-8"
  );
});

app.get("/solveDB", (req, res) => {
  const uid = req.session.uid;
  console.log(req.query.questionnum);
  connection.query(
    `SELECT * from solve where questionnum = ${req.query.questionnum} and submitter="${uid}" order by submissiontime desc limit 1`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});
app.get("/solveDB/insert", (req, res) => {
  connection.query(
    `INSERT into solve(questionnum, submitter, language, submissiontime) VALUES(${req.query.questionnum},${req.query.questionnum},${req.query.language},${nowtime})`,
    function (error, results) {
      if (error) throw error;
    }
  );
  console.log(nowtime);
});
app.get("/DBcheck", (req, res) => {
  connection.query(`SELECT * from solve`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/quizDB", (req, res) => {
  connection.query(
    "SELECT * from question where groupName is null order by questionnum desc",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get('/manager/groupId', (req, res) => {
  connection.query(
    `select * from groupUser where groupname = (select groupName from question where questionnum = '${req.query.questionnum}')`,
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/groupQuizDB", (req, res) => {
  const group = req.session.groupName;
  console.log('groupQuizDB');
  console.log(group);
  connection.query(
    `select * from question where groupName = '${group}'`,
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/groupSelect", (req,res)=> {
  req.session.groupName = req.query.groupname;
  console.log('groupSelect');
  console.log(req.session.groupName);
  req.session.save( function() {
    console.log('save');
    res.json();
  }
  );
})

app.get("/popularquizDB", (req, res) => {
  connection.query(
    "SELECT * from question where groupName is null ORDER BY CAST(trynum AS signed integer) desc limit 5;",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});
app.get("/ranking", (req, res) => {
  connection.query(
    "SELECT submitter, COUNT(*) AS count_yes from solve where result = 'yes' group by submitter order by count_yes desc limit 5;",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/hardquizDB", (req, res) => {
  connection.query(
    "SELECT * from question where groupName is null ORDER BY correctnum/trynum desc",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/uniquequizDB", (req, res) => {
  connection.query(
    "SELECT * from question  WHERE groupName is null and correctnum = 0",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/history", (req, res) => {
  const uid = req.session.uid;
  connection.query(
    `select code, result from solve where questionnum = ${req.query.questionnum} and submitter="${uid}" order by submissiontime desc limit 1`,
    function (error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

// 회원가입 요청
app.post("/join", async (req, res) => {
  // green1234
  console.log("join");
  let myPlaintextPass = req.body.userpass;
  let myPass = "";
  if (myPlaintextPass != "" && myPlaintextPass != undefined) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPass, salt, function (err, hash) {
        // Store hash in your password DB.
        myPass = hash;
        console.log(myPass);
        // 쿼리 작성s
        const { username, userid, userstate, usermail, usermanager } = req.body;
        // connection.query 인자 첫번째: 쿼리문, 두번째: 쿼리문에 들어갈 값, 세번째: 처리 되면 하는 애
        connection.query(
          "insert into user(id, pw, name, email, state, manager, group) values(?,?,?,?,?,?,'default')",
          [userid, myPass, username, usermail, userstate, usermanager],
          (err, result, fields) => {
            console.log(result);
            console.log(err);
            res.send("등록되었습니다.");
          }
        );
      });
    });
  }
});

app.post("/login_process", function (request, response) {
  var username = request.body.loginID;
  var password = request.body.loginPassword;
  console.log("login_process");
  if (username && password) {
    // id와 pw가 입력되었는지 확인
    connection.query(
      `SELECT manager,pw,groupName FROM user WHERE id = "${username}"`,
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          // db에서의 반환값이 있으면 비밀번호 조회
          bcrypt.compare(password, results[0].pw, function (err, result) {
            if (result) {
              console.log("login");
              request.session.uid = username;
              request.session.author_id = results[0].manager;
              request.session.groupName = 'alpha';
              request.session.save(function () {});
              response.json({ message: "success" });
            } else {
              response.json({ messsage: "failed" });
            }
          });
        } else {
          response.json({ messsage: "failed" });
        }
      }
    );
  } else {
    response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
      document.location.href="/auth/login";</script>`);
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  console.log("session destroy");
});

app.use(
  session({
    secret: "@codestates",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.post("/duplicate", (req, res) => {
  console.log(req.body.params.id);
  connection.query(
    `SELECT * from user where id="${req.body.params.id}"`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post("/session_check", (req, res) => {
  const sessiondata = {
    uid: req.session.uid,
    author_id: req.session.author_id
  };
  res.json(sessiondata);
});

//myPage 푼 문제 받아오기
app.get("/mySolve",(req, res) => {
  connection.query(
    `SELECT questionnum, submissiontime from solve where submitter="${req.session.uid}" and result = "yes" order by submissiontime desc`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    })
})
app.get("/mySolve2",(req, res) => {
  connection.query(
    `SELECT questionnum, submissiontime from solve where submitter="${req.query.id}" and result = "yes" order by submissiontime desc`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    })
})
//myPage 개인정보 받아오기
app.get("/profile",(req, res)=>{
  connection.query(
    `SELECT * from user where id="${req.session.uid}"`,
    function(error, results){
      if(error) throw error;
      res.json(results);
    }
  )
})
app.get("/profile2",(req, res)=>{
  connection.query(
    `SELECT * from user where id="${req.query.id}"`,
    function(error, results){
      if(error) throw error;
      res.json(results);
    }
  )
})

app.get("/group",(req, res)=>{
  connection.query(
    `SELECT groupname from groupUser where GroupUserId="${req.session.uid}"`,
    function(error, results){
      if(error) throw error;
      console.log(results);
      res.json(results);
    }
  )
})
app.get("/group2",(req, res)=>{
  connection.query(
    `SELECT groupname from groupUser where GroupUserId="${req.query.id}"`,
    function(error, results){
      if(error) throw error;
      console.log(results);
      res.json(results);
    }
  )
})

app.get("/manager/addMember",(req, res)=>{
  connection.query(
    `insert ignore into groupUser(groupname, groupUserId) values('${req.query.groupName}','${req.query.newUser}')`,
    function(error, results){
      if(error) throw error;
      res.json(results);
    }
  )
})


// React Router 사용
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "../app/build/index.html"));
});
