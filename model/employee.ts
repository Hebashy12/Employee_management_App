
export class Employee {
  id:string;
  empName:string;
  contactNum:string;
  email:string;
  deptId:number;
  password:string;
  gender:string;
  rol:string;
  cratedDate:Date;
  constructor(){
    this.id="";
    this.contactNum='';
    this.cratedDate=new Date();
    this.deptId=0;
    this.email='';
    this.empName='';
    this.password='';
    this.rol='Employee';
    this.gender='';

  }
}
