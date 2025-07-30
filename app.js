document.addEventListener('DOMContentLoaded', () => {
  fetchEmployees();

  document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const newEmployee = {
      name: form.name.value,
      id: form.id.value,
      email: form.email.value,
      phone: form.phone.value,
      department: form.department.value,
      position: form.position.value,
      salary: form.salary.value,
      startDate: form.startDate.value,
      status: form.status.value
    };

    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    });

    if (res.ok) {
      alert('Employee added successfully');
      form.reset();
      toggleForm();
      fetchEmployees();
    } else {
      alert('Failed to add employee');
    }
  });
});

function toggleForm() {
  const form = document.getElementById('employeeForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function fetchEmployees() {
  fetch('/api/employees')
    .then(res => res.json())
    .then(data => renderEmployees(data));
}

function renderEmployees(employees) {
  const list = document.getElementById('employeeList');
  list.innerHTML = '';
  employees.forEach(emp => {
    list.innerHTML += `
      <div class="employee">
        <strong>${emp.name}</strong><br>
        ${emp.email} <br>
        ID: ${emp.id} <br>
        Department: ${emp.department} <br>
        Position: ${emp.position} <br>
        Salary: ${emp.salary} <br>
        Start Date: ${emp.startDate || 'N/A'} <br>
        Status: ${emp.status || 'N/A'}
      </div>
    `;
  });
}
