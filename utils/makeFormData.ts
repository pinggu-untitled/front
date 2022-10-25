const makeFormData = (name: string, files: File[] | File) => {
  const formData = new FormData();

  if (Array.isArray(files)) {
    files.forEach((file) => formData.append(name, file));
  } else {
    formData.append(name, files);
  }

  return formData;
};

export default makeFormData;
