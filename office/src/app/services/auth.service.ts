// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/admin'; // Replace with your API URL
  private tokenKey = 'oussama';
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  // Function to get approved Stade Owners
  getApprovedStadeOwners(): Observable<any[]> {
    const url = `${this.apiUrl}/stadeOwners/approved`;
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // Include the token in the request headers
    return this.http.get<any[]>(url, { headers });
  }
  viewPendingRegistrations(): Observable<any[]> {
    const url = `${this.apiUrl}/stadeOwners/pending`;
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }
  creteOwner(Data: any): Observable<any> {
    const url = `${this.apiUrl}/stadeOwner/addStadeOwner`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, Data, { headers });
  }
  acceptRegistration(userId: string): Observable<any> {
    const url = `${this.apiUrl}/stadeOwners/approve`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const body = { userId }; // Adjust the body structure based on your API requirements

    return this.http.put(url, body, { headers });
  }
  refuseRegistration(userId: string): Observable<any> {
    const url = `${this.apiUrl}/stadeOwners/approve/${userId}`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // const options = {
    //   headers,
    //   body: { userId }, // Adjust the body structure based on your API requirements
    // };

    return this.http.delete(url, { headers });
  }
    // Function to view all stades
  viewAllStades(): Observable<any[]> {
    const url = `${this.apiUrl}/stades`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(url, { headers });
  }
  // Function to create a pack
  createPack(packData: any): Observable<any> {
    const url = `${this.apiUrl}/packs`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, packData, { headers });
  }
  // Get all packs for admins
  getAllPacks(): Observable<any> {
    const url = `${this.apiUrl}/packs`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }
  // Function to delete a pack
  deletePack(packId: string): Observable<any> {
    const url = `${this.apiUrl}/packs/${packId}`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(url, { headers });
  }

  // Function to edit a pack
  editPack(packId: string, updatedPackData: any): Observable<any> {
    const url = `${this.apiUrl}/packs/${packId}`;
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(url, updatedPackData, { headers });
  }
  setAuthToken(token: string): void {

    localStorage.setItem(this.tokenKey, token);
  }
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated(): boolean {
    // For simplicity, you can check if the user has a token or any other authentication mechanism
    // You can modify this method based on your authentication requirements
    return localStorage.getItem(this.tokenKey) !== null;
  }
  removeAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  logout(): void {
    // Call any additional cleanup or backend logout logic if needed
    // ...

    // Remove the token from local storage
    this.removeAuthToken();
  }
  
  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
 }
}
