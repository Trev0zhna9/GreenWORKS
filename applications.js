function renderApplicationsTable() {
  const apps = getApplications();
  const tbody = document.querySelector("#applicationsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  if (apps.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Пока нет заявок. Заполните форму на сайте.</td></tr>';
    return;
  }
  apps.forEach(app => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = app.name;
    row.insertCell(1).textContent = app.phone;
    row.insertCell(2).textContent = app.email;
    row.insertCell(3).textContent = app.coworkingName;
    row.insertCell(4).textContent = app.date;
    const delCell = row.insertCell(5);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => {
      let updated = getApplications().filter(a => a.id !== app.id);
      saveApplications(updated);
      renderApplicationsTable();
    };
    delCell.appendChild(delBtn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderApplicationsTable();
});