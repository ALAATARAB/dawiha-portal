export type _TError =
    | {
          statusCode: number
          data: {
              error: string
              message: string
              statusCode: number
          }
      }
    | unknown
    | any

export type _TAxiosError =
    | {
          response: {
              data: {
                  message: string
                  statusCode: number
              }
          }
      }
    | unknown
    | any
