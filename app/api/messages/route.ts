import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const MESSAGES_FILE = path.join(process.cwd(), "data", "messages.json")

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read messages from file
async function readMessages() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(MESSAGES_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Write messages to file
async function writeMessages(messages: any[]) {
  await ensureDataDir()
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, timestamp } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Read existing messages
    const messages = await readMessages()

    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: timestamp || new Date().toISOString(),
      read: false,
    }

    messages.push(newMessage)

    // Save messages
    await writeMessages(messages)

    return NextResponse.json({ success: true, message: "Message received" })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Simple authentication check
    if (secret !== "kamodev23admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const messages = await readMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error reading messages:", error)
    return NextResponse.json({ error: "Failed to read messages" }, { status: 500 })
  }
}
