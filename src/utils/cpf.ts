export function validaCPF(cpf: string): string {
  let cpfRegex = cpf.match(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/);

  if (cpfRegex) {
    let cpfBD = cpfRegex[0];
    cpfBD = cpfBD.replaceAll(".", "");
    cpfBD = cpfBD.replaceAll("-", "");

    if (cpfBD.length == 11) {
      return cpfBD;
    } else {
      return "";
    }
  } else {
    return "";
  }
}
