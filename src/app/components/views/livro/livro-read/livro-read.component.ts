import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  cat_id: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    descricao: '',
    texto: ''
  }

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cat_id = this.route.snapshot.paramMap.get('cat_id')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.cat_id}/livros`])
  }
}
