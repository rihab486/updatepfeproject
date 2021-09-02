import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Galery, ImageColor, Product, ProductOrder, Tag } from 'src/app/models/model';
import { GaleryService } from 'src/app/Services/galery.service';
import { ImagecolorServiceService } from 'src/app/Services/imagecolor-service.service';
import { ProductService } from 'src/app/Services/product.service';
import { TagService } from 'src/app/Services/tag.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  prodOrder: ProductOrder[] = [];
  tags: Tag[] = [];
   idTag : any
  showSearch = false
  name : any
  products: Product[] = [];
  productOrders: ProductOrder[] = [];
  images : any
  galery!:Galery[];
  idProduct : any
  couleur!: ImageColor[];
  idimagec:any


  constructor(private galerservice :GaleryService,private imagecservice :ImagecolorServiceService,
    private productService: ProductService,private route : ActivatedRoute,private tagService: TagService, private router: Router)
   { }
  ngOnInit(): void {

   this.loadProducts();
    this.tagService.findAllTags().subscribe(tags => {
      this.tags = tags;
  /*    this.idTag = this.route.snapshot.params.idSCategory;
      this.tagService.findTagsForProduct(this.idTag).subscribe(tags => {
        this.tags = tags;
      })*/
    })
  }
  
 loadProducts(){
    this.productService.findAllProducts().subscribe(
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
  sngleProduct(idProduct: any) {
    this.router.navigate(['detailproduct', idProduct]);
  }

  search(){
    
    this.productService.findByName(this.name).subscribe((products) => {
      this.products = products;
      this.showSearch = true;
    console.log(this.products)
    });
  }
}
