
export type CreateResponse = {
  criado: boolean,
  nome?: string,
  erros: any
} | {
  criado: boolean,
  id: number
}

export type DeleteResponse = {
  deletado: boolean,
  errors: any
} | {
  deletado: boolean,
  dado: number
}

export type UpdateResponse = {
  atualizado: boolean,
  nome?: string,
  erros: any
} | {
  atualizado: boolean,
  id: number
}

export type ReadResponse<T> = {
  titulo: string,
  error: any
} | {
  dados: T[],
  quantidade: number,
  total: number
}
