import { CardProfile } from "@/data/cards/types";

/**
 * Escapes characters per RFC 6350 / vCard 3.0
 * Backslashes, semicolons, and commas must be escaped with a backslash.
 */
function escapeVCardValue(value: string): string {
  if (!value) return "";
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Folds a single vCard line so that no folded chunk exceeds 75 octets (UTF-8 bytes),
 * per RFC 6350 Section 3.2.
 * Folded lines are broken with CRLF followed by a single space (\r\n ).
 */
export function foldVCardLine(line: string, maxBytes: number = 75): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= maxBytes) {
    return line;
  }

  const chunks: string[] = [];
  let currentChunk = "";
  let currentChunkBytes = 0;

  // Preserve multi-byte unicode sequences and surrogate pairs using Array.from
  for (const char of Array.from(line)) {
    const charBytes = encoder.encode(char).length;
    // Continuation lines start with a single space (1 byte), so max is maxBytes - 1
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

/**
 * Generates an RFC 6350 / vCard 3.0 string compliant with iOS Contacts and Android.
 * Guarantees CRLF (\r\n) line endings and 75-octet line folding.
 */
export function generateVCardString(profile: CardProfile): string {
  const CRLF = "\r\n";
  const lines: string[] = [];

  lines.push("BEGIN:VCARD");
  lines.push("VERSION:3.0");
  lines.push("PRODID:-//Iuvora//Digital Visiting Card//EN");

  // Name handling: split name into First/Last if possible
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
    // Sanitize telephone number for URI / vCard
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

  if (profile.socials?.website) {
    lines.push(`URL;TYPE=WORK:${profile.socials.website.trim()}`);
  } else if (profile.company?.toLowerCase() === "iuvora") {
    lines.push(`URL;TYPE=WORK:https://www.iuvora.com`);
  }

  if (profile.location) {
    // Format location into City/Region
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

  // Fold every line to <= 75 octets and join with CRLF
  const foldedLines = lines.map((l) => foldVCardLine(l, 75));
  return foldedLines.join(CRLF) + CRLF;
}

/**
 * Client-side trigger to download the .vcf contact card.
 * Works across iOS Safari (opens contact import directly) and Android/Chrome.
 */
export function downloadVCard(profile: CardProfile): void {
  if (typeof window === "undefined") return;

  const vcardString = generateVCardString(profile);
  const blob = new Blob([vcardString], { type: "text/vcard;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const fileName = `${profile.slug || "contact"}.vcf`;

  anchor.href = url;
  anchor.download = fileName;
  anchor.setAttribute("target", "_blank");
  document.body.appendChild(anchor);
  anchor.click();

  // Cleanup object URL after a brief delay
  setTimeout(() => {
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }, 300);
}
