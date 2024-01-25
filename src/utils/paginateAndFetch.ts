// pagination.util.ts
import { Repository, FindManyOptions } from "typeorm";

export async function paginateAndFetch<T>(
  repository: Repository<any>,
  queryParams: {
	page?: string;
	skip?: string;
  },
  searchParams: FindManyOptions
): Promise<{ count: number; skip: number; page: number; results: T[] }> {
  let { page, skip } = queryParams;

  let currentPage = page ? +page : 1;
  let itemsPerPage = skip ? +skip : 10;

  const [items, count] = await repository.findAndCount({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    ...searchParams
  });

  return {
	count,
	skip: itemsPerPage,
	page: currentPage,
	results: items,
  };
}