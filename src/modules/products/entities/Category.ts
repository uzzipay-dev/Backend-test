import { v4 as uuidV4 } from 'uuid'
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("categories")
class Category {
   @PrimaryColumn()
   id?: string;
   
   @Column()
   description: string;

   constructor(){
      if(!this.id)
         this.id = uuidV4()
   }
}

export { Category }