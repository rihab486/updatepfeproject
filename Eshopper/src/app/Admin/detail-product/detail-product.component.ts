import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment,Cart,Product, ProductOrder,  ProductOrders,  UpdateProduct, Tag, ERole, ImageColor, Tailles, Galery } from 'src/app/models/model';
import { ProductService } from 'src/app/Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { CommentsService } from 'src/app/Services/comments.service';
import { TagService } from 'src/app/Services/tag.service';
import { ImagecolorServiceService } from 'src/app/Services/imagecolor-service.service';
import { TaillesServiceService } from 'src/app/Services/tailles-service.service';
import { ToastrService } from 'ngx-toastr';
import { GaleryService } from 'src/app/Services/galery.service';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})

export class DetailProductComponent implements OnInit { 
  cart: Cart = {} as Cart;
  productOrders: ProductOrder[] = [];
  tailles: Tailles[] = [];
  productOrder: ProductOrder[] = [];
  products: Product[] = [];
  currentUser : any;
  submitted= false
  selectedProductOrder!: ProductOrder;
  productSelected: boolean = false;
  idProduct!: number;
  idTag : any ;
  idimagec: any;
  product!: UpdateProduct;
  isLoggedIn: any;
  
  currentprod!:Product;
  name : any
  roles: string[] = [];
  tags: Tag[] = [];
  comment: Comment = {} as Comment;
  tag: Tag = {} as Tag;
  comments!: Comment[];
  couleur!: ImageColor[];
   galery!:Galery[];
  stock !: boolean
  ROLE_ADMIN !: ERole;
  ROLE_CLIENT !: ERole;
  value!: Tailles;
  stocks!:number;
  col: any 
  src : any
  nouveleq !: number;
  img : any ;
  prodOrder: ProductOrder[] = [];

  constructor(private galerservice :GaleryService,private router:Router,private tokenStorage:TokenStorageService,private route: ActivatedRoute,
    private productservice : ProductService,private imagecservice :ImagecolorServiceService,
     private commentservice : CommentsService,private tailleservice: TaillesServiceService,
    private tagservice: TagService,private cartService: CartService,
    private toastr: ToastrService) 
    {
      this.nouveleq= 0;
     }
  ngOnInit() {  
    this.loadgaleries();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;}
    this.currentUser = this.tokenStorage.getUser()
    this.sangleProduct();
  }
  private sangleProduct() {
    this.product = new UpdateProduct();
    this.idProduct = this.route.snapshot.params.idProduct;
    this.productservice.findProductById(this.idProduct).subscribe((products: any) => {
    this.products = products;
    this.productOrders.push(new ProductOrder(products,1,"","")); 
    this.tailleservice.findTaillesForProduct(this.idProduct).subscribe((taille:any) =>
    { this.tailles = taille
    console.log("les tailles",this.tailles)
    })  
    })
    this.submitted = true;
    this.idProduct = this.route.snapshot.params.idProduct;
    this.commentservice.findCommentsForProduct(this.idProduct).subscribe((comments: Comment[]) => {
   this.comments = comments;
      }); 
  } 
  loadgaleries(){
    this.productservice.findAllProducts().subscribe(
      (products: any[]) => {
          this.products = products; 
          for (let i =0 ; i <3; i++) {
            this.prodOrder.push( new ProductOrder(products[i], 0,"",""))            
         
      this.idProduct = this.products[i].id
      this.imagecservice.findImageColorsForProduct(this.idProduct).subscribe((color :any) =>{
        this.couleur=color;
        for(let i = 0 ; i<this.couleur.length;i++){
          this.idimagec= this.couleur[i].id;
          console.log("cccccccccccccc",this.idimagec)  }
      this.galerservice.findallgalery().subscribe((gale :any) =>
        {this.galery = gale ;} ) 
          })
        }
      })
  }

      
  selectedValue(event: any, order:ProductOrder) {
    const id = event.value;
    order.taille = id ;
    console.log(order.taille)
  }

  image(order:ProductOrder,id:any){
    for(let  i =0;order.product.imagecolor.length;i++){
      id =order.product.imagecolor[0].id
      order.product.url =order.product.imagecolor[0].url
      order.product.quantities=order.product.quantities - order.quantity;
      this.productservice.editProduct(order.product,order.product.id).subscribe( (prod:any) =>{
        this.products = prod;
      })
    }
  }
  addToCart(order: ProductOrder, idUser: any){
    this.cart.addedby = this.currentUser.username;
      this.cart.name = order.product.name;
      this.cart.price= order.product.price;
      this.cart.datecmd=order.product.datecmd;
      this.cart.url=order.product.url;
      this.cart.quantity=order.quantity;
      this.cart.taille =order.taille
      this.cart.couleur= order.couleur
      order.product.quantities=order.product.quantities - order.quantity;
      this.productservice.editProduct(order.product,order.product.id).subscribe( (prod:any) =>{
        this.products = prod;
      })
   if (confirm("Vous étes sur de commander cet produit")) {
      if( this.isLoggedIn == this.roles.includes('ROLE_CLIENT')){
        this.cartService.addCartToUser(this.cart,idUser ).subscribe(cart => {
          this.isLoggedIn = true;
          this.cart = cart;
          console.log(this.cart)
        window.location.reload()           
          
        })}
    }
    
      
     
    }
   search(){}
 
addComment(idProduct  : any, username :any)
      {
    this.comment.addedBy= username
    if( this.isLoggedIn == this.roles.includes('ROLE_CLIENT')){
      this.currentUser= this.tokenStorage.getUser();
    this.commentservice.addCommentToProduct(this.comment, idProduct).subscribe(
      ( comment) => { 
        this.isLoggedIn = true;
        this.comment = this.comment;
           window.location.reload();
     })

      } 
     
    }
 
 login(){
  this.router.navigate(['/login'])

 }   

}
