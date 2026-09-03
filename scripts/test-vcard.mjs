// Standalone test script to verify vCard 3.0 specification compliance
// Tests: CRLF line endings, 75-octet folding, and profile field correctness.

import assert from "node:assert";

function foldVCardLine(line, maxBytes = 75) {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= maxBytes) {
    return line;
  }

  const chunks = [];
  let currentChunk = "";
  let currentChunkBytes = 0;

  for (const char of Array.from(line)) {
    const charBytes = encoder.encode(char).length;
    const limit = chunks.length === 0 ? maxBytes : maxBytes - 1;

    if (currentChunkBytes + charBytes > limit) {
      chunks.push(currentChunk);
      currentChunk = char;
      currentChunkBytes = charBytes;
    } else {
      currentChunk += char;
      currentChunkBytes += charBytes;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks.join("\r\n ");
}

function escapeVCardValue(value) {
  if (!value) return "";
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function generateVCardString(profile) {
  const CRLF = "\r\n";
  const lines = [];

  lines.push("BEGIN:VCARD");
  lines.push("VERSION:3.0");
  lines.push("PRODID:-//Iuvora//Digital Visiting Card//EN");

  const nameParts = profile.name.trim().split(/\s+/);
  let firstName = "";
  let lastName = "";
  if (nameParts.length > 1) {
    lastName = nameParts[nameParts.length - 1];
    firstName = nameParts.slice(0, -1).join(" ");
  } else {
    firstName = profile.name;
  }

  lines.push(
    `N;CHARSET=UTF-8:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`
  );
  lines.push(`FN;CHARSET=UTF-8:${escapeVCardValue(profile.name)}`);

  if (profile.company) {
    lines.push(`ORG;CHARSET=UTF-8:${escapeVCardValue(profile.company)}`);
  }

  if (profile.title) {
    lines.push(`TITLE;CHARSET=UTF-8:${escapeVCardValue(profile.title)}`);
  }

  if (profile.phone) {
    const cleanPhone = profile.phone.replace(/[^\d+]/g, "");
    lines.push(`TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}`);
  }

  if (profile.email) {
    lines.push(`EMAIL;TYPE=WORK,INTERNET,PREF:${profile.email.trim()}`);
  }

  if (profile.socials?.linkedin) {
    lines.push(`URL;TYPE=LinkedIn:${profile.socials.linkedin.trim()}`);
  }

  if (profile.socials?.github) {
    lines.push(`URL;TYPE=GitHub:${profile.socials.github.trim()}`);
  }

  if (profile.location) {
    const locParts = profile.location.split(",").map((s) => s.trim());
    const city = locParts[0] || "";
    const region = locParts[1] || "";
    lines.push(
      `ADR;TYPE=WORK;CHARSET=UTF-8:;;;${escapeVCardValue(city)};${escapeVCardValue(region)};;India`
    );
  }

  if (profile.oneLineBio) {
    lines.push(`NOTE;CHARSET=UTF-8:${escapeVCardValue(profile.oneLineBio)}`);
  }

  const nowIso = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  lines.push(`REV:${nowIso}`);

  lines.push("END:VCARD");

  const foldedLines = lines.map((l) => foldVCardLine(l, 75));
  return foldedLines.join(CRLF) + CRLF;
}

// Test Sample Profile (D K Mrithyunjay)
const testProfile = {
  slug: "mj",
  name: "D K Mrithyunjay",
  title: "Software Engineer & Co-Founder",
  oneLineBio: "Co-founding Iuvora. Building real products for real clients, start to finish.",
  phone: "+91 9844324024",
  whatsapp: "919844324024",
  email: "mrithyunjay12@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/d-k-mrithyunjay-6160742a2",
    github: "https://github.com/Mrithyunjay02",
  },
  location: "Shimoga, Karnataka",
  company: "Iuvora",
};

const vcard = generateVCardString(testProfile);

console.log("=== RAW VCARD OUTPUT ===");
console.log(JSON.stringify(vcard));
console.log("=========================");

// Assertion 1: Must contain only \r\n line breaks, no lone \n
const withoutCRLF = vcard.replace(/\r\n/g, "");
assert.ok(!withoutCRLF.includes("\n"), "FAILED: Found lone LF character without CR!");
assert.ok(!withoutCRLF.includes("\r"), "FAILED: Found lone CR character without LF!");
console.log("✔ Assertion 1 passed: All line breaks are strict CRLF (\\r\\n).");

// Assertion 2: No folded line exceeds 75 octets
const lines = vcard.split("\r\n").filter((l) => l.length > 0);
const encoder = new TextEncoder();
for (let i = 0; i < lines.length; i++) {
  const byteLength = encoder.encode(lines[i]).length;
  assert.ok(
    byteLength <= 75,
    `FAILED: Line ${i + 1} exceeds 75 bytes: "${lines[i]}" (${byteLength} bytes)`
  );
}
console.log(`✔ Assertion 2 passed: All ${lines.length} physical lines are <= 75 octets.`);

// Assertion 3: Mandatory tags exist
assert.ok(vcard.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"), "FAILED: Missing standard header");
assert.ok(vcard.endsWith("END:VCARD\r\n"), "FAILED: Missing standard footer");
assert.ok(vcard.includes("FN;CHARSET=UTF-8:D K Mrithyunjay"), "FAILED: Missing full name");
assert.ok(vcard.includes("TEL;TYPE=CELL,VOICE,PREF:+919844324024"), "FAILED: Missing telephone");
assert.ok(vcard.includes("EMAIL;TYPE=WORK,INTERNET,PREF:mrithyunjay12@gmail.com"), "FAILED: Missing email");
console.log("✔ Assertion 3 passed: All mandatory fields present and correct.");

console.log("\nALL VCARD RFC 6350 UNIT CHECKS PASSED SUCCESSFULLY!");
