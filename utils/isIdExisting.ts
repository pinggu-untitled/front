interface IElement {
  id: number;
  [key: string]: any;
}

const isIdExisting = (arr: IElement[] | undefined, element: IElement): boolean => {
  return Boolean(arr?.find((ele) => element.id === ele.id));
};

export default isIdExisting;
