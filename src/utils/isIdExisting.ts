interface IElement {
  id: number;
  [key: string]: any;
}

const isIdExisting = (array: IElement[], item: IElement): boolean =>
  array?.findIndex((v: IElement) => v.id === item.id) > -1 || false;

export default isIdExisting;
