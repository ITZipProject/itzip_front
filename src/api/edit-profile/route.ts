import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}
