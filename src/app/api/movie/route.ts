
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface FetchMoviesResponse {
  Search: Movie[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const s = searchParams.get("s"); 
  const page = searchParams.get("page") || "1";

  if (!s) {
    return NextResponse.json<FetchMoviesResponse>({
      Search: [],
      totalResults: "0",
      Response: "False",
      Error: "'s' query is required",
    });
  }

  try {
    const apiKey = process.env.OMDB_API_KEY;
    const response = await axios.get("http://www.omdbapi.com/", {
      params: { apikey: apiKey, s, page },
    });

    const data: FetchMoviesResponse = {
      Search: response.data.Search || [],
      totalResults: response.data.totalResults || "0",
      Response: response.data.Response || "False",
      Error: response.data.Error,
    };

    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("OMDb API Error:", error.message);

    return NextResponse.json<FetchMoviesResponse>({
      Search: [],
      totalResults: "0",
      Response: "False",
      Error: "Internal Server Error",
    });
  }
}
