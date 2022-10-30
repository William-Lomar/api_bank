import { ErrosBDModel } from "../src/model";
import { tratarErro } from "../src/utils/error";

describe("Testando tratamento de erro",()=>{
    it('Erro código UNIQUE_VIOLATION',()=>{
        expect(tratarErro({
            code:ErrosBDModel.UNIQUE_VIOLATION
        })).toBe('Violação de chave única!')
    })
})