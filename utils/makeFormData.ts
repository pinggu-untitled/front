const makeFormData = (name: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append(name, file));

  return formData;
};

export default makeFormData;
