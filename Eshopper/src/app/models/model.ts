export class User {
  id!: number;
  username!:string;
  email!: string;
  password!: string;
  adresse!:string;
  ville !: string;
  phone !: number;
  codepostal !:any;
}
export class Role{
  id!: number;
  name!:ERole;
}
export enum ERole{
    ROLE_CLIENT,
    ROLE_ADMIN,
    ROLE_LIVREUR
}
  export class Category {
    id!: number;
    name!: string;
    souscategories : SCategory[]=[];
  }
  export class SCategory {
    id!: number;
    name!: string;
  }
  export class Product {
    id!: any;
    datecmd!: any;
    url!: string;
    name!: string;
    description!: string;
    price!: number;
    quantities!: number
   verif !: boolean;
   marque !: string ;
   imagecolor!:any;
}
export class ProductOrder {
  product: Product;
  quantity: number = 0 ;
  taille !: string ;
  couleur!: string ;
  constructor(product: Product, quantity: number, taille : string, couleur:string) {
    this.product = product;
    this.quantity = quantity = 0 ;
    this.taille = taille 
    this.couleur  = couleur
  }
}
export interface Cart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  url: string;
  datecmd: any,
  verif : boolean;
  addedby : string ;
  taille : string;
  couleur : string
 
}

  export interface Order {
    id: string,
    dateCreated: any,
    price: any
  }
 
  export class ProductOrders {
    productOrders: ProductOrder[] = [];
  }
export class UpdateProduct {
  id!: any;
  datecmd!: any;
  url!: string;
  name!: string;
  description!: string;
  price!: number;
  quantities!: number
 verif !: boolean;
 marque !: string ;

  }
  export class ImageColor {
     id !: string
     url !: string
     galeries!:any;
    
  }
  export class Galery {
    id !: string
    name !: string
   
 }
  export class Tailles {
    id !: string
    name !: string
   
 }
    export interface Comment {
      id: string,
      addedAt: string,
      addedBy: string,
      message: string,
      title: string
    }
    export interface ReplayComment {
      id: string,
      addedAt: string,
      addedBy: string,
      messageReplay: string
    }
    export class Tag {
      id: any;
      name!: string;
      products:Product []=[];
    }
    export interface Reclamation {
      id: any;
      name : string ;
      addedby: string;
      message: string;
      dater : Date ;
    }
    export interface ReplayReclamation {
      id: any;
      name : string ;
      addedby: string;
      replaymessage: string;
      dater : Date ;
    }
   
  
 

