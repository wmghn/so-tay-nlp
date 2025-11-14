import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildNotes() {
  try {
    // Find all markdown files in the notes folder
    const notesDir = path.join(__dirname, '../public/content/notes');
    const files = await glob('**/*.md', { cwd: notesDir });
    
    const notes = [];
    
    for (const file of files) {
      const filePath = path.join(notesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      // Add the note to our array
      notes.push({
        id: data.id || file.replace('.md', ''),
        category: data.category,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl || undefined,
        videoUrl: data.videoUrl || undefined,
      });
    }
    
    // Sort notes by ID
    notes.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    
    // Write to public folder
    const outputPath = path.join(__dirname, '../public/data/notes.json');
    const outputDir = path.dirname(outputPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify({ notes }, null, 2));
    
    console.log(`✅ Built ${notes.length} notes to ${outputPath}`);
  } catch (error) {
    console.error('Error building notes:', error);
    process.exit(1);
  }
}

buildNotes();
