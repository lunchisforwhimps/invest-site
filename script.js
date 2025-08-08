const dataUrl = 'data.json';

async function loadData(){
  try{
    const res = await fetch(dataUrl);
    const data = await res.json();
    renderOverview(data);
    renderTable(data.holdings);
    renderCharts(data);
  }catch(e){
    console.error('Kunne ikke laste data.json', e);
  }
}

function nok(n){ return new Intl.NumberFormat('no-NO', { style:'currency', currency:'NOK', maximumFractionDigits:0}).format(n); }
function pct(x){ return (x>=0?'+':'') + x.toFixed(1) + '%'; }

function renderOverview(d){
  document.getElementById('totalValue').textContent = nok(d.summary.total_value);
  document.getElementById('ytdReturn').textContent = pct(d.summary.ytd_return_pct);
  document.getElementById('dividends').textContent = nok(d.summary.dividends_12m);
  document.getElementById('year').textContent = new Date().getFullYear();
}

function renderTable(rows){
  const tbody = document.getElementById('holdingsTable');
  tbody.innerHTML = '';
  rows.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.name}</td>
      <td>${r.sector}</td>
      <td>${nok(r.value_nok)}</td>
      <td>${pct(r.ytd_pct)}</td>
      <td>${(r.div_yield_pct).toFixed(1)}%</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCharts(d){
  const alloc = d.holdings.reduce((acc, h)=>{
    acc[h.sector] = (acc[h.sector]||0) + h.value_nok; return acc;
  }, {});
  const sectors = Object.keys(alloc);
  const values = sectors.map(s=>alloc[s]);

  new Chart(document.getElementById('allocationChart'), {
    type: 'doughnut',
    data: { labels: sectors, datasets: [{ data: values }] },
    options: { plugins:{ legend:{ position:'bottom' } }, cutout:'55%' }
  });

  const months = d.history.map(x=>x.label);
  const series = d.history.map(x=>x.value_nok);
  new Chart(document.getElementById('growthChart'), {
    type: 'line',
    data: { labels: months, datasets: [{ label:'Porteføljeverdi', data: series, tension:0.25 }]},
    options: { plugins:{ legend:{ display:true } }, scales:{ y:{ ticks:{ callback:(v)=> new Intl.NumberFormat('no-NO').format(v) } } } }
  });
}

loadData();
