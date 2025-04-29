// src/features/dashboard/user/services/userDashboardService.js
import apiClient from 'services/apiClient';

/**
 * Fetch whatever data your user dashboard needs.
 * Adjust the endpoint and return shape as necessary.
 */
export function fetchUserDashboardData() {
  return apiClient.get('/dashboard/user');
}