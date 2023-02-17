import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

 categoria: Categoria = {

  id: '',
  nome: '',
  descricao: ''

 }

 constructor(private service: CategoriaService, private route: ActivatedRoute,
  private router: Router){}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {

    this.service.findById(this.categoria.id!).subscribe((resposta) => {
        this.categoria.nome = resposta.nome
        this.categoria.descricao = resposta.descricao
    })

  }

  atualizar(): void{
    this.service.atualizar(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias'])
      this.service.mensagem("Categoria atualizada com sucesso!")
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    })
  }

  cancelar(): void {
    this.router.navigate(['categorias'])
  }

}
