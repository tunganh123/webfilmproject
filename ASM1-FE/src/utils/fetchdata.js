export const fetchData = async (url, cb, method = "GET", datapost) => {
  const a = await fetch(`${process.env.REACT_APP_URL_FETCH}/` + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: datapost,
  });
  if (!a.ok) {
    cb("");
    throw new Error();
  }
  const b = await a.json();
  if (b?.err) {
    cb("");
    throw new Error(b.err);
  }
  cb(b);
};
