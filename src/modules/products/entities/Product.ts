import { v4 as uuidV4 } from 'uuid'

class Product {
   id?: string;
   description: string;
   price: number;

   constructor(){
      if(!this.id)
         this.id = uuidV4()
   }
}


export { Product }