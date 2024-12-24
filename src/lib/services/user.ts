import { fetchWithAuth } from './auth';

const BaseApiUrl = import.meta.env.VITE_API_URL;

// URLs
const usersUrl = `${BaseApiUrl}/users`;
const createUserUrl = `${BaseApiUrl}/create/user`;
const userPasswordUrl = `${BaseApiUrl}/update/userpass`;
const softDeleteUserUrl = `${BaseApiUrl}/user/delete`;
const enableUserUrl = `${BaseApiUrl}/user/enable`;
const disableUserUrl = `${BaseApiUrl}/user/disable`;
const updateUserRoleUrl = `${BaseApiUrl}/user/role`;
const createUserRoleUrl = `${BaseApiUrl}/create/role`;
const getAllRolesUrl = `${BaseApiUrl}/roles`;
const getAllPermissionsUrl = `${BaseApiUrl}/permissions`;

// Interfaces
export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  createdAt: string;
  lastModified: string;
  enabled: boolean;
  isDeleted: boolean;
}

export interface UserRoles {
  id: number;
  roleName: string;
  roleDesc: string;
  enabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  lastModified: string;
}

export interface AppPermission {
  id: number;
  permissionName: string;
  permissionDescription: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetchWithAuth(usersUrl, { method: 'GET' });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Enable user
export async function enableUser(targetUserId: number): Promise<ApiResponse<User>> {
  try {
    const body = { targetUserId };
    const response = await fetchWithAuth(enableUserUrl, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error('Error enabling user:', error);
    return { success: false, error: String(error) };
  }
}

// Disable user
export async function disableUser(targetUserId: number): Promise<ApiResponse<User>> {
  try {
    const body = {  targetUserId };
    const response = await fetchWithAuth(disableUserUrl, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error('Error disabling user:', error);
    return { success: false, error: String(error) };
  }
}

// Delete user
export async function deleteUserById(targetUserId: number): Promise<ApiResponse<User>> {
  try {
    const body = { targetUserId };
    const response = await fetchWithAuth(softDeleteUserUrl, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error('Error enabling user:', error);
    return { success: false, error: String(error) };
  }
}

// Update user role
export async function updateUserRole(targetUserId: number, roleId: number): Promise<ApiResponse<void>> {
  try {
    const body = { targetUserId, roleId };
    const response = await fetchWithAuth(updateUserRoleUrl, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await response.text());
    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: String(error) };
  }
}

// Create user role
export async function createUserRole(roleName: string, roleDescription: string): Promise<ApiResponse<void>> {
  try {
    const body = { roleName, roleDescription };
    const response = await fetchWithAuth(createUserRoleUrl, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await response.text());
    return { success: true };
  } catch (error) {
    console.error('Error creating user role:', error);
    return { success: false, error: String(error) };
  }
}

// Fetch all roles
export async function fetchRoles(): Promise<ApiResponse<UserRoles[]>> {
  try {
    const response = await fetchWithAuth(getAllRolesUrl, { method: 'GET' });
    if (!response.ok) throw new Error(await response.text());
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Error fetching roles:', error);
    return { success: false, error: String(error) };
  }
}

// Fetch all permissions
export async function fetchPermissions(): Promise<ApiResponse<AppPermission>> {
  try {
    const response = await fetchWithAuth(getAllPermissionsUrl, { method: 'GET' });
    if (!response.ok) throw new Error(await response.text());
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return { success: false, error: String(error) };
  }
}

export async function updateUserPassword(targetUserId: number, newPassword: string): Promise<ApiResponse<void>> {
  try {
    const body = { targetUserId, newPassword };
    const response = await fetchWithAuth(userPasswordUrl, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await response.text());
    return { success: true };
  } catch (error) {
    console.error('Error creating user role:', error);
    return { success: false, error: String(error) };
  }
}
