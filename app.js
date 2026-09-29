async function load(){
 const r=await fetch('/api/requests'); const data=await r.json();
 total.textContent=data.length;
 waiting.textContent=data.filter(x=>x.status==='Bekliyor').length;
 list.innerHTML=data.map(x=>`<div class="row">
 <div><b>#${x.id}</b><br>${x.customer}</div>
 <div>${x.type}</div><div>₺${x.amount.toLocaleString('tr-TR')}<br><span class="badge">${x.status}</span></div>
 <button onclick="approve(${x.id})">Onayla</button></div>`).join('');
}
async function approve(id){
 await fetch('/api/requests/'+id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:'Onaylandı'})});
 load();
}
load();