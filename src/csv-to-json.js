const fs = require('fs');
const csv = require('csv-parser');

const comuni = [];
const provinceMap = new Map(); // Per raccogliere province uniche

fs.createReadStream('Superfici territoriali (IT1,DCCV_CARGEOMOR_ST_COM,1.0) (2).csv') 
  .pipe(csv({ separator: ',', quote: '"' }))
  .on('data', (row) => {
    const comuneNome = row['Territorio'].trim();

    // Qui si assume che il nome della provincia sia uguale al comune per dataset piccoli
    // Puoi aggiungere una mappatura nome comune -> sigla provincia se vuoi
    const sigla = comuneNome.substring(0, 2).toUpperCase(); // esempio provvisorio
    const provinciaNome = comuneNome;

    // Aggiungi al JSON dei comuni
    comuni.push({
      nome: comuneNome,
      provincia: provinciaNome,
      sigla: sigla
    });

    // Aggiungi alla mappa delle province
    if (!provinceMap.has(sigla)) {
      provinceMap.set(sigla, {
        sigla: sigla,
        nome: provinciaNome
      });
    }
  })
  .on('end', () => {
    // Salva comuni.json
    fs.writeFileSync('comuni.json', JSON.stringify(comuni, null, 2));

    // Salva province.json
    const province = Array.from(provinceMap.values());
    fs.writeFileSync('province.json', JSON.stringify(province, null, 2));

    console.log('JSON creati con successo: comuni.json e province.json');
  });
