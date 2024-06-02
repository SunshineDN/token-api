function subdividirPropriedades(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const keys = key.split(/[\[\]]+/).filter(Boolean);
      let tempObj = newObj;
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          tempObj[keys[i]] = obj[key];
        } else {
          tempObj[keys[i]] = tempObj[keys[i]] || {};
          tempObj = tempObj[keys[i]];
        }
      }
    }
  }
  return newObj;
};

const decodeURI = (uri) => {
  console.log("URI do Kommo: ", uri);
  const decodedPayload = decodeURIComponent(uri);
  const payloadArray = decodedPayload.split("&");
  const payloadObj = {};

  payloadArray.forEach((item) => {
    const [key, value] = item.split("=");
    const keyArray = key.split("%5B");
    let obj = payloadObj;

    keyArray.forEach((key, index) => {
      if (index === keyArray.length - 1) {
        obj[key] = value;
      } else {
        if (!obj[key]) {
          obj[key] = {};
        }
        obj = obj[key];
      }
    });
  });

  const props = subdividirPropriedades(payloadObj);

  const { leads, account } = props;
  const lead_id = leads?.status?.[0]?.id || leads?.add?.[0]?.id;
  const account_id = account?.id;
  const account_subdomain = account?.subdomain;
  return { lead_id, account_id, account_subdomain };
}

module.exports = (req, res, next) => {
  const decoded = decodeURI(req.body);
  console.log("Decoded: ", decoded);
  req.body = decoded;
  next();
};
