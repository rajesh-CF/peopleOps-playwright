import employees from '../test-data/bench-analytics-employees.json';

export function getEmployeesWithUtilizationBelow(percent: number) {
  return employees.filter(e => e.utilization < percent);
}

export function getBenchEmployees() {
  return employees.filter(e => e.utilization < 100 && e.status === 'active');
}

export function getInactiveEmployees() {
  return employees.filter(e => e.status === 'inactive');
}
