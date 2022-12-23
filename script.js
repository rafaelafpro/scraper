const form = document.getElementById('form');
const output = document.getElementById('output');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = document.getElementById('url').value;

  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const table = doc.querySelector('table');
      const rows = table.querySelectorAll('tr');
      const data = [];

      for (const row of rows) {
        const cols = row.querySelectorAll('td');
        const cells = [];
        for (const col of cols) {
          cells.push(col.textContent);
        }
        data.push(cells);
      }

      output.innerHTML = '';
      const processedTable = createTable(data);
      output.appendChild(processedTable);
    });
});

function createTable(data) {
  const table = document.createElement('table');

  for (const row of data) {
    const tr = document.createElement('tr');
    for (const cell of row) {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return table;
}
