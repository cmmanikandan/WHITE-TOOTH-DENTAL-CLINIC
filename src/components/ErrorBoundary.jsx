import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unexpected error' };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-slate-600">
              The app hit an unexpected error. Please refresh and try again.
            </p>
            <p className="mt-2 text-xs text-slate-400 break-all">{this.state.message}</p>
            <button
              onClick={this.handleReload}
              className="mt-5 px-5 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;