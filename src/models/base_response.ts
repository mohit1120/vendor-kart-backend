/* -------------------------------------------------------------------------- */
/*                                Base Response                               */
/* -------------------------------------------------------------------------- */
interface BaseRes {
  success?: boolean;
  message?: string;
  data?: object;
  status_code?: number;
}

export { BaseRes };
