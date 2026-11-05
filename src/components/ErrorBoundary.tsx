import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LABSYNC AI Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#040711',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '560px',
            backgroundColor: '#0D162B',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f87171',
                fontWeight: 'bold'
              }}>
                !
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>LABSYNC AI Diagnostic Alert</h2>
                <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>A client-side initialization issue occurred</p>
              </div>
            </div>

            <pre style={{
              backgroundColor: '#040711',
              color: '#38bdf8',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '12px',
              overflowX: 'auto',
              border: '1px solid #1e293b'
            }}>
              {this.state.error?.message || 'Unknown runtime error'}
            </pre>

            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                backgroundColor: '#00F0FF',
                color: '#040711',
                fontWeight: 700,
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: 'pointer'
              }}
            >
              Restart Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
