const express = require('express');
const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Merchant - Recommendation Service API');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

