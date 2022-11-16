export const fileReaderPromise = (file: File) =>
  new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
  });

const imagePreviewPromisfier = (files: FileList) => {
  return Promise.all(Array.from(files).map(fileReaderPromise));
};

export default imagePreviewPromisfier;
