import { validaCPF } from "../../src/utils/cpf";

describe("Validação de CPF", () => {
  it("CPF válido", () => {
    let cpf = validaCPF("138.378.056-03");
    expect(cpf).toBe("13837805603");
  });

  it("CPF inválido", () => {
    let cpf = validaCPF("1383780560");
    expect(cpf).toBe("");
  });
});
