interface IElement {
  id: number;
  [key: string]: any;
}

const indexOfUser = (arr: IElement[], user: IElement): number => {
  return arr.findIndex((el) => el.id === user.id);
};

const isIdExisting = (arr: IElement[], user: IElement): boolean => {
  return indexOfUser(arr, user) > -1;
};

export default isIdExisting;
