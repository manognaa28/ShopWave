
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Should not be sent to client
};
