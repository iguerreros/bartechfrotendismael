import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../modelos/producto';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  productos: Producto[] = [];
  roles: string[];
  isLogged = false;
  nombreUsuario = '';
  rows =[];
  isAdmin = false;
  nombre;
  precio;
  producto = {id:null,nombre: null, precio: null}
  constructor(
  
    private router : Router,
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      
        this.cargarProductos();
        this.roles = this.tokenService.getAuthorities();
        this.roles.forEach(rol => {
          if (rol === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
        });

        this.nombreUsuario = this.tokenService.getUserName();
    } else {
        this.router.navigate(['login/']);
    }
    
  }

  
  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.rows = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  detalle(row){

  }
  editar(row){
       this.producto.id = row.id;
       this.producto.nombre = row.nombre;
       this.producto.precio = row.precio;
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  guardarProducto(){
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

  
  onUpdate(): void {
 
    this.productoService.update(this.producto.id, this.producto).subscribe(
      data => {
        this.toastr.success('Producto Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

}
