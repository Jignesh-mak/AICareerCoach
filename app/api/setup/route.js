import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT PRIMARY KEY,
        "clerkUserId" TEXT UNIQUE NOT NULL,
        "email" TEXT UNIQUE NOT NULL,
        "name" TEXT,
        "imageUrl" TEXT,
        "industry" TEXT,
        "bio" TEXT,
        "experience" INTEGER,
        "skills" TEXT[],
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}