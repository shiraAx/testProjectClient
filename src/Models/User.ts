import Child from "./Child";


export default class User{
    constructor(
         public Id:number,
       public   ParentId :string,
        public  FirstName :string,
       public  LastName :string,
      public  Children :Child[],
      public   GenderType :number,
      public    HMOType :number,
       public   BirthDate :Date
        ){}
}