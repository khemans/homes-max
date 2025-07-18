import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface DocFile {
  slug: string;
  title: string;
  description?: string;
  content: string;
  lastModified: Date;
  size: string;
}

// Configuration for markdown files
const DOCS_CONFIG = {
  'PRD.md': {
    title: 'Product Requirements Document',
    description: 'Complete product specification and technical requirements for HOUSE/MAX platform',
    order: 1
  },
  'README.md': {
    title: 'Project Overview',
    description: 'Getting started guide and project introduction',
    order: 2
  },
  'AVM_ACCURACY_IMPROVEMENTS.md': {
    title: 'AVM v2.0 Implementation',
    description: 'Enhanced Automated Valuation Model with multi-approach algorithms',
    order: 3
  },
  'PUBLIC_RECORDS_INTEGRATION.md': {
    title: 'Public Records Integration',
    description: 'Free government API integration for property data and demographics',
    order: 4
  },
  'GEOAPIFY_SETUP.md': {
    title: 'Geoapify API Setup',
    description: 'Address autocomplete and geocoding service configuration',
    order: 5
  },
  'VERCEL_TROUBLESHOOTING.md': {
    title: 'Vercel Deployment Guide',
    description: 'Production deployment troubleshooting and debugging procedures',
    order: 6
  }
};

export async function getAllDocs(): Promise<DocFile[]> {
  const docsDirectory = process.cwd();
  const files: DocFile[] = [];

  for (const [filename, config] of Object.entries(DOCS_CONFIG)) {
    const filePath = path.join(docsDirectory, filename);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const stats = fs.statSync(filePath);
      
      // Convert markdown to HTML directly (no frontmatter processing needed)
      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(fileContent);
      const htmlContent = processedContent.toString();
      
      files.push({
        slug: filename.replace('.md', '').toLowerCase().replace(/_/g, '-'),
        title: config.title,
        description: config.description,
        content: htmlContent,
        lastModified: stats.mtime,
        size: formatFileSize(stats.size)
      });
    }
  }

  // Sort by configured order
  return files.sort((a, b) => {
    const aConfig = Object.values(DOCS_CONFIG).find(config => config.title === a.title);
    const bConfig = Object.values(DOCS_CONFIG).find(config => config.title === b.title);
    return (aConfig?.order || 999) - (bConfig?.order || 999);
  });
}

export async function getDocBySlug(slug: string): Promise<DocFile | null> {
  const docs = await getAllDocs();
  return docs.find(doc => doc.slug === slug) || null;
}

function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

export async function generateDocNavigation() {
  const docs = await getAllDocs();
  return docs.map(doc => ({
    title: doc.title,
    slug: doc.slug,
    description: doc.description
  }));
} 