export interface Pickle {
  name: string;
  price: number;
  desc: string;
  available: boolean;
  type: 'veg' | 'nonveg';
  img?: string;
}

export interface CartItem {
  idx: number;
  qty: number;
}

export interface PickleCardProps {
  pickle: Pickle;
  idx: number;
  onAddToCart: (idx: number, qty: number) => void;
}

export interface CartModalProps {
  show: boolean;
  onHide: () => void;
  cart: CartItem[];
  pickles: Pickle[];
  onUpdateCart: (newCart: CartItem[]) => void;
} 