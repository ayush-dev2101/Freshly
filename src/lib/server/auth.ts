import { verifyToken } from "@clerk/backend";

export async function getUserId(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];

  try {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) throw new Error("Missing publishableKey");
    
    // Clerk backend verifyToken
    const jwt = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    return jwt.sub;
  } catch (error) {
    console.error("Token verification failed", error);
    return null;
  }
}
