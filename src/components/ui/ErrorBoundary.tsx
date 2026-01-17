import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-4 min-h-[200px] bg-[#1a1a1a] rounded-xl border border-red-500/30 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-white font-medium mb-1">Something went wrong</h3>
          <p className="text-gray-400 text-sm">Unable to load this section</p>
        </div>
      );
    }

    return this.props.children;
  }
}
