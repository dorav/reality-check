import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const root = process.cwd();
const skillsRoot = path.join(root, "skills");
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
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");

  if (!matter.test(text)) {
    errors.push(`${relative(filePath)}: missing YAML frontmatter`);
    return null;
  }

  try {
    return matter(text).data;
  } catch (error) {
    errors.push(`${relative(filePath)}: invalid YAML frontmatter: ${error.message}`);
    return null;
  }
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function expectedName(filePath) {
  return path.basename(path.dirname(filePath));
}

const skillFiles = existsSync(skillsRoot) ? findSkillFiles(skillsRoot) : [];

if (skillFiles.length === 0) {
  errors.push("No SKILL.md files found");
}

for (const filePath of skillFiles) {
  const fields = parseFrontmatter(filePath);
  if (!fields) {
    continue;
  }

  const name = fields.name;
  const description = fields.description;
  const expected = expectedName(filePath);

  if (!name) {
    errors.push(`${relative(filePath)}: missing required name`);
  } else if (typeof name !== "string") {
    errors.push(`${relative(filePath)}: name must be a string`);
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
  } else if (typeof description !== "string") {
    errors.push(`${relative(filePath)}: description must be a string`);
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
