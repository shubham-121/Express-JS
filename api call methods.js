const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //middleware for accesing the req. Used while posting data to the server (used in line no.-29)
// app.get('/',(req,res)=>{
// res.status(200).json({message:"<h1>hello from the server</h1>", app:"natours"})

// })

// app.post('/',(req,res)=>{
//     res.send("Post method")

// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// tours.forEach((element) => {
//   console.log(element.id);
// });

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    result: `total tours here ${tours.length}`,
    data: { tours },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); //create new obj by merging exsisting obj together
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //console.log(req.body)
  // res.send('sended data');
});

app.listen(3000, () => {
  console.log('port started at server 3000');
});
