const data = {
  name: "guilherme",
};

const buf = Buffer.from(JSON.stringify(data));

console.log(JSON.parse(buf.toString()));
