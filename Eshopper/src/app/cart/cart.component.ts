import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart, ProductOrder, ProductOrders, Tailles } from '../models/model';
import { CartService } from '../Services/cart.service';
import { OrderService } from '../Services/order.service';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  carts!: Cart[];
  cart!:Cart ;
  cartLength = 0;
  total!: number;
  sub!: Subscription;
  id : any;
  cards !:Cart[];
  catcurrent : any;
  tailles!: Tailles[] ;
  constructor(private token: TokenStorageService, private route: Router,
    private cartService: CartService) {
    this.total = 0;
  }
  ngOnInit(): void {
  
    this.currentUser = this.token.getUser();
    this.cartService.findCartsForUser(this.currentUser.id).subscribe(carts => {
      this.carts = carts;
      this.cartLength = this.carts.length;    
      this.calculateTotal();
    });
  }

  taille(cart:Cart, id :any ){  
  
    console.log("dddddddddd",this.catcurrent.taille)
    cart.taille = 
    cart.quantity = this.catcurrent.quantity;
   //  this.cartService.editCart(cart,id).subscribe(carts =>{
     // carts = carts 
    //  window.location.reload()
     //})
   
   
  
  }
  calculateTotal() {
    let sum = 0;
    this.carts.forEach((value) => {
      sum += value.price * value.quantity;
    });
    this.total = sum;
  }

  check() {
    this.route.navigate(['/checkout'])
  }

  deleteCart(idPro: number, idUser: number) {
    if (confirm('Are you sur')) {
      this.cartService.removeFromCart(idPro, idUser).subscribe(() => {
        window.location.reload();
      })
    }
  }
}
