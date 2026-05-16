import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];

function findSkillFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        continue;
      }

      files.push(...findSkillFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name === "SKILL.md") {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(filePath) {
  const text = readFileSync(filePath, "utf8");
  const normalized = text.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    errors.push(`${relative(filePath)}: missing YAML frontmatter`);
    return null;
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    errors.push(`${relative(filePath)}: unterminated YAML frontmatter`);
    return null;
  }

  const fields = new Map();
  const frontmatter = normalized.slice(4, end).split("\n");

  for (const line of frontmatter) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      errors.push(`${relative(filePath)}: unsupported frontmatter line "${line}"`);
      continue;
    }

    const key = match[1];
    const value = match[2].trim().replace(/^["']|["']$/g, "");
    fields.set(key, value);
  }

  return fields;
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function expectedName(filePath) {
  if (path.resolve(filePath) === path.join(root, "SKILL.md")) {
    return path.basename(root);
  }

  return path.basename(path.dirname(filePath));
}

const skillFiles = findSkillFiles(root).filter((filePath) => {
  const parent = path.dirname(filePath);
  if (parent === root) {
    return true;
  }

  const parts = path.relative(root, parent).split(path.sep);
  return parts[0] === "skills";
});

if (skillFiles.length === 0) {
  errors.push("No SKILL.md files found");
}

for (const filePath of skillFiles) {
  if (!statSync(filePath).isFile()) {
    continue;
  }

  const fields = parseFrontmatter(filePath);
  if (!fields) {
    continue;
  }

  const name = fields.get("name");
  const description = fields.get("description");
  const expected = expectedName(filePath);

  if (!name) {
    errors.push(`${relative(filePath)}: missing required name`);
  } else {
    if (name.length > 64) {
      errors.push(`${relative(filePath)}: name exceeds 64 characters`);
    }

    if (!namePattern.test(name)) {
      errors.push(`${relative(filePath)}: name must be lowercase letters, digits, and single hyphens`);
    }

    if (name !== expected) {
      errors.push(`${relative(filePath)}: name "${name}" must match expected "${expected}"`);
    }
  }

  if (!description) {
    errors.push(`${relative(filePath)}: missing required description`);
  } else if (description.length > 1024) {
    errors.push(`${relative(filePath)}: description exceeds 1024 characters`);
  }
}

if (errors.length > 0) {
  console.error("Skill validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${skillFiles.length} skill files.`);
