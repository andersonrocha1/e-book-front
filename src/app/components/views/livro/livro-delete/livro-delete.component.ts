import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

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

  atualizar(): void {
    this.service.atualizar(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.cat_id}/livros`])
      this.service.mensagem("Atualizado com sucesso!!")
    }, err => {
      this.router.navigate([`categorias/${this.cat_id}/livros`])
      this.service.mensagem("Falha ao atualizar, tente novamente!")
    })
  }
  deletar(): void {
    this.service.deletar(this.livro.id!).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.cat_id}/livros`])
      this.service.mensagem("Livro removido com sucesso!")
    }, err => {
      this.router.navigate([`categorias/${this.cat_id}/livros`])
      this.service.mensagem("Falha ao deletar livro, tente novamente!")
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.cat_id}/livros`])
  }
}
