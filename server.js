const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let requests = [
  {
    id: 1001,
    type: 'Para Yatırma',
    customer: 'Demo Kullanıcı',
    amount: 1500,
    status: 'Bekliyor'
  },
  {
    id: 1002,
    type: 'Para Çekme',
    customer: 'Örnek Kullanıcı',
    amount: 750,
    status: 'Bekliyor'
  }
];

uygulama.get('/', (req, res) => {
  app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.patch('/api/requests/:id', (req, res) => {
  const item = requests.find(
    x => x.id === Number(req.params.id)
  );

  if (!item) {
    return res.status(404).json({ error: 'Talep bulunamadı' });
  }

  if (req.body.status) {
    item.status = req.body.status;
  }

  res.json(item);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Panel ${PORT} portunda çalışıyor`);
});
