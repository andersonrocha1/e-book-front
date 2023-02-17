import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.BASE_URL

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(cat_id: String):Observable<Livro[]> {
    const url = `${this.baseUrl}livros?categoria=${cat_id}`
    return this.http.get<Livro[]>(url)
  }

  findById(id: String):Observable<Livro> {
    const url = `${this.baseUrl}livros/${id}`
    return this.http.get<Livro>(url)
  }

  create(livro: Livro, cat_id: String):Observable<Livro> {
    const url = `${this.baseUrl}livros?categoria=${cat_id}`
    return this.http.post<Livro>(url, livro)

  }

  atualizar(livro: Livro):Observable<Livro> {
    const url = `${this.baseUrl}livros/${livro.id}`
    return this.http.put<Livro>(url, livro)
  }

  deletar(id: String):Observable<void> {
    const url = `${this.baseUrl}livros/${id}`
     return this.http.delete<void>(url)
  }
  mensagem(msg: String): void{
    this._snack.open(`${msg}`, 'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 6000
    })
  }
}
