import apiClient from 'services/apiClient';

export function fetchAdminDashboardData() {
  return apiClient.get('/dashboard/admin');
}
