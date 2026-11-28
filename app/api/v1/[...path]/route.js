
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function handler(req) {
  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    if (!token?.backendToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const backendPath = req.nextUrl.pathname.replace(
      /^\/api\/v1/,
      "/api/v1"
    );

    const backendUrl =
      `${process.env.API_URL}${backendPath}` +
      req.nextUrl.search;

    const headers = new Headers();

    headers.set(
      "Authorization",
      `Bearer ${token.backendToken}`
    );

    const contentType = req.headers.get("content-type");

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const options = {
      method: req.method,
      headers,
      cache: "no-store",
    };

    if (!["GET", "HEAD"].includes(req.method)) {
      options.body = await req.arrayBuffer();
    }

    const response = await fetch(backendUrl, options);

    const data = await response.arrayBuffer();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/json",
      },
    });
  } catch (error) {
    console.error("Backend forwarding error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 502 }
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
