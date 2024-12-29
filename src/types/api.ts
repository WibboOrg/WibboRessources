export interface Category {
  type: string;
  format: string;
}

export interface Categories {
  [key: string]: Category;
}

export interface Resource {
  id: string;
  name: string;
  url: string;
  format: string;
}
