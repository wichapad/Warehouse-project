const { app } = require("./server");
const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server connect in port : ${port}`);
});
