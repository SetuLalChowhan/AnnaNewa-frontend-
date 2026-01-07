// utils/api.ts

export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export const fetchData = async (endpoint: string): Promise<any> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
    }

    const url = `${baseUrl}/${endpoint}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.text();
      // throw new APIError(
      //   res.status,
      //   res.statusText,
      //   `API Error ${res.status}: ${res.statusText} - ${errorData || "Unknown error"}`
      // );
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof APIError) {
      console.error(`❌ API Error [${err.status}]:`, err.message);
      throw err;
    }

    // const errorMessage =
    //   err instanceof Error ? err.message : "Unknown error occurred";
    // console.error(`❌ Failed to fetch ${endpoint}:`, errorMessage);
    // throw new Error(`Failed to fetch ${endpoint}: ${errorMessage}`);
  }
};
