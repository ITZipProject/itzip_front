import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { categoryId, blogId, title, content } = await request.json();
		const article = await prisma.article.create({
			data: {
				categoryId: BigInt(categoryId),
				blogId: BigInt(blogId),
				title,
				content,
			},
		});
		return NextResponse.json(article, { status: 201 });
	} catch (error) {
		console.error("Error creating blog post:", error);
		return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
	}
}


/*
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	console.log("Received blog post data:", data);
	return NextResponse.json({ message: "Blog post received successfully", data }, { status: 200 });
}
*/