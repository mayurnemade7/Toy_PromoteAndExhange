export interface Toy {
  id: string;
  title: string;
  category?: string;
  age?: string;
  societyName?: string;
  ownerName?: string;
  pts?: number;
  condition?: string;
  image?: string;
  views?: number;
  createdAt: string;
}

export interface DBProvider {
  getAllToys(): Promise<Toy[]>;
  addToy(toy: Omit<Toy, "id" | "createdAt">): Promise<Toy>;
}
