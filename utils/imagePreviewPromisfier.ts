export const fileReaderPromise = (file: File) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
  });

const imagePreviewPromisfier = (files: FileList, signal?: any) => {
  // if (files.length === 1) {
  //   return fileReaderPromise(files[0]);
  // }
  return Promise.all(Array.from(files).map(fileReaderPromise));
};

export default imagePreviewPromisfier;
