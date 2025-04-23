import apiClient from '../../../services/apiClient';

export function fetchDashboardData() {
  return apiClient.get('/dashboard');
}
