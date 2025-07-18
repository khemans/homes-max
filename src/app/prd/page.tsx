import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

// Read and parse the PRD markdown file
async function getPRDContent() {
  const prdPath = path.join(process.cwd(), 'PRD.md');
  const fileContents = fs.readFileSync(prdPath, 'utf8');
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(fileContents);
  
  return processedContent.toString();
}

export default async function PRDPage() {
  const prdContent = await getPRDContent();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="remax-container">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="remax-card text-center mb-8">
            <div className="remax-card-body py-8">
              <h1 className="remax-heading-1 mb-4">
                Product Requirements Document: <span style={{ color: '#003DA5' }}>HOUSE/</span><span style={{ color: '#DC1C2E' }}>MAX</span>
              </h1>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
                <span><strong>Version:</strong> 3.5</span>
                <span><strong>Date:</strong> January 2025</span>
                <span><strong>Status:</strong> Production-Ready with Public Records Expansion Roadmap</span>
              </div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                A comprehensive overview of the HOUSE/MAX platform - empowering homebuyers with professional property insights and risk assessments.
              </p>
            </div>
          </div>

          {/* Dynamic PRD Content */}
          <div className="remax-card">
            <div className="remax-card-body">
              <div className="prd-content max-w-none">
                <div dangerouslySetInnerHTML={{ __html: prdContent }} />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="remax-card mt-8">
            <div className="remax-card-body text-center">
              <h2 className="remax-heading-2 mb-4">Ready to Explore?</h2>
              <p className="remax-text-body mb-6">
                Experience the full HOUSE/MAX platform and see how comprehensive property insights can empower your home buying decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/search" className="remax-btn-primary">
                  Search Properties
                </a>
                <a href="/about" className="remax-btn-secondary">
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
} 