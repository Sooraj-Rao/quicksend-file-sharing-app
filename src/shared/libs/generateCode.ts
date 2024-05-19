export const GenerateCode = () => {
  let code = "";
  for (let index = 0; index < 6; index++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};
