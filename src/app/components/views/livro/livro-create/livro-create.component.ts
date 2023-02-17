import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {
  cat_id: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    descricao: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(5)])
  nome_autor = new FormControl('', [Validators.minLength(5)])
  descricao = new FormControl('', [Validators.minLength(10)])
  texto = new FormControl('', [Validators.minLength(16)])

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cat_id = this.route.snapshot.paramMap.get('cat_id')!
  }

  create(): void {
    this.service.create(this.livro, this.cat_id).subscribe((resposta) => {
        this.router.navigate([`categorias/${this.cat_id}/livros`])
        this.service.mensagem("Livro cadastrado com sucesso!")
    }, err => {
      this.router.navigate([`categorias/${this.cat_id}/livros`])
      this.service.mensagem("Falha ao cadastrar livro, tente novamente!")
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.cat_id}/livros`])
  }

  getMessage() {
    if(this.titulo.invalid){
      return "O campo Título, precisa de no mínimo 5 caracteres!"
    }else if(this.nome_autor.invalid){
      return "O campo Autor precisa de no mínimo 5 caracteres"
    }else if(this.descricao.invalid){
      return "O campo Descrição precisa de no mínimo 10 caracteres"
    }else if(this.texto.invalid){
      return "O campo Texto precisa de no mínimo 16 caracteres"
    }
    return false
  }

}
