interface IElement {
  id: number;
  [key: string]: any;
}

const isIdExisting = (arr: IElement[] | undefined, element: IElement): boolean => {
  return Boolean(arr?.find((el) => el.id === element.id));
};

export default isIdExisting;
