export interface Product {
  id: number;          // Le type 'Long' devient 'number'
  name: string;        // 'String' devient 'string'
  description: string;
  price: number;       // 'double' devient 'number'
  stock: number;       // 'int' devient 'number'
}