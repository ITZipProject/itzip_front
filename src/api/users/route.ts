import axios from 'axios';
import { NextRequest } from 'next/server';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;
export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  const res = await axios.post(`${BaseURL}/user/join`);
  console.log(res.data);
  const data = await request.json();
  console.log('log the user in!');
  return Response.json(data);
}
