
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.BASE_URL;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<Categoria[]> {
  const url = `${this.baseUrl}categorias`
    return this.http.get<Categoria[]>(url)
  }

  findById(id: String): Observable<Categoria> {

    const url = `${this.baseUrl}categorias/${id}`
    return this.http.get<Categoria>(url)

  }

  create(categoria: Categoria):Observable<Categoria> {
    const url = `${this.baseUrl}categorias`
    return this.http.post<Categoria>(url, categoria);

  }

  atualizar(categoria: Categoria):Observable<void> {

    const url = `${this.baseUrl}categorias/${categoria.id}`
    return this.http.put<void>(url, categoria)

  }

  deletar(id: String):Observable<void> {
    const url = `${this.baseUrl}categorias/${id}`
    return this.http.delete<void>(url);
}

  mensagem(msg: String): void{
      this._snack.open(`${msg}`, 'OK',{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 6000
      })
  }


}
