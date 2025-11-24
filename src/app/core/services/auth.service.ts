import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
private apiUrl = "http://localhost:3000/api/login";

    constructor(private http: HttpClient) {}
    login(username: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl, { username, password });
    }

    registrar(username: string, name: string, surname: string, email: string, password: string): Observable<any> {
      return this.http.post("http://localhost:3000/api/registro", { username, name, surname, email, password });
    }
}