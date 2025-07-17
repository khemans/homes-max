import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDocs, getDocBySlug } from '@/lib/docs';

interface DocPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  
  if (!doc) {
    return {
      title: 'Documentation Not Found',
    };
  }

  return {
    title: `${doc.title} | HOUSE/MAX Documentation`,
    description: doc.description || `Technical documentation for ${doc.title}`,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  
  const doc = getDocBySlug(slug);
  const allDocs = getAllDocs();

  if (!doc) {
    notFound();
  }

  // Find previous and next docs for navigation
  const currentIndex = allDocs.findIndex(d => d.slug === slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="remax-container">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="remax-card text-center mb-8">
            <div className="remax-card-body py-8">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Link 
                  href="/docs" 
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Documentation
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{doc.title}</span>
              </div>
              
              <h1 className="remax-heading-1 mb-4">{doc.title}</h1>
              
              {doc.description && (
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">{doc.description}</p>
              )}
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <strong>Size:</strong> {doc.size}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong>Last updated:</strong> {new Date(doc.lastModified).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="remax-card mb-8">
            <div className="remax-card-body">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-800 prose-headings:font-semibold
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-blue-800
                  prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-6 prose-h2:text-blue-700 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                  prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-4 prose-h3:text-blue-600
                  prose-h4:text-lg prose-h4:font-medium prose-h4:mt-4 prose-h4:mb-3 prose-h4:text-gray-800
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-700 prose-li:mb-1
                  prose-ul:mb-4 prose-ol:mb-4
                  prose-strong:text-gray-800 prose-strong:font-semibold
                  prose-em:text-gray-700
                  prose-code:bg-blue-50 prose-code:text-blue-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-medium
                  prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-800 prose-a:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                  prose-table:text-sm prose-table:w-full
                  prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-800 prose-th:p-3 prose-th:border prose-th:border-gray-200
                  prose-td:border prose-td:border-gray-200 prose-td:p-3
                  prose-hr:border-gray-300 prose-hr:my-8"
                dangerouslySetInnerHTML={{ __html: doc.content }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="remax-card mb-8">
            <div className="remax-card-body">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  {prevDoc ? (
                    <Link 
                      href={`/docs/${prevDoc.slug}`}
                      className="remax-btn-secondary flex items-center w-fit"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      {prevDoc.title}
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
                
                <Link href="/docs" className="remax-btn-outline mx-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  All Documentation
                </Link>
                
                <div className="flex-1 flex justify-end">
                  {nextDoc ? (
                    <Link 
                      href={`/docs/${nextDoc.slug}`}
                      className="remax-btn-secondary flex items-center w-fit"
                    >
                      {nextDoc.title}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information for Large Documents */}
          {doc.content.length > 5000 && (
            <div className="remax-card">
              <div className="remax-card-body">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Large Document</h3>
                    <p className="text-gray-600 text-sm">
                      This is a comprehensive document with {Math.round(doc.content.length / 1000)}k+ characters. 
                      Use your browser&apos;s find function (Ctrl+F or Cmd+F) to quickly locate specific sections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 