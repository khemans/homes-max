import React, { Component, ReactNode } from 'react';
import { getConfig } from '@/config/app';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  private config = getConfig();

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error if enabled
    if (this.config.errors.logErrors) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Future: Send to error reporting service (Sentry, etc.)
    if (this.config.errors.enableErrorReporting) {
      // TODO: Implement error reporting
      console.log('Error reporting would be sent here');
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      if (this.config.errors.fallbackComponent) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                {/* Error Icon */}
                <div className="mx-auto h-24 w-24 text-red-500 mb-6">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>

                {/* Error Message */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Oops! Something went wrong
                </h2>
                
                <p className="text-lg text-gray-600 mb-8">
                  We encountered an unexpected error while loading this section. 
                  Our team has been notified and is working on a fix.
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={this.handleRetry}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Try Again
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/'}
                    className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Go to Home
                  </button>
                </div>

                {/* Debug Info (Development Only) */}
                {this.config.development.enableDebugMode && this.state.error && (
                  <details className="mt-8 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Show Error Details (Debug Mode)
                    </summary>
                    <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-md">
                      <div className="text-xs font-mono text-red-600 mb-2">
                        <strong>Error:</strong> {this.state.error.message}
                      </div>
                      <div className="text-xs font-mono text-gray-600 mb-2">
                        <strong>Stack:</strong>
                        <pre className="mt-1 whitespace-pre-wrap">{this.state.error.stack}</pre>
                      </div>
                      {this.state.errorInfo && (
                        <div className="text-xs font-mono text-gray-600">
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}

                {/* Support Contact */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    If this problem persists, please{' '}
                    <a 
                      href="mailto:support@housemax.com" 
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      contact our support team
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Minimal fallback if everything else is disabled
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-700">Something went wrong. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default ErrorBoundary; 