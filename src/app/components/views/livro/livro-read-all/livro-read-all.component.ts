import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];
  cat_id: String = ''
  livros: Livro[] =[]

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.cat_id = this.route.snapshot.paramMap.get('cat_id')!
    this.findAllByCategoria();
  }



  findAllByCategoria(): void {
      this.service.findAllByCategoria(this.cat_id).subscribe((resposta) => {
        this.livros = resposta
        console.log(resposta)
      })
  }

  irParaCadastrarLivro(): void {
    this.router.navigate([`categorias/${this.cat_id}/livros/create`])
  }

}
