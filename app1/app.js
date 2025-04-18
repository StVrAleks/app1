
const http = require("http");
const fs = require("fs");
const express = require("express"); // получаем модуль express
// создаем приложение express
const app = express();

const urlencodedParser = express.urlencoded({extended: true});

const jsonParser = express.json();
app.use(express.urlencoded({ extended: true }));

app.get("/page", function (_, response) {
        response.sendFile(__dirname + "/index.html");
    });

app.post("/stat", urlencodedParser, function (request, response) {
      const data = fs.readFileSync("voice.json");
      if(!data) {  // если возникла ошибка
          return console.log('/stat pysto', data);
      }
      console.log("/stat read", JSON.parse(data));
      //response.send(data);
      let clientData = JSON.parse(data);
            response.send(clientData);
    });

/*app.post("/stat", urlencodedParser, function (request, response) {
    fs.readFileSync("voice.json",  function(error,data){
        if(error) {  // если возникла ошибка
            return console.log(error);
        }

        console.log('view stat',data);
        let textList = JSON.parse(data); 
        response.send(textList);
    })  
   /*     const readableStream = fs.createReadStream("voice.json");
  
        readableStream.on("data", function(chunk){ 
            console.log('view stat',JSON.parse(chunk));
            response.end(chunk);});*/
 /* });*/
app.post("/voit", jsonParser, function (request, response) {
        if(!request.body) return response.sendStatus(400);
       console.log("request.body", request.body);
        let dishes = request.body.dish;   
       // let variants = {};
        if (dishes === 0)
        {
            console.log('/voit  no vibor');  
            response.status(401).end();
        }    
        //чтение
        const data = fs.readFileSync("voice.json");
        if(!data) {  // если возникла ошибка
            return console.log('pysto', data);
        }

        let clientData = JSON.parse(data); 
            clientData[dishes] = clientData[dishes] + 1;
                       
        //запись в файл
     /*   const writeableStream = fs.createWriteStream("voice.json");
              writeableStream.write(JSON.stringify(textList));
              writeableStream.end("\n");
            */  
           try{
           fs.writeFileSync("voice.json", JSON.stringify(clientData));
              console.log("/voit write to file", clientData);
           }
           catch (err) {
            console.log(err);
           }
        response.send(clientData);
    });

app.get("/variants", function (request, response) {
      //  let itemVariants = [{"code":1, "text":"Борщ"},{"code":2, "text":"Пельмени"},{"code":3, "text":"Конфетки, бараночки"},{"code":4, "text":"Мандарики, апельсинки"},{"code":5, "text":"Криветки, устрицы"}];
        fs.readFile("variants.json", 'utf8', function(error,data){
            if(error) {  // если возникла ошибка
                return console.log(error);
            }
            console.log('view variants',JSON.stringify(data));
            let clientData = JSON.parse(data);
            response.send(clientData);
        })   
    });
app.listen(7980, ()=>console.log("Сервер запущен по адресу http://localhost:7980"));