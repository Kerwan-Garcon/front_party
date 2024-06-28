import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: any) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([name, value]) => {
        if (value === null || value === undefined) {
          newParams.delete(name);
          return;
        }
        newParams.set(name, String(value));
      });

      return newParams.toString();
    },
    [searchParams]
  );

  const updateQueryString = useCallback(
    (params: any, newPathname = pathname) => {
      router.push(`${newPathname}?${createQueryString(params)}`);
    },
    [createQueryString, pathname, router]
  );

  const getQueryString = useCallback(
    (name: any) => {
      const params = new URLSearchParams(searchParams);
      return params.get(name);
    },
    [searchParams]
  );

  const getAllQueryParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const obj: { [key: string]: string } = {};

    params.forEach((value: string, key) => {
      obj[key] = value;
    });

    return obj;
  }, [searchParams]);

  return { router, updateQueryString, getQueryString, getAllQueryParams };
};

export default useUrlParams;
