#!/usr/bin/env node

// Simple test script to verify your Alby Hub MCP server setup
// Run with: node test-setup.js

import dotenv from "dotenv";

dotenv.config();

const errors = [];
const warnings = [];

console.log("🔍 Testing Alby Hub MCP Server Configuration...\n");

// Check required environment variables
if (!process.env.ALBY_HUB_URL) {
  errors.push("❌ ALBY_HUB_URL is not set in .env file");
} else {
  console.log("✅ ALBY_HUB_URL:", process.env.ALBY_HUB_URL);
}

if (!process.env.ALBY_HUB_API_TOKEN) {
  errors.push("❌ ALBY_HUB_API_TOKEN is not set in .env file");
} else {
  console.log(
    "✅ ALBY_HUB_API_TOKEN: ****" + process.env.ALBY_HUB_API_TOKEN.slice(-8)
  );
}

// Check optional variables
if (process.env.ALBY_HUB_NAME) {
  console.log("ℹ️  ALBY_HUB_NAME:", process.env.ALBY_HUB_NAME);
}

if (process.env.ALBY_HUB_REGION) {
  console.log("ℹ️  ALBY_HUB_REGION:", process.env.ALBY_HUB_REGION);
}

// Check if build directory exists
import { existsSync } from "fs";
if (!existsSync("./build/index.js")) {
  errors.push("❌ Build directory not found. Run: npm run build");
} else {
  console.log("✅ Build directory exists");
}

// Test connection to Alby Hub (if URL and token are set)
if (process.env.ALBY_HUB_URL && process.env.ALBY_HUB_API_TOKEN) {
  console.log("\n🔗 Testing connection to Alby Hub...");

  try {
    const response = await fetch(`${process.env.ALBY_HUB_URL}/api/balances`, {
      headers: {
        Authorization: `Bearer ${process.env.ALBY_HUB_API_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Successfully connected to Alby Hub");
      console.log("💰 Balance preview:", JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = null;
      }

      if (response.status === 401) {
        errors.push("❌ Invalid API token (401 Unauthorized)");
      } else if (response.status === 403) {
        warnings.push("⚠️  API token might be readonly (403 Forbidden)");
      } else if (
        response.status === 500 &&
        errorData?.message?.includes("connection refused")
      ) {
        warnings.push(
          "⚠️  Alby Hub web interface is running, but the backend service is not started"
        );
        console.log("\n   ℹ️  This usually means:");
        console.log(
          "      - The Alby Hub application needs to be fully started"
        );
        console.log("      - Or the Hub needs to unlock/initialize");
        console.log("      - Check the Alby Hub application window/logs");
      } else if (response.status === 500) {
        warnings.push(`⚠️  Alby Hub returned a server error (500)`);
        if (errorData?.message) {
          console.log(`   Error: ${errorData.message}`);
        }
      } else {
        errors.push(`❌ API returned ${response.status}: ${text}`);
      }
    }
  } catch (error) {
    const errorMsg = error.message || String(error);

    if (
      errorMsg.includes("ECONNREFUSED") ||
      errorMsg.includes("connection refused")
    ) {
      warnings.push(
        `⚠️  Cannot connect to Alby Hub at ${process.env.ALBY_HUB_URL}`
      );
      console.log("\n   ℹ️  This is normal if your Alby Hub is not running.");
      console.log("   ℹ️  The MCP server will work once your Hub is started.");
    } else if (
      errorMsg.includes("ENOTFOUND") ||
      errorMsg.includes("getaddrinfo")
    ) {
      warnings.push("⚠️  Cannot resolve hostname - check your ALBY_HUB_URL");
    } else {
      warnings.push(`⚠️  Connection test failed: ${errorMsg}`);
    }

    console.log("\n   💡 To start your Alby Hub:");
    console.log("      - If running locally: Start the Alby Hub application");
    console.log(
      "      - If using hosted: Check the URL and ensure it's accessible"
    );
  }
}

// Summary
console.log("\n" + "=".repeat(50));
if (errors.length === 0 && warnings.length === 0) {
  console.log("✨ All checks passed! Your setup is ready.");
  console.log("\n📖 Next steps:");
  console.log("   1. Make sure Alby Hub is running");
  console.log("   2. Run: goose configure");
  console.log("   3. Add extension with command: node");
  console.log("   4. Arguments: " + process.cwd() + "/build/index.js");
  console.log("   5. Set environment variables in Goose");
  console.log("\n   See GOOSE_SETUP.md for detailed instructions.");
} else if (errors.length === 0 && warnings.length > 0) {
  console.log("⚠️  Configuration looks good, but with warnings:");
  warnings.forEach((warn) => console.log("   " + warn));
  console.log("\n✅ Your MCP server configuration is correct!");
  console.log("   The server will work once Alby Hub is running.");
  console.log("\n📖 Next steps:");
  console.log("   1. Start your Alby Hub application");
  console.log("   2. Run: goose configure");
  console.log("   3. Add extension with command: node");
  console.log("   4. Arguments: " + process.cwd() + "/build/index.js");
  console.log("   5. Set environment variables in Goose");
  console.log("\n   See GOOSE_SETUP.md for detailed instructions.");
} else {
  if (errors.length > 0) {
    console.log("\n🚨 Errors found:");
    errors.forEach((err) => console.log("   " + err));
  }
  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    warnings.forEach((warn) => console.log("   " + warn));
  }
  console.log("\n💡 Fix these issues and run this test again.");
  process.exit(1);
}
