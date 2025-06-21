export type Pagination = {
  page: number
  limit: number
}

export type PaginationResponse<T> = {
  count: number
  pages: number
  prev: number | null
  next: number | null
  data: T[]
}

export const makePaginationResponse = <T = any>(info: {
  data: T[]
  page: number
  limit: number
  count: number
}): PaginationResponse<T> => {
  const { page, limit, count, data } = info
  const pages = Math.ceil(count / limit)
  return {
    count,
    pages,
    prev: page > 1 ? page - 1 : null,
    next: page < pages ? page + 1 : null,
    data,
  }
}
