export interface Option {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

// Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// load CSV into array of options
export function parseCSV(text: string): Option[] {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length < 2) return [];

  const headerLine = lines[0];
  const headers = parseCSVRow(headerLine).map(h => h.toLowerCase().trim());

  const titleIdx = headers.indexOf('title');
  const descIdx = headers.indexOf('description');
  const imageIdx = headers.indexOf('image');
  const tagsIdx = headers.indexOf('tags');

  if (titleIdx === -1 || descIdx === -1 || imageIdx === -1 || tagsIdx === -1) {
    throw new Error(
      `CSV must contain columns: title, description, image, tags. Found: ${headers.join(', ')}`
    );
  }

  const options: Option[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVRow(lines[i]);
    const title = fields[titleIdx]?.trim();
    const description = fields[descIdx]?.trim();
    const image = fields[imageIdx]?.trim();
    const tagsRaw = fields[tagsIdx]?.trim();

    if (!title || !image) continue; // skip rows without a title or image

    const tags = tagsRaw
      ? tagsRaw.split('|').map(t => t.trim()).filter(Boolean)
      : [];

    options.push({ title, description: description || '', image, tags });
  }

  return options;
}

// handles single row
function parseCSVRow(row: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < row.length && row[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        fields.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }

  fields.push(current);
  return fields;
}

// return uid
export function getUniqueTags(options: Option[]): string[] {
  const allTags = options.flatMap(option => option.tags);
  return [...new Set(allTags)];
}

// filter options by category
export function filterByCategories(options: Option[], categories: string[]): Option[] {
  return options.filter(option =>
    option.tags.some(tag => categories.includes(tag))
  );
}
