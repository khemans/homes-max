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
              <div className="prose prose-lg max-w-none
                prose-headings:text-gray-900 
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3 prose-h3:mt-6
                prose-h4:text-lg prose-h4:font-medium prose-h4:mb-2 prose-h4:mt-4
                prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:text-gray-700 prose-li:mb-1
                prose-ol:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-800 prose-em:italic
                prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:py-2
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border
                prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50
                prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
                prose-hr:border-gray-300 prose-hr:my-8">
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