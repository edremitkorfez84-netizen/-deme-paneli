const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// public klasörünü yayınla
app.use(express.static(path.join(__dirname, "public")));

let requests = [
  {
    id: 1001,
    type: "Para Yatırma",
    customer: "Demo Kullanıcı",
    amount: 1500,
    status: "Bekliyor"
  },
  {
    id: 1002,
    type: "Para Çekme",
    customer: "Örnek Kullanıcı",
    amount: 750,
    status: "Bekliyor"
  }
];

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Talepleri getir
app.get("/api/requests", (req, res) => {
  res.json(requests);
});

// Talep durumunu güncelle
app.patch("/api/requests/:id", (req, res) => {
  const item = requests.find(
    (x) => x.id === Number(req.params.id)
  );

  if (!item) {
    return res.status(404).json({ error: "Talep bulunamadı" });
  }

  if (req.body.status) {
    item.status = req.body.status;
  }

  res.json(item);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
