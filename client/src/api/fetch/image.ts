const uploadImg = async (imglist: FileList) => {
  const formData = new FormData();
  formData.append('imgfile', imglist[0]);

  const fileRes = await fetch('/api/uploadimg', {
    method: 'POST',
    body: formData
  });

  return await fileRes.json(); // {file: s3file, save: true/false}
};

export { uploadImg };
