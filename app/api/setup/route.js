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

      CREATE TABLE IF NOT EXISTS "IndustryInsight" (
        "id" TEXT PRIMARY KEY,
        "industry" TEXT UNIQUE NOT NULL,
        "salaryRanges" JSONB[],
        "growthRate" FLOAT,
        "demandLevel" TEXT,
        "topSkills" TEXT[],
        "marketOutlook" TEXT,
        "keyTrends" TEXT[],
        "recommendedSkills" TEXT[],
        "lastUpdated" TIMESTAMP DEFAULT NOW(),
        "nextUpdate" TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Assessment" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "User"("id"),
        "quizScore" FLOAT NOT NULL,
        "questions" JSONB[],
        "category" TEXT NOT NULL,
        "improvementTip" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "Resume" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT UNIQUE NOT NULL REFERENCES "User"("id"),
        "content" TEXT NOT NULL,
        "atsScore" FLOAT,
        "feedback" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "CoverLetter" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "User"("id"),
        "content" TEXT NOT NULL,
        "jobDescription" TEXT,
        "companyName" TEXT NOT NULL,
        "jobTitle" TEXT NOT NULL,
        "status" TEXT DEFAULT 'draft',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    return NextResponse.json({ success: true, message: "All tables created!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}