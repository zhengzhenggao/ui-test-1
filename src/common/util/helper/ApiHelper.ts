import fetch from 'cross-fetch';

export type ApiHelperResponse<T = any> = {
  request: {
    url: URL;
    method: SupportedMethod;
    data?: any;
    options: ApiHelperOptions;
  };
  success: boolean;
  data?: T;
  error?: any;
};

interface ErrorResponse {
  error_code: string;
  error_msg: string;
  status_code: number;
}

export const enum SupportedMethod {
  GET = 'GET',
  POST = 'POST',
}

export const enum SupportedOutgoingFormat {
  JSON = 'application/json',
  MULTIPART = 'multipart/form-data',
}

export const enum SupportedIncomingFormat {
  JSON = 'application/json',
  TEXT = 'text/plain',
}

interface ApiHelperOptions {
  outgoingFormat?: SupportedOutgoingFormat;
  incomingFormat?: SupportedIncomingFormat;
  headerConstructor?: () => Record<string, unknown>;
  dataConstructor?: () => Record<string, unknown> | string | FormData | undefined;
  timeout?: number;
}

const apiHelper = async <T = any>(
  server: string,
  endpoint: string,
  method: SupportedMethod,
  data: Record<string, unknown> | string | undefined,
  options: ApiHelperOptions,
): Promise<ApiHelperResponse<T>> => {
  // PREPARE API DATA
  const url = new URL(endpoint, server);
  const request = { url, method, data, options };
  let headers = {};
  let dataObject;
  try {
    const constructedHeader = options.headerConstructor ? options.headerConstructor() : {};

    if (options.outgoingFormat === SupportedOutgoingFormat.JSON) {
      // JSON FORMAT
      const constructedData = options.dataConstructor ? options.dataConstructor() : {};

      dataObject = JSON.stringify({
        ...(data ? (data as Record<string, unknown>) : {}),
        ...(constructedData as Record<string, unknown>),
      });
      headers = {
        accept: options.incomingFormat,
        'Content-Type': 'application/json; charset=UTF-8',
        ...constructedHeader,
      };
    } else if (options.outgoingFormat === SupportedOutgoingFormat.MULTIPART) {
      // MULTIPART FORMAT
      const constructedData = (
        options.dataConstructor ? options.dataConstructor() : new FormData()
      ) as FormData;
      const constructedHeader = options.headerConstructor ? options.headerConstructor() : {};
      dataObject = constructedData;
      headers = {
        accept: options.incomingFormat,
        // REMOVED TO PREVENT NO BOUNDARY ERROR
        // 'Content-Type': `${SupportedOutgoingFormat.MULTIPART}; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s`,
        ...constructedHeader,
      };
    } else {
      headers = constructedHeader;
    }

    // TO-DO: OTHER SUPPORTED FORMAT
  } catch (err: unknown) {
    // API FAILURE DATA LEVEL
    console.error('API FAILURE DATA LEVEL', err);
    return { request: { ...request }, success: false, error: err };
  }

  // CALLING API
  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: dataObject,
    })
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  } catch (err: unknown) {
    // API FAILURE API LEVEL
    void handleApiLevelError(err, server);
    return { request: { ...request }, success: false, error: err };
  }

  // PROCESS API RESPONSE DATA
  let processedResponse: T | undefined;
  try {
    if (response && options.incomingFormat === SupportedIncomingFormat.JSON) {
      if (response.status === 200) {
        // INCOMING JSON
        processedResponse = (await response.json()) as T;
      } else if (response.status === 202) {
        const errResponse = (await response.json()) as ErrorResponse;
        if (Number(errResponse.error_code) === 401) {
          console.error('Unauthorized API call', errResponse);
        }
      }
    }

    if (response && options.incomingFormat === SupportedIncomingFormat.TEXT) {
      processedResponse = (await response.text()) as unknown as T;
    }
  } catch (err: unknown) {
    // API FAILURE API RESPONSE

    handleApiResponseError(err, server);

    return { request: { ...request }, success: false, error: err };
  }

  return { request: { ...request }, success: true, data: processedResponse };
};

const handleApiLevelError = async (err: unknown, server: string): Promise<void> => {
  console.error('API FAILURE API LEVEL', server, err);
};

const handleApiResponseError = (err: unknown, server: string): void => {
  console.error('API FAILURE API RESPONSE LEVEL', server, err);
};

export default apiHelper;
