export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

// El partial le pone el ? a cada atributo
// ej: id?: string;
export interface updateProductDTO extends Partial<CreateProductDTO> {

}